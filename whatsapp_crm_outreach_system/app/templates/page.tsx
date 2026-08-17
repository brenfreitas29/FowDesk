import Header from '@/components/Header';
import { prisma } from '@/lib/db';
import { FileCode2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const revalidate = 0;

export default async function TemplatesPage() {
  const templates = await prisma.template.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Gestión de Plantillas Meta WhatsApp" />

      <main className="p-8 max-w-6xl mx-auto space-y-6">
        <div className="glass-panel p-5 border-l-4 border-l-cyan-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileCode2 className="w-6 h-6 text-cyan-400" />
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Separación de Estados: Local vs Meta Cloud</h3>
              <p className="text-xs text-slate-400">
                El estado de Meta (<code className="text-cyan-300 font-mono">APPROVED</code>, <code className="text-cyan-300 font-mono">PENDING</code>) es la fuente de verdad para la disponibilidad real de la plantilla en producción.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((tpl) => (
            <div key={tpl.id} className="glass-panel p-6 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-slate-100 text-sm font-mono">{tpl.templateName}</h4>
                  <p className="text-xs text-slate-400">Idioma: {tpl.language} • Categoría: {tpl.category}</p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    Meta: {tpl.metaStatus}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Local: {tpl.localStatus}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                {tpl.bodyText}
              </div>

              <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                <span>Variables: <code className="text-cyan-400 font-mono">{tpl.variables}</code></span>
                <span>Meta ID: <code className="text-slate-500 font-mono">{tpl.metaTemplateId || 'N/A'}</code></span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
