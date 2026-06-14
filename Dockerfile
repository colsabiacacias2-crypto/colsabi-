FROM node:22-alpine AS base

# Habilitar pnpm mediante corepack y agregar openssl (requerido por Prisma en Alpine)
RUN corepack enable
RUN apk add --no-cache openssl libc6-compat

# ==========================================
# Etapa 1: Instalar dependencias
# ==========================================
FROM base AS deps
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package.json pnpm-lock.yaml* ./
COPY prisma ./prisma

# Instalamos las dependencias
# Desactivamos el bloqueo de scripts de pnpm v11+ para que Prisma pueda generar su cliente
RUN pnpm config set ignore-scripts false
RUN pnpm install --frozen-lockfile || pnpm install

# ==========================================
# Etapa 2: Construir la aplicación
# ==========================================
FROM base AS builder
WORKDIR /app

# Copiamos los node_modules de la etapa anterior
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generamos el cliente de Prisma y construimos la app (Next.js)
RUN pnpm prisma generate
RUN pnpm run build

# ==========================================
# Etapa 3: Imagen de Producción (Runner)
# ==========================================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Crear un usuario sin privilegios para mayor seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiamos la carpeta public y los archivos standalone generados por Next.js
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copiamos Prisma para poder ejecutar migraciones si es necesario
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Ejecutamos el servidor standalone de Next.js (optimizado)
CMD ["node", "server.js"]
