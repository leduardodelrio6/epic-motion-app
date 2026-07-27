"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { TipoClase } from "@/app/generated/prisma/client";

export async function guardarTarifa(formData: FormData) {
  const profesorId = formData.get("profesorId") as string;
  const tipoClase = formData.get("tipoClase") as TipoClase;
  const tarifa = Number(formData.get("tarifa"));

  if (!profesorId || !tipoClase || Number.isNaN(tarifa) || tarifa < 0) {
    throw new Error("Datos de tarifa inválidos");
  }

  await prisma.tarifaProfesor.upsert({
    where: { profesorId_tipoClase: { profesorId, tipoClase } },
    update: { tarifa },
    create: { profesorId, tipoClase, tarifa },
  });

  revalidatePath("/nomina");
}
