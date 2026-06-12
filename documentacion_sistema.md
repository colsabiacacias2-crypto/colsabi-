# Documentación del Sistema de Gestión de Horas Sociales Escolares (COLSABI)

## Introducción
El presente documento detalla de manera exhaustiva la conceptualización, arquitectura, desarrollo e implementación del Sistema de Gestión de Horas Sociales Escolares (COLSABI). Este sistema surge como una solución tecnológica fundamental para modernizar, optimizar y auditar el proceso de seguimiento, registro y validación de las horas de servicio social requeridas obligatoriamente para los estudiantes de la institución. 

A través de una plataforma web centralizada, robusta y escalable, el sistema permite a administradores, asociados (representantes de instituciones externas) y estudiantes interactuar de manera eficiente. Este avance tecnológico permite a la institución dejar atrás los métodos tradicionales basados en documentación física (papel) o en hojas de cálculo desconectadas, mitigando riesgos de pérdida de información, fraude o retrasos administrativos en la validación de requisitos para la graduación.

---

## 1 CAPÍTULO I

### 1.1 Objetivo General.
Desarrollar, implementar y desplegar un sistema de información web integral que permita la gestión, control, auditoría y seguimiento eficiente de las horas sociales realizadas por los estudiantes de la institución educativa COLSABI. Este sistema debe garantizar la integridad, disponibilidad y confidencialidad de la información, facilitando la validación por parte de las autoridades escolares y optimizando la comunicación con las entidades receptoras de labor social.

### 1.2 Objetivos Específicos
*   **Centralizar y unificar la información:** Crear una base de datos relacional estructurada para almacenar, de forma segura, los datos de estudiantes, usuarios del sistema, escenarios de práctica y registros detallados de horas sociales.
*   **Automatizar flujos de trabajo (Workflows):** Proveer un proceso digital estandarizado para la revisión, aprobación o rechazo de las horas sociales reportadas, así como para la evaluación de solicitudes de creación de nuevos escenarios de práctica.
*   **Gestión avanzada de Roles y Permisos (RBAC):** Implementar un sistema de autenticación y autorización seguro basado en JWT, que diferencie estrictamente las capacidades operativas entre Administradores (control total del sistema) y Asociados (gestión limitada a sus escenarios asignados).
*   **Digitalización y gestión de evidencias:** Habilitar un módulo seguro para la subida, almacenamiento y visualización de comprobantes digitales (archivos multimedia, documentos) que respalden el trabajo realizado por los estudiantes, facilitando auditorías futuras.
*   **Trazabilidad y Auditoría:** Incorporar un sistema de registro de logs (`AuditLog`) que documente todas las acciones críticas realizadas dentro de la plataforma, identificando al usuario responsable, la acción ejecutada y la fecha.

### 1.3 Planteamiento Del Problema
En la actualidad, el control y seguimiento de las horas de labor social (requisito indispensable para la graduación) en la institución representa un desafío administrativo considerable. El proceso manual vigente se basa en la entrega de formularios físicos, firmas presenciales y el mantenimiento de registros en hojas de cálculo (Excel) manipuladas por múltiples personas.

Esta falta de sistematización genera diversas problemáticas:
1.  **Pérdida y deterioro de la información:** Los documentos físicos son susceptibles a extravíos, daños o alteraciones.
2.  **Errores humanos en la consolidación:** La transcripción manual de horas a hojas de cálculo provoca errores de digitación que afectan el acumulado final del estudiante.
3.  **Cuellos de botella administrativos:** Al finalizar el año escolar, el volumen de certificaciones a procesar colapsa al personal encargado, retrasando los procesos de grado.
4.  **Falta de visibilidad en tiempo real:** Los estudiantes y coordinadores no tienen un mecanismo rápido para consultar el progreso actual (cuántas horas llevan aprobadas de las 80 requeridas).
5.  **Dificultad en la validación de escenarios:** No existe un registro histórico formal de las instituciones donde los estudiantes prestan su servicio, lo que dificulta evaluar la calidad y seguridad de dichas entidades.

### 1.4 Justificación
La implementación del Sistema de Gestión de Horas Sociales Escolares COLSABI se justifica por la necesidad imperante de aportar transparencia, agilidad, trazabilidad y seguridad al manejo de la información académica-administrativa. 

Desde una perspectiva operativa, la automatización del registro de horas y la validación digital reduce drásticamente la carga de trabajo del personal administrativo, permitiendo reasignar esos recursos a tareas de mayor valor. Desde la perspectiva de la seguridad de la información, el sistema minimiza el riesgo de fraude y pérdida de datos al mantener respaldos digitales y trazabilidad de aprobaciones.

Además, al utilizar tecnologías web modernas y responsivas, se ofrece una interfaz accesible desde cualquier dispositivo (computadoras, tablets, smartphones), mejorando sustancialmente la experiencia de usuario (UX) para todos los actores involucrados: los administradores que supervisan el programa, los asociados que validan el trabajo en campo, y los estudiantes que necesitan certificar su esfuerzo.

---

## 2 CAPÍTULO II

### 2.1 Metodología de desarrollo de software
Para garantizar el éxito y la adaptabilidad de este proyecto, se adoptó un enfoque basado en metodologías ágiles, específicamente **Scrum**. Esta elección metodológica obedece a su flexibilidad y capacidad de adaptación a los cambios en los requerimientos a lo largo del ciclo de vida del proyecto. Se trabajaron iteraciones (sprints) cortas, con reuniones de seguimiento, para entregar valor funcional de manera continua y validar los módulos con los usuarios finales antes de avanzar a fases posteriores.

#### 2.1.1 Diseño
En la fase de diseño, se estableció una arquitectura de software robusta basada en el patrón Cliente-Servidor unificado, aprovechando las capacidades del framework **Next.js** (App Router).

*   **Arquitectura de Datos (Diagrama de Entidad-Relación):** Se diseñó un modelo relacional altamente normalizado utilizando **Prisma ORM**. Las entidades clave comprenden:
    *   `User`: Gestión de identidades con roles de `ADMIN` y `ASOCIADO`, incluyendo estados de cuenta (PENDING, ACTIVE, SUSPENDED).
    *   `Student`: Registro detallado del alumnado.
    *   `PracticeScenario`: Entidades u organizaciones donde se realiza la labor social.
    *   `ScenarioApplication`: Flujo de aprobación para nuevas organizaciones interesadas en recibir estudiantes.
    *   `StudentScenarioAssignment`: Tabla puente que relaciona estudiantes con escenarios, controlando el límite de 80 horas requeridas y las horas ya aprobadas.
    *   `SocialHourEntry`: El núcleo transaccional, que registra cada jornada de labor, su estado (PENDING, APPROVED, REJECTED) y enlaza con las evidencias digitales.
    *   `AuditLog`: Registro de auditoría inmutable para operaciones críticas.
*   **Diseño de Interfaz de Usuario (UI/UX):** Se priorizó una interfaz de usuario limpia, intuitiva y altamente responsiva. Se diseñaron paneles de control (Dashboards) específicos para cada rol, mostrando indicadores clave de rendimiento (KPIs) como el total de horas pendientes de revisión, estudiantes asignados y estado general del sistema.

#### 2.1.2 Desarrollo
El desarrollo se ejecutó adhiriéndose a principios de Clean Code y utilizando un stack tecnológico moderno, escalable y seguro (Stack PERN/Next.js):

*   **Frontend y Backend Unificado:** **Next.js** versión 14+, utilizando el paradigma de React Server Components para optimizar el rendimiento y la carga inicial, manejando la lógica de backend mediante Route Handlers (API).
*   **Persistencia de Datos:** **PostgreSQL** como motor de base de datos relacional principal, interconectado a la aplicación a través de **Prisma ORM**, lo que garantiza seguridad contra inyecciones SQL y un tipado estricto en el código (Type Safety).
*   **Seguridad y Criptografía:** 
    *   Implementación de JSON Web Tokens (**JWT**) manejados con la librería `jose` para la gestión de sesiones sin estado (Stateless), almacenados de forma segura en cookies HttpOnly.
    *   Uso de `bcryptjs` para el hashing criptográfico de contraseñas, asegurando que las credenciales nunca se almacenen en texto plano.
*   **Validación Estricta:** Integración de **Zod** para la validación de esquemas en tiempo de ejecución, garantizando que todos los datos provenientes de formularios (Frontend) o peticiones (API) cumplan con las reglas de negocio antes de tocar la base de datos.
*   **Gestor de Paquetes:** Por requerimientos estrictos de seguridad y eficiencia en la resolución de dependencias, se utilizó exclusivamente **pnpm**, evitando el uso de npm.

#### 2.1.3 Pruebas
Para garantizar la estabilidad del sistema, se diseñó un plan de pruebas integral:

*   **Pruebas de Componentes y Unitarias:** Validación de funciones críticas de negocio. Por ejemplo, la lógica que impide que un estudiante acumule más de las 80 horas reglamentarias, o que verifica que una entrada de horas no pueda ser aprobada por un usuario sin los permisos correctos.
*   **Pruebas de Integración:** Comprobación del flujo completo de datos desde el envío de un formulario en el cliente, la validación en el middleware, el procesamiento en la API y la correcta inserción en la base de datos PostgreSQL.
*   **Pruebas de Roles y Accesos (RBAC):** Simulaciones exhaustivas para garantizar que un `ASOCIADO` no pueda acceder a rutas administrativas (`/admin/...`) ni manipular escenarios que no le han sido explícitamente asignados.
*   **Pruebas de Seguridad en Sesiones:** Validación de la ruta unificada `/api/auth/logout`, asegurando que elimine correctamente las cookies de `access_token` y `refresh_token` sin afectar la integridad de los datos en la base de datos subyacente.

#### 2.1.4 Implementación
La estrategia de despliegue (Deployment) se estructuró para entornos Cloud-Native, buscando alta disponibilidad y escalabilidad automática:

*   **Despliegue de la Aplicación (Compute):** Alojamiento en la plataforma **Vercel**, aprovechando su infraestructura Edge y su perfecta integración con Next.js para un rendimiento óptimo.
*   **Base de Datos en la Nube (Storage):** Implementación de PostgreSQL en servicios Cloud (como Supabase o Vercel Postgres), garantizando copias de seguridad automáticas (Backups) y alta disponibilidad.
*   **Integración y Despliegue Continuo (CI/CD):** Configuración de pipelines automatizados conectados al repositorio de control de versiones. Esto asegura que cualquier nueva funcionalidad o corrección de errores (tras ser aprobada) se construya, pruebe y despliegue automáticamente en el entorno de producción sin tiempo de inactividad (Zero Downtime).

---

## 3 CAPÍTULO III

### 3.1 Manual de usuario
El sistema presenta una arquitectura modular basada en los permisos del usuario autenticado. A continuación, se detallan los flujos de operación principales.

**A. Autenticación y Acceso (Login/Logout)**
1.  **Ingreso:** El usuario debe navegar a la URL principal del sistema e introducir sus credenciales (correo y contraseña). El sistema validará los datos y, dependiendo de su rol (`ADMIN` o `ASOCIADO`), lo redirigirá a su panel de control específico.
2.  **Cierre de Sesión:** Para salir de manera segura, el usuario debe utilizar el botón "Cerrar sesión" (`LogoutButton.js`). Esta acción invocará un endpoint seguro que limpiará los tokens de acceso del navegador, cerrando la sesión local sin alterar ningún registro histórico en la base de datos.

**B. Módulo de Gestión Administrativa (Rol: ADMIN)**
El Administrador posee privilegios globales sobre la plataforma y es responsable de la orquestación del programa de labor social. Sus funciones incluyen:

*   **Gestión de Identidades (Usuarios):** Capacidad para crear, editar, suspender (estado `SUSPENDED`) o reactivar cuentas de otros Administradores o Asociados.
*   **Gestión del Alumnado (Estudiantes):** Módulo para matricular estudiantes en el sistema, actualizar sus datos personales (código, documento, grado) y visualizar un reporte consolidado de su progreso en horas sociales.
*   **Evaluación de Solicitudes de Escenarios (`ScenarioApplication`):** Panel para revisar las postulaciones de nuevas organizaciones que desean recibir estudiantes. El administrador revisa los datos de contacto y capacidad, y toma la decisión de Aprobar (lo que genera automáticamente un nuevo `PracticeScenario`) o Rechazar la solicitud.
*   **Administración de Escenarios de Práctica:** Control total sobre los escenarios activos. Aquí el administrador asigna qué usuario (con rol `ASOCIADO`) será el gestor responsable de aprobar las horas en dicha institución.
*   **Asignación Estudiante-Escenario (`StudentScenarioAssignment`):** Interfaz para vincular oficialmente a un estudiante con un escenario específico, estableciendo la meta de horas (por defecto 80).
*   **Módulo de Auditoría (`AuditLog`):** Acceso de solo lectura a la bitácora del sistema, permitiendo rastrear quién aprobó ciertas horas, quién creó un usuario, o desde qué IP se realizaron acciones críticas.

**C. Módulo de Gestión de Escenarios (Rol: ASOCIADO)**
El Asociado representa a la institución externa donde el estudiante realiza su labor. Su acceso está estrictamente delimitado (Sandboxed) a los escenarios que le han sido asignados por un Administrador. Sus funciones incluyen:

*   **Panel de Revisión de Horas (`SocialHourEntry`):** 
    *   Visualizar una bandeja de entrada con las horas reportadas por los estudiantes asignados a su institución que se encuentran en estado `PENDING`.
    *   Revisar los detalles de la actividad: fecha, cantidad de horas, descripción de la labor.
    *   Auditar las evidencias digitales (fotos, documentos) adjuntas al reporte.
    *   **Acción de Decisión:** Aprobar (`APPROVED`) o Rechazar (`REJECTED`) el reporte. Si es aprobado, el sistema suma automáticamente esas horas al progreso del estudiante. Si es rechazado, se puede adjuntar una nota explicativa.
*   **Directorio de Estudiantes Asignados:** Consultar el listado de estudiantes activos en su escenario, verificando su información de contacto básica y el porcentaje de cumplimiento de su labor en esa institución específica.

---

## 4 CAPÍTULO IV

### 4.1 Conclusiones
*   **Transformación Digital Exitosa:** El Sistema de Gestión de Horas Sociales Escolares (COLSABI) representa un salto cualitativo en la administración escolar, erradicando la dependencia de documentos físicos y hojas de cálculo vulnerables, centralizando toda la operativa en una plataforma digital robusta y auditable.
*   **Arquitectura Sólida y Escalable:** La elección del stack tecnológico (Next.js, Prisma, PostgreSQL) ha resultado en una aplicación no solo altamente eficiente en el presente, sino preparada para escalar a futuro, permitiendo agregar nuevos módulos (como generación de diplomas en PDF o notificaciones por correo) sin comprometer la estructura base.
*   **Seguridad y Confidencialidad como Pilar:** La implementación de un modelo de Control de Acceso Basado en Roles (RBAC), sumado a la validación estricta de datos con Zod y la gestión segura de sesiones con JWT, garantiza que la información sensible de los estudiantes está protegida y que cada actor del sistema interactúa únicamente con los datos que le competen.
*   **Integridad Institucional:** La digitalización del flujo de aprobación y la exigencia de evidencias digitales blindan el proceso de labor social, asegurando a la institución que las horas certificadas para la graduación de los estudiantes cuentan con todo el respaldo legal, histórico y auditable necesario.