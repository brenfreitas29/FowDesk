'use client';

import Header from '@/components/Header';
import { useState, useEffect } from 'react';
import {
  Users,
  Search,
  CheckCircle2,
  Clock,
  ShieldBan,
  MessageSquare,
  AlertCircle,
  Eye,
  Send,
  X,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const url = new URL('/api/leads', window.location.origin);
      if (filter !== 'ALL') url.searchParams.set('filter', filter);
      if (search) url.searchParams.set('search', search);

      const res = await fetch(url.toString());
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err) {
      console.error('Failed to fetch leads', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [filter, search]);

  const handleApprove = async (leadId: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/leads/${leadId}/approve`, { method: 'POST' });
      if (res.ok) {
        fetchLeads();
        if (selectedLead?.id === leadId) {
          setSelectedLead((prev: any) => ({ ...prev, status: 'APPROVED', outreachEligible: true }));
        }
      }
    } catch (err) {
      console.error('Approval error', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleDNC = async (leadId: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doNotContact: true }),
      });
      if (res.ok) {
        fetchLeads();
        if (selectedLead?.id === leadId) {
          setSelectedLead((prev: any) => ({ ...prev, status: 'DO_NOT_CONTACT', doNotContact: true }));
        }
      }
    } catch (err) {
      console.error('DNC error', err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Gestión de Leads & Prospectos" />

      <main className="p-8 max-w-7xl mx-auto space-y-6">
        {/* Filter Controls Bar */}
        <div className="glass-panel p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {[
              { id: 'ALL', label: 'Todos los Leads' },
              { id: 'REVIEW_REQUIRED', label: 'Pendiente Revisión' },
              { id: 'READY', label: 'Aprobados' },
              { id: 'HUMAN_REQUIRED', label: 'Atención Humana' },
              { id: 'REPLIED', label: 'Respondieron' },
              { id: 'DO_NOT_CONTACT', label: 'No Contactar' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filter === tab.id
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar por clínica, nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>
        </div>

        {/* Leads Table */}
        <div className="glass-panel overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-xs">Cargando lista de leads...</div>
          ) : leads.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-xs space-y-2">
              <Users className="w-8 h-8 mx-auto text-slate-600" />
              <p>No se encontraron leads con los filtros seleccionados.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="p-3.5">Clínica & Prospecto</th>
                  <th className="p-3.5">Especialidad</th>
                  <th className="p-3.5">WhatsApp (E.164)</th>
                  <th className="p-3.5">Prioridad</th>
                  <th className="p-3.5">Estado Lead</th>
                  <th className="p-3.5">Elegibilidad Outreach</th>
                  <th className="p-3.5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-900/40 transition">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-100">{lead.clinicName}</div>
                      <div className="text-[11px] text-slate-400 font-medium">{lead.name}</div>
                    </td>
                    <td className="p-3.5 font-medium text-slate-300">{lead.specialty}</td>
                    <td className="p-3.5 font-mono text-emerald-400 font-medium">{lead.whatsapp}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        lead.priority === 'URGENT' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        lead.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                        'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {lead.priority}
                      </span>
                    </td>
                    <td className="p-3.5">
                      {lead.status === 'REVIEW_REQUIRED' && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold flex items-center gap-1 w-fit">
                          <Clock className="w-3 h-3" /> REVISIÓN REQUERIDA
                        </span>
                      )}
                      {lead.status === 'APPROVED' && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" /> APROBADO
                        </span>
                      )}
                      {lead.status === 'READY' && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" /> LISTO
                        </span>
                      )}
                      {lead.status === 'REPLIED' && (
                        <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold flex items-center gap-1 w-fit">
                          <MessageSquare className="w-3 h-3" /> RESPONDIÓ
                        </span>
                      )}
                      {lead.status === 'DO_NOT_CONTACT' && (
                        <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-[10px] font-bold flex items-center gap-1 w-fit">
                          <ShieldBan className="w-3 h-3" /> NO CONTACTAR
                        </span>
                      )}
                    </td>
                    <td className="p-3.5">
                      {lead.outreachEligible && !lead.doNotContact ? (
                        <span className="text-emerald-400 font-semibold text-[11px]">Habilitado</span>
                      ) : (
                        <span className="text-slate-500 font-medium text-[11px]">Bloqueado</span>
                      )}
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
                      >
                        Ver Detalle
                      </button>
                      {lead.status === 'REVIEW_REQUIRED' && (
                        <button
                          onClick={() => handleApprove(lead.id)}
                          disabled={actionLoading}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 text-xs font-bold transition"
                        >
                          Aprobar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Lead Detail Drawer / Modal */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
            <div className="w-full max-w-xl bg-slate-900 border-l border-slate-800 p-6 h-full overflow-y-auto space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-100">{selectedLead.clinicName}</h3>
                  <p className="text-xs text-slate-400 font-medium">{selectedLead.name}</p>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status and Consent Badges */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-medium">Estado del Lead</span>
                  <div className="font-bold text-slate-200">{selectedLead.status}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-medium">Consentimiento</span>
                  <div className="font-bold text-slate-200">{selectedLead.consentStatus}</div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Información de Contacto</h4>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Especialidad:</span>
                    <span className="font-medium text-slate-200">{selectedLead.specialty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Barrio / Zona:</span>
                    <span className="font-medium text-slate-200">{selectedLead.neighborhood || 'No especificada'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">WhatsApp:</span>
                    <span className="font-mono text-emerald-400 font-bold">{selectedLead.whatsapp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sitio Web:</span>
                    <span className="font-medium text-slate-300">{selectedLead.website || 'Sin sitio web verificado'}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions in Drawer */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                {!selectedLead.doNotContact && selectedLead.status !== 'DO_NOT_CONTACT' && (
                  <button
                    onClick={() => handleToggleDNC(selectedLead.id)}
                    className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <ShieldBan className="w-4 h-4" /> Marcar No Contactar (Opt-out)
                  </button>
                )}

                {selectedLead.status === 'REVIEW_REQUIRED' && (
                  <button
                    onClick={() => handleApprove(selectedLead.id)}
                    className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Aprobar Elegibilidad
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
