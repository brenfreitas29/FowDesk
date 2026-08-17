import Header from '@/components/Header';
import { prisma } from '@/lib/db';
import { ShieldCheck, Clock, User, FileText } from 'lucide-react';

export const revalidate = 0;

export default async function AuditPage() {
  const logs = await prisma.auditLog.findMany({
    take: 50,
    orderBy: { createdAt: 'desc' },
    include: {
      lead: {
        select: { name: true, clinicName: true, whatsapp: true },
      },
    },
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Auditoría de Acciones & Seguridad" />

      <main className="p-8 max-w-6xl mx-auto space-y-6">
        <div className="glass-panel p-5 border-l-4 border-l-emerald-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Registro de Auditoría Inalterable</h3>
              <p className="text-xs text-slate-400">
                Todas las decisiones de prospección, aprobaciones, bloqueos de elegibilidad y eventos de opt-out son auditables.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-panel overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400 font-semibold">
                <th className="p-3.5">Fecha / Hora</th>
                <th className="p-3.5">Acción Auditada</th>
                <th className="p-3.5">Operador / Actor</th>
                <th className="p-3.5">Clínica Prospecto</th>
                <th className="p-3.5">Detalle del Registro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">Sin registros de auditoría.</td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-900/40 transition">
                    <td className="p-3.5 font-mono text-slate-400">
                      {new Date(log.createdAt).toLocaleString('es-AR')}
                    </td>
                    <td className="p-3.5 font-bold text-emerald-400">{log.action}</td>
                    <td className="p-3.5 font-medium text-slate-300">{log.actor}</td>
                    <td className="p-3.5 font-semibold text-slate-100">
                      {log.lead ? log.lead.clinicName : '-'}
                    </td>
                    <td className="p-3.5 text-slate-300">{log.details}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
