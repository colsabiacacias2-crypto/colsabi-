# Informe de Práctica Profesional: Sistema de Gestión COLSABI

## Resumen Práctica Profesional
El presente documento constituye el informe final de la práctica profesional desarrollada en el marco de la creación e implementación del "Sistema de Gestión de Horas Sociales Escolares (COLSABI)". Durante este periodo, se abordó el diseño, desarrollo, pruebas y despliegue de una plataforma web integral orientada a digitalizar el proceso de control de labor social de los estudiantes. El proyecto implicó la transición de un sistema de registro manual (basado en papel y hojas de cálculo) hacia una arquitectura moderna Cliente-Servidor utilizando Next.js, PostgreSQL y Prisma ORM. La práctica no solo abarcó aspectos técnicos de programación Full-Stack, sino también levantamiento de requerimientos, diseño de base de datos relacional, implementación de seguridad (JWT, RBAC) y despliegue en entornos Cloud.

---

## 1. DESARROLLO DE LA PRÁCTICA

### 1.1 SEMANA 1
**Levantamiento de Requerimientos y Planificación:**
*   Reuniones con las partes interesadas (coordinadores, administradores) para entender el flujo manual actual del registro de horas sociales.
*   Identificación de los roles principales del sistema: Administrador, Asociado (Gestor de Escenario) y Estudiante.
*   Definición de las reglas de negocio críticas, como el límite máximo de 80 horas por estudiante.
*   Selección del Stack Tecnológico (Next.js, Tailwind CSS, Prisma, PostgreSQL).

### 1.2 SEMANA 2
**Diseño de la Arquitectura de Datos y Entorno de Desarrollo:**
*   Modelado de la base de datos relacional (Diagrama Entidad-Relación).
*   Configuración inicial del proyecto Next.js y configuración estricta de `pnpm` como gestor de paquetes.
*   Creación del archivo `schema.prisma` definiendo los modelos: `User`, `Student`, `PracticeScenario`, `ScenarioApplication`, `StudentScenarioAssignment`, y `SocialHourEntry`.
*   Ejecución de las primeras migraciones a la base de datos PostgreSQL.

### 1.3 SEMANA 3
**Implementación del Sistema de Autenticación (Auth):**
*   Desarrollo del módulo de login seguro.
*   Implementación de JSON Web Tokens (JWT) utilizando la librería `jose` para manejo de sesiones Stateless.
*   Configuración de encriptación de contraseñas con `bcryptjs`.
*   Creación de Middlewares en Next.js para proteger rutas y verificar roles (`ADMIN` vs `ASOCIADO`).

### 1.4 SEMANA 4
**Desarrollo del Módulo Administrativo (Parte 1 - Usuarios y Escenarios):**
*   Creación del Dashboard principal para el rol Administrador.
*   Desarrollo de los formularios (Frontend) y Endpoints (Backend) para la gestión (CRUD) de usuarios del sistema.
*   Implementación del flujo de "Solicitudes de Escenarios" (`ScenarioApplication`), permitiendo aprobar o rechazar nuevas instituciones.
*   Uso de `Zod` para la validación estricta de datos en todos los formularios.

### 1.5 SEMANA 5
**Desarrollo del Módulo Administrativo (Parte 2 - Estudiantes):**
*   Desarrollo del módulo para el registro y gestión del alumnado (`Student`).
*   Implementación de la interfaz para asignar estudiantes a escenarios específicos (`StudentScenarioAssignment`), vinculando la entidad educativa con el alumno.
*   Creación de tablas de datos interactivas para visualizar el estado de cada estudiante y sus horas acumuladas.

### 1.6 SEMANA 6
**Desarrollo del Módulo del Asociado (Gestor de Escenarios):**
*   Diseño del Dashboard específico para el rol `ASOCIADO`, aplicando restricciones de seguridad para que solo visualicen sus escenarios asignados.
*   Desarrollo de la vista donde el Asociado puede ver la lista de estudiantes que tiene a cargo.
*   Implementación de filtros de búsqueda y paginación para optimizar la carga de datos.

### 1.7 SEMANA 7
**Núcleo del Sistema: Registro y Validación de Horas Sociales:**
*   Desarrollo del componente `SocialHourEntry`, el corazón transaccional del sistema.
*   Creación de la interfaz para que los Asociados puedan revisar las horas reportadas (estado `PENDING`).
*   Programación de la lógica de negocio en el Backend para sumar las horas al acumulado del estudiante únicamente cuando la entrada pasa a estado `APPROVED`.

### 1.8 SEMANA 8
**Gestión de Evidencias Digitales:**
*   Implementación de la lógica para el manejo de archivos (subida de evidencias documentales o fotográficas).
*   Modificación de la base de datos para almacenar URLs y metadatos de las evidencias (`evidenceUrl`, `evidenceMimeType`).
*   Desarrollo de visores integrados en el panel del Asociado para auditar las pruebas antes de aprobar las horas.

### 1.9 SEMANA 9
**Módulo de Auditoría y Trazabilidad:**
*   Implementación del modelo `AuditLog` en Prisma.
*   Integración de disparadores (o lógica a nivel de servicio) para registrar acciones críticas: creación de usuarios, aprobación de horas, cambios de roles.
*   Desarrollo de una vista exclusiva para el Administrador donde puede consultar el historial de movimientos del sistema.

### 1.10 SEMANA 10
**Refinamiento de UI/UX y Manejo de Estados:**
*   Mejora general de las interfaces utilizando componentes consistentes (botones, modales, alertas).
*   Implementación de feedback visual para el usuario (Spinners de carga, notificaciones de éxito/error tipo Toast).
*   Revisión del código para garantizar que todos los nombres de archivos, carpetas y variables cumplan con el estándar acordado de idioma español.

### 1.11 SEMANA 11
**Fase de Pruebas (Testing) y Corrección de Errores (Debugging):**
*   Ejecución de pruebas de integración en los flujos principales (Login -> Asignación -> Registro de Horas -> Aprobación).
*   Identificación y corrección de un bug en el cálculo del límite máximo de horas (80 hrs).
*   Validación de la lógica de cierre de sesión unificada (`/api/auth/logout`) garantizando la eliminación correcta de cookies.

### 1.12 SEMANA 12
**Preparación para Despliegue (Deployment):**
*   Configuración de variables de entorno (`.env`) para producción.
*   Preparación de la base de datos en la nube (ej. Vercel Postgres / Supabase).
*   Despliegue de la aplicación en la plataforma Vercel.
*   Pruebas de rendimiento y seguridad en el entorno de producción (Smoke testing).

### 1.13 SEMANA 13
**Documentación, Capacitación y Entrega Final:**
*   Redacción de manuales de usuario para Administradores y Asociados.
*   Elaboración de la documentación técnica del sistema y arquitectura de software.
*   Reunión de cierre, demostración final del producto (Demo) a las autoridades de COLSABI y entrega del código fuente.

---

## 2. ÁREA DEL CONOCIMIENTO Y COMPETENCIAS DISCIPLINARES APLICADAS EN EL ESCENARIO
Durante la ejecución de este proyecto se aplicaron diversas competencias de la Ingeniería de Software / Desarrollo de Sistemas:
*   **Ingeniería de Requisitos:** Capacidad para traducir necesidades operativas y administrativas de un colegio en especificaciones técnicas de software.
*   **Diseño de Bases de Datos Relacionales:** Aplicación de principios de normalización para diseñar un esquema eficiente en PostgreSQL, garantizando la integridad referencial mediante Prisma ORM.
*   **Desarrollo Frontend y Backend (Full-Stack):** Dominio avanzado del framework Next.js (React) para construir tanto la interfaz de usuario interactiva como la API subyacente.
*   **Seguridad de la Información:** Implementación de prácticas de codificación segura, hashing de contraseñas, protección de rutas y gestión de identidades con JWT.
*   **Gestión de Proyectos Ágiles:** Uso de metodologías iterativas para adaptar el desarrollo a los cambios y garantizar entregas funcionales constantes.

---

## 3. FORTALEZAS IDENTIFICADAS EN EL PROCESO
*   **Elección del Stack Tecnológico:** El uso de Next.js y Prisma demostró ser una decisión sumamente acertada, permitiendo un desarrollo ágil y un tipado fuerte que redujo significativamente los errores en tiempo de ejecución.
*   **Modularidad del Código:** La separación clara de responsabilidades (Middlewares para Auth, Route Handlers para lógica, Componentes UI) facilitó la escalabilidad y la depuración.
*   **Comunicación Efectiva:** La constante validación de las interfaces con los usuarios finales (Stakeholders) aseguró que el producto desarrollado realmente solucionara el problema administrativo de la institución.
*   **Seguridad Robustecida:** La implementación temprana de un control de acceso basado en roles (RBAC) previno vulnerabilidades relacionadas con la escalada de privilegios.

---

## 4. OPORTUNIDADES DE MEJORA
*   **Cobertura de Pruebas Automatizadas:** Aunque se realizaron pruebas manuales exhaustivas, el proyecto se beneficiaría de la implementación de pruebas unitarias y de integración automatizadas (ej. usando Jest o Playwright) para integrarlas al pipeline de CI/CD.
*   **Notificaciones en Tiempo Real:** Actualmente el sistema depende de la revisión activa. Implementar un sistema de notificaciones por correo electrónico (ej. Resend o SendGrid) cuando un estudiante sube nuevas horas, agilizaría el proceso de aprobación.
*   **Generación de Reportes PDF:** Agregar un módulo que permita generar automáticamente los certificados de cumplimiento de las 80 horas en formato PDF, listos para impresión y firma.

---

## 5. CONCLUSIONES
La práctica profesional desarrollada a través del proyecto COLSABI ha sido altamente satisfactoria, culminando en la entrega de un producto de software funcional, seguro y escalable. Se logró el objetivo principal de digitalizar y automatizar el control de las horas de labor social, eliminando las ineficiencias del proceso manual anterior.

A nivel profesional, este proyecto permitió consolidar conocimientos teóricos en un entorno real, enfrentando desafíos de arquitectura de software, seguridad de datos y experiencia de usuario. El sistema entregado no solo resuelve un problema administrativo actual de la institución, sino que sienta una base tecnológica moderna que puede seguir evolucionando para integrar más procesos académicos en el futuro.