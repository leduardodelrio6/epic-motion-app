# CLAUDE.md — Epic Motion High Performance Dance Studio

## ¿Qué es este proyecto?

Aplicación web (PWA) para **Epic Motion High Performance Dance Studio**, academia de danza en Torreón, Coahuila, México. Dirigida por Luz María Herrera. Estilos: Ballet, Hip-hop y Contemporáneo.

La app gestiona la operación completa: alumnos, asistencia, cobranza, comunicación con padres, horarios, eventos, gamificación privada y pago a profesores. La landing page pública y la app viven en el mismo proyecto bajo el mismo dominio (epicmotion.com).

## Stack técnico

| Componente | Tecnología |
|---|---|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript (estricto) |
| Estilos | Tailwind CSS |
| Animaciones | Framer Motion |
| ORM | Prisma |
| Base de datos | PostgreSQL |
| Autenticación | NextAuth.js con RBAC |
| Estado global | Zustand |
| Iconos | Lucide React |
| Toasts | Sonner |
| Storage | S3 o Supabase Storage (comprobantes, PDFs, imágenes) |
| Email | SendGrid o Mailgun |
| PDF | React-PDF o @react-pdf/renderer |
| Deploy | Vercel |

## Estructura de carpetas

```
epic-motion/
├── CLAUDE.md                    # Este archivo (contexto para Claude Code)
├── PROYECTO.md                  # Reglas de negocio detalladas
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── prisma/
│   ├── schema.prisma            # Schema completo de la BD
│   └── seed.ts                  # Datos de ejemplo
├── public/
│   ├── images/                  # Imágenes optimizadas (WebP + JPG fallback)
│   │   ├── hero-dancer-desktop.webp
│   │   ├── ballet.webp
│   │   ├── hiphop.webp
│   │   ├── contemporaneo.webp
│   │   ├── gallery-1.webp ... gallery-4.webp
│   │   └── studio.webp
│   ├── logo.png                 # Logo dark mode
│   ├── logo-light.png           # Logo light mode
│   └── favicon.png
├── app/
│   ├── layout.tsx               # Layout raíz (fuentes, providers, metadata)
│   ├── page.tsx                 # Landing page pública (ruta /)
│   ├── globals.css              # Tailwind base + custom properties
│   ├── (auth)/
│   │   ├── login/page.tsx       # Login para padres/maestros/admin
│   │   └── recuperar/page.tsx   # Recuperación de contraseña
│   ├── (admin)/
│   │   ├── layout.tsx           # Layout con sidebar admin
│   │   ├── dashboard/page.tsx   # Resumen del día
│   │   ├── usuarios/page.tsx    # CRUD usuarios con roles
│   │   ├── alumnas/page.tsx     # Gestión de alumnas
│   │   ├── grupos/page.tsx      # Grupos y horarios
│   │   ├── inscripciones/page.tsx
│   │   ├── cobranza/page.tsx    # Pagos y estado de cuenta
│   │   ├── nomina/page.tsx      # Pago a profesores
│   │   ├── noticias/page.tsx    # Publicar noticias
│   │   ├── eventos/page.tsx     # Gestión de eventos
│   │   ├── configuracion/page.tsx # Alertas, cortes, umbrales
│   │   └── reportes/page.tsx    # Analytics y exportación
│   ├── (maestro)/
│   │   ├── layout.tsx           # Layout con bottom nav maestro
│   │   ├── agenda/page.tsx      # Clases del día/semana
│   │   ├── asistencia/page.tsx  # Toma de asistencia + uniforme
│   │   ├── notas/page.tsx       # Notas rutinarias + extraordinarias
│   │   └── privadas/page.tsx    # Agenda de clases privadas
│   ├── (padre)/
│   │   ├── layout.tsx           # Layout con bottom nav padre
│   │   ├── home/page.tsx        # Noticias + Notas de hijas
│   │   ├── hijas/page.tsx       # Stats y gamificación por hija
│   │   ├── pagos/page.tsx       # Estado de cuenta
│   │   ├── eventos/page.tsx     # Calendario de eventos
│   │   └── notificaciones/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── usuarios/route.ts
│       ├── alumnas/route.ts
│       ├── asistencias/route.ts
│       ├── notas/route.ts
│       ├── pagos/route.ts
│       ├── eventos/route.ts
│       ├── noticias/route.ts
│       ├── nomina/route.ts
│       └── gamificacion/route.ts
├── components/
│   ├── landing/                 # Componentes de la landing page
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── ValoresCards.tsx
│   │   ├── EstilosGrid.tsx
│   │   ├── Nosotros.tsx
│   │   ├── GaleriaTikTok.tsx
│   │   ├── CTASection.tsx
│   │   └── Footer.tsx
│   ├── ui/                      # Componentes reutilizables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Table.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── LoadingSpinner.tsx
│   ├── layout/
│   │   ├── AdminSidebar.tsx
│   │   ├── BottomNav.tsx
│   │   └── TopBar.tsx
│   └── shared/
│       ├── StudentCard.tsx
│       ├── AttendanceButton.tsx
│       ├── UniformeCheck.tsx
│       ├── NotaCard.tsx
│       ├── EventCard.tsx
│       ├── PaymentBadge.tsx
│       └── ProgressRing.tsx
├── lib/
│   ├── prisma.ts                # Cliente Prisma singleton
│   ├── auth.ts                  # Configuración NextAuth + RBAC
│   ├── utils.ts                 # Helpers generales
│   └── constants.ts             # Constantes de la app
├── hooks/
│   ├── useAuth.ts
│   ├── useTheme.ts
│   └── useNotifications.ts
├── stores/
│   └── useStore.ts              # Zustand store
└── types/
    ├── next-auth.d.ts
    └── models.ts                # Tipos TypeScript del dominio
```

## Paleta de colores (extraída de la landing existente)

### Dark mode (default)

```
Fondo principal:    #0A0A0A   (negro profundo)
Texto principal:    #FFFFFF   (blanco)
Acento dorado:      #C9A227   (dorado Epic Motion)
Texto secundario:   #CCCCCC   (plata)
Superficies:        #2A2A2A   (gris oscuro)
Superficies hover:  #4A4A4A   (gris medio)
Overlay:            rgba(10, 10, 10, 0.7)
```

### Light mode

```
Fondo principal:    #FFFFFF   (blanco)
Texto principal:    #0A0A0A   (negro)
Acento:             #000000   (negro, sin dorado en light)
Texto secundario:   #666666   (gris)
Superficies:        #F5F5F5   (gris claro)
Superficies hover:  #E8E8E8
```

### Tailwind config

```typescript
// tailwind.config.ts - colores custom
colors: {
  epic: {
    black: '#0A0A0A',
    gold: '#C9A227',
    silver: '#CCCCCC',
    gray: '#2A2A2A',
    'gray-light': '#4A4A4A',
  }
}
```

## Tipografías

```
Montserrat  — Títulos, marca "EPIC MOTION", headings
  Weights: 300 (light/subtítulos), 700 (bold/secciones), 800 (extrabold/marca)

Inter       — Body text, navegación, formularios, tablas
  Weights: 400 (regular), 500 (medium), 600 (semibold)

Cormorant Garamond — Acentos elegantes (opcional, peso 600)
```

Cargar desde Google Fonts en `app/layout.tsx` usando `next/font/google`.

## Roles del sistema (4 activos)

| Rol | Acceso |
|---|---|
| **admin** | Acceso total. CRUD usuarios, configurar alertas, aprobar notas, cobranza, nómina, noticias, eventos, reportes. Operado por la dueña (Luz) y su esposo. |
| **maestro** | Agenda de clases, toma de asistencia con check-in y uniforme, notas rutinarias + extraordinarias, pautas, agenda de clases privadas. |
| **padre** | Home con noticias + notas de hijas, gamificación privada, stats asistencia, estado de cuenta, eventos, agendar clases privadas, confirmar lectura de noticias. |
| **recepcionista** | (Por confirmar) Registrar pagos en efectivo, gestionar inscripciones, atender padres. |

**IMPORTANTE**: NO hay panel de estudiantes. Las alumnas son menores de edad y no tienen acceso a la app. Todo se gestiona a través de las cuentas de los padres.

## Reglas de negocio críticas

### Asistencia

- Un click: Presente, Tarde, Ausente.
- Botón extra de uniforme: popup con check de zapato, tocado, tutú.
- Uniforme incompleto → notificación automática al padre.
- Faltas consecutivas: rango configurable por admin (3 a 6), disparan alerta al padre.
- PRIORIDAD: minimizar clicks. El maestro debe pasar lista rápido.

### Check-in del profesor

- La clase se considera "iniciada" cuando el maestro marca la primera asistencia.
- Si no hay check-in en X minutos (configurable), se marca como retraso/no iniciada → notifica al admin.

### Notas y pautas

- Notas rutinarias: evaluación por clase.
- Notas extraordinarias: retroalimentación especial cuando el maestro decide.
- Flujo: maestro escribe → admin revisa/aprueba → se publica al padre.

### Gamificación (PRIVADA)

- Cada padre solo ve el progreso de sus propias hijas. SIN rankings públicos, SIN comparaciones entre alumnas.
- El admin tiene vista global.
- Puntos por: asistencia, puntualidad, uniforme completo, notas positivas.

### Cobranza

- Pago en efectivo en la academia (registro manual por admin/recepcionista).
- Opción de adjuntar comprobante (foto).
- Fecha de corte: configurable global o individual por alumna.
- Recordatorios automáticos: por vencer y vencidos.

### Noticias

- Publicadas por admin con imagen, título, texto.
- Padres pueden confirmar lectura.
- Admin ve quién confirmó y quién no.

### Inscripciones

- Al inscribir alumna se crea automáticamente usuario y contraseña para el padre.
- Se genera PDF de bienvenida atractivo.
- Paquetes mensuales con X clases/semana (configurable).

### Clases privadas

- Maestro define disponibilidad en agenda.
- Padre agenda con prepago obligatorio (1-2 días anticipación).
- Se publican disponibilidades en el Home.

### Clases muestra

- Alumna nueva entra a clase existente como invitada.
- Con control de cupo.

## Convenciones de código

### General

- TypeScript estricto (`strict: true`).
- Usar `async/await` siempre, nunca `.then()`.
- Nombres de archivos: `kebab-case` para rutas, `PascalCase` para componentes.
- Comentarios en español (el equipo habla español).
- Mensajes de commit en español.

### Componentes React

- Functional components con arrow functions.
- Props tipadas con interfaces (no `type`).
- Usar `'use client'` solo cuando sea necesario (preferir Server Components).
- Componentes pequeños y enfocados (< 150 líneas).

### API Routes

- Validar input siempre (usar Zod).
- Retornar `NextResponse.json()` con status codes apropiados.
- Proteger con middleware de autenticación por rol.
- Manejar errores con try/catch y respuestas consistentes.

### Estilos

- Tailwind CSS para todo. No CSS custom excepto en `globals.css` para variables base.
- Dark mode con el prefix `dark:` de Tailwind.
- Mobile-first: diseñar para móvil primero, agregar breakpoints para desktop.
- Usar las clases custom de `epic-*` para colores de marca.

### Base de datos

- Prisma para todo acceso a BD.
- Migraciones con `prisma migrate dev`.
- Seed con datos de ejemplo para desarrollo.
- IDs con `cuid()` o `uuid()`.

## Comunicación (WhatsApp)

### MVP (meses 1-2)

Abrir WhatsApp Web con texto dinámico prellenado (sin API):

```
https://wa.me/528712044277?text=Hola%20Epic%20Motion...
```

### Mes 3+

Migrar a Meta Cloud API (WhatsApp Business) para envío automático de notificaciones.

## Diseño y UX

### Principios

- **Sobrio, elegante, disciplina** — alineado con la identidad de Epic Motion.
- **Mobile-first** — los padres y maestros usan principalmente celular.
- **Minimizar clicks** — especialmente para toma de asistencia (acción más frecuente).
- **Tarjetas sobre tablas** — en móvil usar cards y popovers, no tablas largas.
- **Dark mode es el default** — con toggle para light mode.

### Layout por rol

- **Admin**: Sidebar lateral en desktop, bottom nav en mobile.
- **Maestro**: Bottom nav con 4 tabs (Agenda, Asistencia, Notas, Privadas).
- **Padre**: Bottom nav con 5 tabs (Home, Hijas, Pagos, Eventos, Notificaciones).

### Landing page (ruta /)

La landing page pública es la puerta de entrada. Secciones:

1. Hero: "EPIC MOTION" con fondo de bailarina, lema "Consciente · Constante · Correcto"
2. Valores: 3 cards (Consciente, Constante, Correcto)
3. Estilos: Grid con Ballet, Hip-hop, Contemporáneo
4. Nosotros: Beneficios con checklist
5. Galería: Videos de TikTok embebidos
6. CTA: "Agenda clase de prueba" + redes sociales
7. Footer: Logo, ubicación, copyright
8. Botón de LOGIN/ACCEDER prominente que lleva a /login

## Assets disponibles (de la landing existente)

Copiar de `public/images/` — ya optimizados en WebP con fallback JPG:

```
hero-dancer-desktop.webp/jpg    (1920x1080, hero background)
ballet.webp/jpg                 (400x500, card estilo)
hiphop.webp/jpg                 (400x500, card estilo)
contemporaneo.webp/jpg          (400x500, card estilo)
gallery-1..4.webp/jpg           (galería)
studio.webp/jpg                 (instalaciones)
logo.png                        (logo dark mode)
logo-light.png                  (logo light mode, "descarga (3).png" renombrado)
og-image.jpg                    (Open Graph)
```

## Modelos de datos principales (Prisma)

```
Usuario         — id, nombre, email, teléfono, rol, estatus, password
Alumna          — id, nombre, fecha_nac, padre_id, estatus
Clase (grupo)   — id, nombre, estilo, nivel, duración, días, horario, cupo, salón_id, profesor_id
Sesión          — id, clase_id, fecha, hora_inicio, hora_fin, profesor_id, estado
Asistencia      — id, sesión_id, alumna_id, status, uniforme, uniforme_motivo
Pago            — id, alumna_id, padre_id, importe, fecha_vencimiento, estado, comprobante_url
Profesor        — id, usuario_id, tarifa_hora, disponibilidad_privadas
Evento          — id, tipo, título, descripción, fecha, ubicación, cupo
Noticia         — id, título, cuerpo, imagen_url, fecha, lecturas_confirmadas
Nota            — id, alumna_id, maestro_id, tipo, contenido, estado (borrador/aprobada/publicada)
Logro           — id, alumna_id, tipo, nombre, puntos, fecha_desbloqueo
Notificación    — id, usuario_id, tipo, título, leída, fecha
Paquete         — id, nombre, clases_por_semana, precio, estilos_incluidos
ClasePrivada    — id, alumna_id, profesor_id, fecha, hora, estado, prepago_id
Configuración   — id, clave, valor (umbral_faltas, minutos_checkin, dia_corte)
```

## Roadmap (referencia para priorizar trabajo)

```
Semana 0  → Landing page (reconstruir en Next.js/React/Tailwind)
Mes 1     → Auth + RBAC + Panel admin + Grupos/horarios + Inscripciones + PDF
Mes 2     → Asistencia + Check-in + Panel maestros + Notas + Panel padres + Cobranza + Nómina
Mes 3     → Gamificación + Notificaciones (push + WhatsApp API) + Eventos + Noticias + Clases privadas
Mes 4     → Testing + PWA + Reportes + Onboarding datos reales + Deploy producción
```

## Contacto de la academia

- **Clienta**: Luz María Herrera
- **Teléfono**: (871) 204-4277
- **Instagram**: @epicmotiondancestudio
- **TikTok**: @epicmotionds
- **Ubicación**: Torreón, Coahuila, México
- **Dominios**: epicmotion.com / epicmotion.mx
