import Header from '@/components/Header';
import { prisma } from '@/lib/db';
import { Megaphone, ShieldAlert, Users, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

export default async function CampaignsPage() {
  const campaigns = await prisma.campaign.findMany({
    include: {
      _count: {
        select: { leads: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Gestión de Campañas de Prospección" />

      <main className="p-8 max-w-6xl mx-auto space-y-6">
        <div className="glass-panel p-5 border-l-4 border-l-purple-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Megaphone className="w-6 h-6 text-purple-400" />
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Control de Seguridad de Campañas</h3>
              <p className="text-xs text-slate-400">
                Las funciones descontroladas de "Enviar a Todos" están deshabilitadas por diseño. Cada lead requiere revisión previa.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((camp) => (
            <div key={camp.id} className="glass-panel p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-slate-100 text-base">{camp.name}</h4>
                  <p className="text-xs text-slate-400">{camp.description}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-[10px] font-bold uppercase">
                  {camp.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-purple-400" /> Leads Asignados:</span>
                <strong className="text-slate-100 font-bold text-sm">{camp._count.leads}</strong>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
