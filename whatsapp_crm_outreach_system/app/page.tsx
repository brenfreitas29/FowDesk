import Header from '@/components/Header';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import {
  Users,
  Clock,
  CheckCircle2,
  Send,
  MessageSquare,
  UserCheck,
  ShieldBan,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const revalidate = 0;

export default async function DashboardPage() {
  const [
    totalLeads,
    reviewRequiredCount,
    readyApprovedCount,
    messagesCount,
    dryRunCount,
    deliveredCount,
    readCount,
    repliesCount,
    humanRequiredCount,
    dncCount,
    recentAuditLogs,
    recentLeads,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'REVIEW_REQUIRED' } }),
    prisma.lead.count({ where: { status: { in: ['READY', 'APPROVED'] } } }),
    prisma.message.count({ where: { direction: 'OUTBOUND' } }),
    prisma.message.count({ where: { status: 'DRY_RUN' } }),
    prisma.message.count({ where: { status: 'DELIVERED' } }),
    prisma.message.count({ where: { status: 'READ' } }),
    prisma.lead.count({ where: { status: 'REPLIED' } }),
    prisma.lead.count({ where: { requiresHumanResponse: true } }),
    prisma.lead.count({ where: { OR: [{ doNotContact: true }, { optOut: true }, { status: 'DO_NOT_CONTACT' }] } }),
    prisma.auditLog.findMany({ take: 6, orderBy: { createdAt: 'desc' }, include: { lead: true } }),
    prisma.lead.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
  ]);

  // Analytics terminology matching Rule #19 (No "Open Rate", use Read Rate, Reply Rate)
  const readRate = messagesCount > 0 ? ((readCount / messagesCount) * 100).toFixed(1) : '0.0';
  const replyRate = messagesCount > 0 ? ((repliesCount / messagesCount) * 100).toFixed(1) : '0.0';

  const statCards = [
    { title: 'Total Leads', value: totalLeads, icon: Users, color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400' },
    { title: 'Revisión Pendiente', value: reviewRequiredCount, icon: Clock, color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400', badge: 'Default Import' },
    { title: 'Listos / Aprobados', value: readyApprovedCount, icon: CheckCircle2, color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400' },
    { title: 'Envíos Simulados (Dry Run)', value: dryRunCount, icon: Send, color: 'from-purple-500/20 to-violet-500/10 border-purple-500/30 text-purple-400', badge: 'Modo Seguro' },
    { title: 'Respuestas Recibidas', value: repliesCount, icon: MessageSquare, color: 'from-cyan-500/20 to-sky-500/10 border-cyan-500/30 text-cyan-400' },
    { title: 'Atención Humana Requerida', value: humanRequiredCount, icon: AlertTriangle, color: 'from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-400', badge: 'Acción Requerida' },
    { title: 'No Contactar (Opt-out)', value: dncCount, icon: ShieldBan, color: 'from-red-500/20 to-red-600/10 border-red-500/30 text-red-400' },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Panel General de Control" />

      <main className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Top Safety Banner */}
        <div className="glass-panel p-6 border-l-4 border-l-amber-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-slate-100 text-base">Modo Simulación (Dry Run) Activo por Defecto</h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Las salidas de mensajes registrarán registros de estado <code className="text-amber-300 font-mono">DRY_RUN</code> en la base de datos sin consumir cuota ni enviar tráfico a Meta Cloud API.
              </p>
            </div>
          </div>
          <Link
            href="/queue"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-lg text-xs transition flex items-center gap-1.5 shrink-0"
          >
            <span>Ir a Cola de Revisión</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className={`p-5 rounded-2xl bg-gradient-to-br border ${card.color} glass-card space-y-3 relative overflow-hidden`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">{card.title}</span>
                  <Icon className="w-5 h-5 opacity-80" />
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-slate-100 tracking-tight">{card.value}</span>
                  {card.badge && (
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {card.badge}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Rates & Funnel Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversion Funnel */}
          <div className="lg:col-span-2 glass-panel p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-slate-200 text-sm">Rendimiento de Prospección & Tasas Oficiales</h3>
              </div>
              <span className="text-xs text-slate-500">Sin estimaciones ficticias</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Read Rate (Tasa de Lectura)</span>
                <div className="text-2xl font-bold text-emerald-400">{readRate}%</div>
                <p className="text-[11px] text-slate-500">Confirmaciones de lectura webhook recibidas</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Reply Rate (Tasa de Respuesta)</span>
                <div className="text-2xl font-bold text-cyan-400">{replyRate}%</div>
                <p className="text-[11px] text-slate-500">Leads que respondieron mensaje de prospección</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>Estado del Embudo</span>
                <span>{totalLeads} contactos registrados</span>
              </div>
              <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden flex border border-slate-800">
                <div style={{ width: `${totalLeads ? (reviewRequiredCount / totalLeads) * 100 : 0}%` }} className="bg-amber-500" title="Revisión Pendiente" />
                <div style={{ width: `${totalLeads ? (readyApprovedCount / totalLeads) * 100 : 0}%` }} className="bg-emerald-500" title="Aprobados" />
                <div style={{ width: `${totalLeads ? (repliesCount / totalLeads) * 100 : 0}%` }} className="bg-cyan-500" title="Respondieron" />
                <div style={{ width: `${totalLeads ? (dncCount / totalLeads) * 100 : 0}%` }} className="bg-red-500" title="No Contactar" />
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"/> Revisión Pendiente</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"/> Aprobados / Listos</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-500"/> Respondieron</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"/> No Contactar</span>
              </div>
            </div>
          </div>

          {/* Recent Audit Log */}
          <div className="glass-panel p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-200 text-sm">Registro de Auditoría Reciente</h3>
              <Link href="/audit" className="text-xs text-emerald-400 hover:underline">Ver Todos</Link>
            </div>

            <div className="space-y-3">
              {recentAuditLogs.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">No hay registros de auditoría aún.</p>
              ) : (
                recentAuditLogs.map((log) => (
                  <div key={log.id} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-emerald-400">{log.action}</span>
                      <span className="text-slate-500">{new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2">{log.details}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
