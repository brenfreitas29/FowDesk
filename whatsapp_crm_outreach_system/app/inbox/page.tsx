'use client';

import Header from '@/components/Header';
import { useState, useEffect } from 'react';
import {
  MessageSquare,
  AlertTriangle,
  Send,
  User,
  ShieldBan,
  Clock,
  CheckCircle2,
  Phone,
  Sparkles,
} from 'lucide-react';

export default function InboxPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [filter, setFilter] = useState('HUMAN_REQUIRED');

  const fetchInboxLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/leads?filter=${filter}`);
      const data = await res.json();
      const fetched = data.leads || [];
      setLeads(fetched);
      if (fetched.length > 0 && !selectedLead) {
        setSelectedLead(fetched[0]);
      }
    } catch (err) {
      console.error('Failed to fetch inbox', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInboxLeads();
  }, [filter]);

  const handleSendManualReply = async () => {
    if (!selectedLead || !replyText.trim()) return;
    setSending(true);

    try {
      const res = await fetch('/api/outreach/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadIds: [selectedLead.id],
          customMessage: replyText,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al enviar respuesta');

      setReplyText('');

      // Refresh current lead details
      const leadRes = await fetch(`/api/leads/${selectedLead.id}`);
      const leadData = await leadRes.json();
      if (leadData.lead) {
        setSelectedLead(leadData.lead);
      }

      fetchInboxLeads();
    } catch (err: any) {
      alert(err.message || 'Error en envío');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto flex flex-col h-screen">
      <Header title="Inbox & Conversaciones WhatsApp" />

      <div className="flex-1 flex min-h-0">
        {/* Inbox Sidebar List */}
        <div className="w-80 bg-slate-900/80 border-r border-slate-800 flex flex-col">
          {/* Category Tabs */}
          <div className="p-3 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto">
            {[
              { id: 'HUMAN_REQUIRED', label: 'Requieren Humano' },
              { id: 'REPLIED', label: 'Respondieron' },
              { id: 'ALL', label: 'Todos' },
              { id: 'DO_NOT_CONTACT', label: 'No Contactar' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap transition ${
                  filter === tab.id
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Leads List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
            {loading ? (
              <div className="p-6 text-center text-xs text-slate-500">Cargando conversaciones...</div>
            ) : leads.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">No hay chats en esta categoría.</div>
            ) : (
              leads.map((lead) => {
                const isSelected = selectedLead?.id === lead.id;
                const lastMsg = lead.messages?.[lead.messages.length - 1];

                return (
                  <button
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`w-full p-3.5 text-left transition flex flex-col gap-1.5 ${
                      isSelected ? 'bg-slate-800/80 border-l-4 border-l-emerald-400' : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-100 truncate">{lead.clinicName}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {lead.lastReplyAt ? new Date(lead.lastReplyAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 truncate">{lead.name} • {lead.specialty}</p>

                    {lead.requiresHumanResponse && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[9px] font-bold w-fit flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> RESPUESTA HUMANA REQUERIDA
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Conversation View */}
        <div className="flex-1 flex flex-col bg-slate-950/60">
          {selectedLead ? (
            <>
              {/* Chat Header */}
              <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-100">{selectedLead.clinicName}</h3>
                  <p className="text-xs text-slate-400">{selectedLead.name} • <span className="font-mono text-emerald-400">{selectedLead.whatsapp}</span></p>
                </div>

                <div className="flex items-center gap-2">
                  {selectedLead.requiresHumanResponse && (
                    <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1.5 animate-pulse">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> HUMAN RESPONSE REQUIRED
                    </span>
                  )}
                  {selectedLead.doNotContact && (
                    <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-bold flex items-center gap-1.5">
                      <ShieldBan className="w-3.5 h-3.5" /> NO CONTACTAR
                    </span>
                  )}
                </div>
              </div>

              {/* Message Timeline */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {(!selectedLead.messages || selectedLead.messages.length === 0) ? (
                  <div className="p-8 text-center text-xs text-slate-500">No hay historial de mensajes cargado.</div>
                ) : (
                  selectedLead.messages.map((msg: any) => {
                    const isInbound = msg.direction === 'INBOUND';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isInbound ? 'items-start' : 'items-end'}`}
                      >
                        <div
                          className={`max-w-md p-4 rounded-2xl text-xs space-y-1.5 ${
                            isInbound
                              ? 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none'
                              : 'bg-emerald-600/30 border border-emerald-500/40 text-emerald-100 rounded-tr-none'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] opacity-70 border-b border-white/10 pb-1">
                            <span className="font-bold">{isInbound ? 'Prospecto (Inbound)' : `Operador (${msg.status})`}</span>
                            <span className="font-mono">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Manual Reply Bar (Guarded by DNC check) */}
              <div className="p-4 bg-slate-900/90 border-t border-slate-800">
                {selectedLead.doNotContact || selectedLead.optOut ? (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold text-center flex items-center justify-center gap-2">
                    <ShieldBan className="w-4 h-4" /> Bloqueado: El contacto ha solicitado no ser contactado (Opt-out activo).
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <textarea
                      rows={2}
                      placeholder="Escribe una respuesta manual para el prospecto (Modo Simulación Activo)..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 transition resize-none"
                    />
                    <button
                      onClick={handleSendManualReply}
                      disabled={sending || !replyText.trim()}
                      className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 shrink-0"
                    >
                      <Send className="w-4 h-4" />
                      {sending ? 'Enviando...' : 'Enviar Respuesta'}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
              Selecciona una conversación para interactuar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
