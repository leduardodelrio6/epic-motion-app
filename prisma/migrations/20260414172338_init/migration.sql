-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'MAESTRO', 'PADRE', 'RECEPCIONISTA');

-- CreateEnum
CREATE TYPE "EstatusAlumna" AS ENUM ('ACTIVA', 'INACTIVA', 'PRUEBA');

-- CreateEnum
CREATE TYPE "EstiloClase" AS ENUM ('BALLET', 'HIPHOP', 'TAP', 'JAZZ', 'ACRO');

-- CreateEnum
CREATE TYPE "EstadoSesion" AS ENUM ('PROGRAMADA', 'INICIADA', 'COMPLETADA', 'NO_INICIADA');

-- CreateEnum
CREATE TYPE "EstadoAsistencia" AS ENUM ('PRESENTE', 'TARDE', 'AUSENTE');

-- CreateEnum
CREATE TYPE "EstadoPago" AS ENUM ('PENDIENTE', 'PAGADO', 'VENCIDO');

-- CreateEnum
CREATE TYPE "TipoPago" AS ENUM ('MENSUALIDAD', 'CLASE_PRIVADA', 'INSCRIPCION', 'OTRO');

-- CreateEnum
CREATE TYPE "TipoEvento" AS ENUM ('RECITAL', 'COMPETENCIA_INTERNA', 'COMPETENCIA_EXTERNA', 'SHOWCASE', 'ENSAYO');

-- CreateEnum
CREATE TYPE "TipoNota" AS ENUM ('RUTINARIA', 'EXTRAORDINARIA');

-- CreateEnum
CREATE TYPE "EstadoNota" AS ENUM ('BORRADOR', 'APROBADA', 'PUBLICADA');

-- CreateEnum
CREATE TYPE "EstadoClasePrivada" AS ENUM ('AGENDADA', 'PAGADA', 'COMPLETADA', 'CANCELADA');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" TEXT,
    "rol" "Rol" NOT NULL,
    "avatar" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alumna" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "foto" TEXT,
    "estatus" "EstatusAlumna" NOT NULL DEFAULT 'ACTIVA',
    "fechaInscripcion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "padreId" TEXT NOT NULL,

    CONSTRAINT "Alumna_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Salon" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "capacidad" INTEGER NOT NULL,

    CONSTRAINT "Salon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clase" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "estilo" "EstiloClase" NOT NULL,
    "nivel" TEXT,
    "duracion" INTEGER NOT NULL,
    "dias" TEXT[],
    "horario" TEXT NOT NULL,
    "cupo" INTEGER NOT NULL,
    "salonId" TEXT NOT NULL,
    "profesorId" TEXT NOT NULL,

    CONSTRAINT "Clase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlumnaClase" (
    "id" TEXT NOT NULL,
    "fechaInscripcion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alumnaId" TEXT NOT NULL,
    "claseId" TEXT NOT NULL,

    CONSTRAINT "AlumnaClase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sesion" (
    "id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "horaInicio" TIMESTAMP(3) NOT NULL,
    "horaFin" TIMESTAMP(3) NOT NULL,
    "estado" "EstadoSesion" NOT NULL DEFAULT 'PROGRAMADA',
    "checkinAt" TIMESTAMP(3),
    "claseId" TEXT NOT NULL,
    "profesorId" TEXT NOT NULL,

    CONSTRAINT "Sesion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asistencia" (
    "id" TEXT NOT NULL,
    "estado" "EstadoAsistencia" NOT NULL,
    "uniforme" BOOLEAN NOT NULL DEFAULT true,
    "uniformeMotivo" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sesionId" TEXT NOT NULL,
    "alumnaId" TEXT NOT NULL,

    CONSTRAINT "Asistencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pago" (
    "id" TEXT NOT NULL,
    "importe" DOUBLE PRECISION NOT NULL,
    "concepto" TEXT NOT NULL,
    "fechaVencimiento" TIMESTAMP(3) NOT NULL,
    "fechaPago" TIMESTAMP(3),
    "estado" "EstadoPago" NOT NULL DEFAULT 'PENDIENTE',
    "comprobanteUrl" TEXT,
    "tipo" "TipoPago" NOT NULL,
    "alumnaId" TEXT NOT NULL,
    "padreId" TEXT NOT NULL,

    CONSTRAINT "Pago_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profesor" (
    "id" TEXT NOT NULL,
    "tarifaHora" DOUBLE PRECISION NOT NULL,
    "especialidades" TEXT[],
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Profesor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" TEXT NOT NULL,
    "tipo" "TipoEvento" NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL,
    "ubicacion" TEXT,
    "cupo" INTEGER,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventoGrupo" (
    "eventoId" TEXT NOT NULL,
    "claseId" TEXT NOT NULL,

    CONSTRAINT "EventoGrupo_pkey" PRIMARY KEY ("eventoId","claseId")
);

-- CreateTable
CREATE TABLE "Noticia" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "cuerpo" TEXT NOT NULL,
    "imagenUrl" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "autorId" TEXT NOT NULL,

    CONSTRAINT "Noticia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LecturaNoticia" (
    "id" TEXT NOT NULL,
    "fechaLectura" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "noticiaId" TEXT NOT NULL,
    "padreId" TEXT NOT NULL,

    CONSTRAINT "LecturaNoticia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nota" (
    "id" TEXT NOT NULL,
    "tipo" "TipoNota" NOT NULL,
    "contenido" TEXT NOT NULL,
    "estado" "EstadoNota" NOT NULL DEFAULT 'BORRADOR',
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aprobadaPor" TEXT,
    "alumnaId" TEXT NOT NULL,
    "maestroId" TEXT NOT NULL,

    CONSTRAINT "Nota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logro" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "icono" TEXT,
    "puntos" INTEGER NOT NULL,
    "fechaDesbloqueo" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alumnaId" TEXT NOT NULL,

    CONSTRAINT "Logro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacion" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "cuerpo" TEXT,
    "leida" BOOLEAN NOT NULL DEFAULT false,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Notificacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paquete" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "clasesPorSemana" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "estilosIncluidos" TEXT[],
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Paquete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClasePrivada" (
    "id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "hora" TEXT NOT NULL,
    "duracion" INTEGER NOT NULL DEFAULT 60,
    "estado" "EstadoClasePrivada" NOT NULL DEFAULT 'AGENDADA',
    "alumnaId" TEXT NOT NULL,
    "profesorId" TEXT NOT NULL,
    "prepagoId" TEXT,

    CONSTRAINT "ClasePrivada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Configuracion" (
    "id" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Configuracion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AlumnaClase_alumnaId_claseId_key" ON "AlumnaClase"("alumnaId", "claseId");

-- CreateIndex
CREATE UNIQUE INDEX "Asistencia_sesionId_alumnaId_key" ON "Asistencia"("sesionId", "alumnaId");

-- CreateIndex
CREATE UNIQUE INDEX "Profesor_usuarioId_key" ON "Profesor"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "LecturaNoticia_noticiaId_padreId_key" ON "LecturaNoticia"("noticiaId", "padreId");

-- CreateIndex
CREATE UNIQUE INDEX "Configuracion_clave_key" ON "Configuracion"("clave");

-- AddForeignKey
ALTER TABLE "Alumna" ADD CONSTRAINT "Alumna_padreId_fkey" FOREIGN KEY ("padreId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clase" ADD CONSTRAINT "Clase_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clase" ADD CONSTRAINT "Clase_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlumnaClase" ADD CONSTRAINT "AlumnaClase_alumnaId_fkey" FOREIGN KEY ("alumnaId") REFERENCES "Alumna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlumnaClase" ADD CONSTRAINT "AlumnaClase_claseId_fkey" FOREIGN KEY ("claseId") REFERENCES "Clase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sesion" ADD CONSTRAINT "Sesion_claseId_fkey" FOREIGN KEY ("claseId") REFERENCES "Clase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sesion" ADD CONSTRAINT "Sesion_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_sesionId_fkey" FOREIGN KEY ("sesionId") REFERENCES "Sesion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_alumnaId_fkey" FOREIGN KEY ("alumnaId") REFERENCES "Alumna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_alumnaId_fkey" FOREIGN KEY ("alumnaId") REFERENCES "Alumna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_padreId_fkey" FOREIGN KEY ("padreId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profesor" ADD CONSTRAINT "Profesor_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventoGrupo" ADD CONSTRAINT "EventoGrupo_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventoGrupo" ADD CONSTRAINT "EventoGrupo_claseId_fkey" FOREIGN KEY ("claseId") REFERENCES "Clase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noticia" ADD CONSTRAINT "Noticia_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LecturaNoticia" ADD CONSTRAINT "LecturaNoticia_noticiaId_fkey" FOREIGN KEY ("noticiaId") REFERENCES "Noticia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LecturaNoticia" ADD CONSTRAINT "LecturaNoticia_padreId_fkey" FOREIGN KEY ("padreId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_alumnaId_fkey" FOREIGN KEY ("alumnaId") REFERENCES "Alumna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_maestroId_fkey" FOREIGN KEY ("maestroId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logro" ADD CONSTRAINT "Logro_alumnaId_fkey" FOREIGN KEY ("alumnaId") REFERENCES "Alumna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacion" ADD CONSTRAINT "Notificacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClasePrivada" ADD CONSTRAINT "ClasePrivada_alumnaId_fkey" FOREIGN KEY ("alumnaId") REFERENCES "Alumna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClasePrivada" ADD CONSTRAINT "ClasePrivada_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Profesor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClasePrivada" ADD CONSTRAINT "ClasePrivada_prepagoId_fkey" FOREIGN KEY ("prepagoId") REFERENCES "Pago"("id") ON DELETE SET NULL ON UPDATE CASCADE;
