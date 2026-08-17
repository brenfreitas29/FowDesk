'use client';

import Header from '@/components/Header';
import { useState, useEffect } from 'react';
import { renderMessageTemplate, DEFAULT_INITIAL_TEMPLATE } from '@/lib/template';
import {
  Send,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ShieldBan,
  Eye,
  AlertCircle,
  MessageSquare,
  Sparkles,
  CheckSquare,
} from 'lucide-react';

export default function QueuePage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchQueue = async () => {
    setLoading(true);
    try {
      // Fetch leads that are approved or ready
      const res = await fetch('/api/leads?filter=READY');
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err) {
      console.error('Failed to fetch review queue', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleSelectLead = (id: string) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedLeadIds.length === leads.length) {
      setSelectedLeadIds([]);
    } else {
      setSelectedLeadIds(leads.map((l) => l.id));
    }
  };

  const handleDispatchOutreach = async (ids: string[]) => {
    setIsProcessing(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/outreach/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadIds: ids }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al ejecutar outreach');

      setStatusMessage({
        type: 'success',
        text: `Proceso finalizado para ${data.processedCount} leads. Registros guardados en estado DRY_RUN (Modo Simulación).`,
      });

      setSelectedLeadIds([]);
      setShowBulkModal(false);
      fetchQueue();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error en envío' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Cola de Revisión Previa & Previsualización de Mensajes" />

      <main className="p-8 max-w-7xl mx-auto space-y-6">
        {/* Safety Header Banner */}
        <div className="glass-panel p-5 border-l-4 border-l-purple-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Generador Personalizado de Mensajes en Español</h3>
              <p className="text-xs text-slate-400">
                Variables dinámicas soportadas: <code className="text-purple-300 font-mono">{"{{first_name}}"}</code>, <code className="text-purple-300 font-mono">{"{{clinic_name}}"}</code>, <code className="text-purple-300 font-mono">{"{{specialty}}"}</code>, <code className="text-purple-300 font-mono">{"{{neighborhood}}"}</code>. Sin invención de hechos sobre la clínica.
              </p>
            </div>
          </div>

          {leads.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleSelectAll}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
              >
                {selectedLeadIds.length === leads.length ? 'Desmarcar Todos' : 'Seleccionar Todos'}
              </button>
              {selectedLeadIds.length > 0 && (
                <button
                  onClick={() => setShowBulkModal(true)}
                  className="px-4 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-600 text-slate-950 font-bold text-xs transition flex items-center gap-1.5"
                >
                  <CheckSquare className="w-4 h-4" /> Aprobar Seleccionados ({selectedLeadIds.length})
                </button>
              )}
            </div>
          )}
        </div>

        {statusMessage && (
          <div className={`p-4 rounded-xl text-xs font-semibold border ${
            statusMessage.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            {statusMessage.text}
          </div>
        )}

        {/* Queue Grid */}
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">Cargando cola de revisión...</div>
        ) : leads.length === 0 ? (
          <div className="glass-panel p-12 text-center text-slate-400 text-xs space-y-2">
            <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500/60" />
            <h4 className="font-bold text-slate-200 text-sm">Cola de Revisión Vacía</h4>
            <p className="text-slate-500">No hay leads pendientes de prospección directa aprobada.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leads.map((lead) => {
              const previewText = renderMessageTemplate(DEFAULT_INITIAL_TEMPLATE, {
                first_name: lead.name,
                clinic_name: lead.clinicName,
                specialty: lead.specialty,
                neighborhood: lead.neighborhood || undefined,
                website: lead.website || undefined,
              });

              const isSelected = selectedLeadIds.includes(lead.id);

              return (
                <div
                  key={lead.id}
                  className={`glass-panel p-6 space-y-4 transition border ${
                    isSelected ? 'border-purple-500/80 bg-purple-950/20' : 'border-slate-800'
                  }`}
                >
                  {/* Lead Header */}
                  <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectLead(lead.id)}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-purple-500 focus:ring-0"
                      />
                      <div>
                        <h4 className="font-bold text-slate-100 text-sm">{lead.clinicName}</h4>
                        <p className="text-xs text-slate-400">{lead.name} • <span className="font-mono text-emerald-400">{lead.whatsapp}</span></p>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {lead.specialty}
                    </span>
                  </div>

                  {/* Message Preview Box */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold border-b border-slate-800/60 pb-1.5">
                      <span>Previsualización del Mensaje</span>
                      <span className="text-purple-400">Español (Plantilla Inicial)</span>
                    </div>
                    <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                      {previewText}
                    </p>
                  </div>

                  {/* Context Metrics */}
                  <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Sitio Web: <strong className="text-slate-300 font-normal">{lead.website || 'No especificado'}</strong></span>
                    <span>Elegibilidad: <strong className="text-emerald-400 font-medium">Verificada</strong></span>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
                    <button
                      onClick={() => handleDispatchOutreach([lead.id])}
                      disabled={isProcessing}
                      className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" /> Aprobar & Enviar (Dry Run)
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Explicit Bulk Confirmation Modal (Rule #9) */}
        {showBulkModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="glass-panel p-6 max-w-md w-full space-y-5 border-amber-500/50 shadow-2xl">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertCircle className="w-6 h-6 shrink-0" />
                <h3 className="font-bold text-base text-slate-100">Confirmar Aprobación Grupal Explicitamente</h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Estás a punto de aprobar e iniciar prospección para <strong className="text-amber-300">{selectedLeadIds.length} leads seleccionados</strong>.
              </p>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1 font-mono">
                <div>• Modo: DRY RUN (Simulación en BD)</div>
                <div>• Endpoint: Meta WhatsApp Business Cloud API</div>
                <div>• Envíos Masivos Automáticos: DESHABILITADOS</div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowBulkModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDispatchOutreach(selectedLeadIds)}
                  disabled={isProcessing}
                  className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                >
                  {isProcessing ? 'Procesando...' : 'Confirmar & Ejecutar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
