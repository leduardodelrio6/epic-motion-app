import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { TipoClase } from "@/app/generated/prisma/client";
import { guardarTarifa } from "./actions";

const ETIQUETAS_TIPO_CLASE: Record<TipoClase, string> = {
  GRUPAL: "Grupal",
  PRIVADA: "Privada",
  ENSAYO: "Ensayo",
  EVENTO: "Evento",
};

async function obtenerProfesores() {
  return prisma.profesor.findMany({
    include: { usuario: true, tarifas: true },
    orderBy: { usuario: { nombre: "asc" } },
  });
}

export default async function NominaPage() {
  if (!process.env.DATABASE_URL) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md text-center space-y-3">
          <h1 className="font-montserrat text-2xl font-bold">Nómina de profesores</h1>
          <p className="text-epic-silver">
            Falta configurar <code className="text-epic-gold">DATABASE_URL</code> en el archivo{" "}
            <code className="text-epic-gold">.env</code> para conectar con Supabase.
          </p>
          <Link href="/" className="inline-block text-epic-gold hover:underline">
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  let profesores;
  try {
    profesores = await obtenerProfesores();
  } catch {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md text-center space-y-3">
          <h1 className="font-montserrat text-2xl font-bold">Nómina de profesores</h1>
          <p className="text-epic-silver">
            No se pudo conectar a la base de datos. Verifica que{" "}
            <code className="text-epic-gold">DATABASE_URL</code> sea correcta y que las
            migraciones estén aplicadas (<code className="text-epic-gold">npx prisma migrate deploy</code>).
          </p>
          <Link href="/" className="inline-block text-epic-gold hover:underline">
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="font-montserrat text-3xl font-bold mb-2">Nómina — Tarifas por profesor</h1>
      <p className="text-epic-silver mb-8">
        Cada profesor puede tener una tarifa distinta según el tipo de clase que imparte.
      </p>

      <div className="space-y-6">
        {profesores.map((profesor) => {
          const tarifasPorTipo = new Map(profesor.tarifas.map((t) => [t.tipoClase, t.tarifa]));

          return (
            <div key={profesor.id} className="bg-epic-gray rounded-lg p-6">
              <h2 className="font-montserrat text-xl font-bold mb-1">
                {profesor.usuario.nombre} {profesor.usuario.apellido}
              </h2>
              <p className="text-sm text-epic-silver mb-4">
                {profesor.especialidades.join(", ") || "Sin especialidades"}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.values(TipoClase).map((tipoClase) => (
                  <form key={tipoClase} action={guardarTarifa} className="space-y-1">
                    <input type="hidden" name="profesorId" value={profesor.id} />
                    <input type="hidden" name="tipoClase" value={tipoClase} />
                    <label className="block text-xs text-epic-silver">
                      {ETIQUETAS_TIPO_CLASE[tipoClase]}
                    </label>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        name="tarifa"
                        min={0}
                        step="0.01"
                        defaultValue={tarifasPorTipo.get(tipoClase) ?? ""}
                        placeholder="$/hora"
                        className="w-full bg-epic-black border border-epic-gray-light rounded px-2 py-1 text-sm focus:outline-none focus:border-epic-gold"
                      />
                      <button
                        type="submit"
                        className="px-2 py-1 text-sm bg-epic-gold text-epic-black rounded font-medium hover:opacity-90"
                      >
                        ✓
                      </button>
                    </div>
                  </form>
                ))}
              </div>
            </div>
          );
        })}

        {profesores.length === 0 && (
          <p className="text-epic-silver">No hay profesores registrados todavía.</p>
        )}
      </div>
    </main>
  );
}
