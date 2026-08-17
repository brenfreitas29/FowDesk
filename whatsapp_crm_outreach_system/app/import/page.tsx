'use client';

import Header from '@/components/Header';
import { useState } from 'react';
import { Upload, FileSpreadsheet, CheckCircle2, AlertTriangle, XCircle, Copy, ShieldAlert, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setErrorMsg('');
      setPreviewData(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/leads/import', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al procesar archivo');

      setPreviewData(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Ocurrió un error en la carga.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirmImport = async () => {
    if (!previewData || !previewData.rows) return;
    setIsSaving(true);

    try {
      // Import rows categorized as VALID or NEEDS_REVIEW
      const validRows = previewData.rows.filter(
        (r: any) => r.category === 'VALID' || r.category === 'NEEDS_REVIEW'
      );

      const res = await fetch('/api/leads/import/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leads: validRows }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al guardar leads');

      router.push('/leads');
    } catch (err: any) {
      setErrorMsg(err.message || 'Error al confirmar importación.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Importar Lista de Leads (Excel / CSV)" />

      <main className="p-8 max-w-6xl mx-auto space-y-8">
        {/* Policy Warning Banner */}
        <div className="glass-panel p-5 border-l-4 border-l-blue-500 flex items-start gap-4">
          <ShieldAlert className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 space-y-1">
            <h4 className="font-bold text-slate-100">Política de Importación & Consentimiento</h4>
            <p>
              Todos los leads importados se guardan automáticamente en estado <code className="text-amber-300 font-mono">REVIEW_REQUIRED</code> con <code className="text-amber-300 font-mono">outreachEligible = false</code>. La normalización telefónica no constituye consentimiento de envío.
            </p>
          </div>
        </div>

        {/* Upload Box */}
        {!previewData ? (
          <div className="glass-panel p-10 flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-emerald-500/50 transition-all rounded-3xl text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileSpreadsheet className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-slate-200 text-lg">Selecciona tu archivo de Prospección (.xlsx o .csv)</h3>
              <p className="text-xs text-slate-400 mt-1">
                Campos soportados: Nombre, Clínica, Especialidad, Barrio, WhatsApp, Teléfono, Website, Instagram, Notas
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <label className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs cursor-pointer border border-slate-700 transition">
                <span>Elegir Archivo</span>
                <input type="file" accept=".xlsx, .xls, .csv" className="hidden" onChange={handleFileChange} />
              </label>

              {file && (
                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition flex items-center gap-2"
                >
                  {isUploading ? 'Analizando...' : 'Analizar & Previsualizar'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {file && <p className="text-xs font-mono text-emerald-400 pt-2">Seleccionado: {file.name}</p>}
            {errorMsg && <p className="text-xs text-red-400 pt-2">{errorMsg}</p>}
          </div>
        ) : (
          /* Preview Breakdown & Results */
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                <span className="text-xs text-slate-400">Total Analizados</span>
                <div className="text-2xl font-bold text-slate-100">{previewData.summary.total}</div>
              </div>
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-center space-y-1">
                <span className="text-xs text-emerald-400 font-medium flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Válidos
                </span>
                <div className="text-2xl font-bold text-emerald-300">{previewData.summary.valid}</div>
              </div>
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 text-center space-y-1">
                <span className="text-xs text-amber-400 font-medium flex items-center justify-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Revisión Requerida
                </span>
                <div className="text-2xl font-bold text-amber-300">{previewData.summary.needsReview}</div>
              </div>
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 text-center space-y-1">
                <span className="text-xs text-purple-400 font-medium flex items-center justify-center gap-1">
                  <Copy className="w-3.5 h-3.5" /> Duplicados
                </span>
                <div className="text-2xl font-bold text-purple-300">{previewData.summary.duplicate}</div>
              </div>
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-center space-y-1">
                <span className="text-xs text-red-400 font-medium flex items-center justify-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Inválidos
                </span>
                <div className="text-2xl font-bold text-red-300">{previewData.summary.invalid}</div>
              </div>
            </div>

            {/* Preview Action Header */}
            <div className="flex items-center justify-between glass-panel p-4">
              <div>
                <h3 className="font-bold text-slate-200 text-sm">Vista Previa de Normalización E.164</h3>
                <p className="text-xs text-slate-400">
                  {previewData.summary.valid + previewData.summary.needsReview} leads serán importados con estado por defecto REVIEW_REQUIRED.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPreviewData(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition"
                >
                  Cancelar / Reintentar
                </button>
                <button
                  onClick={handleConfirmImport}
                  disabled={isSaving}
                  className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition flex items-center gap-2"
                >
                  {isSaving ? 'Guardando...' : 'Confirmar Importación en CRM'}
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Table Preview */}
            <div className="glass-panel overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400 font-semibold">
                    <th className="p-3">Estado Analizado</th>
                    <th className="p-3">Clínica / Prospecto</th>
                    <th className="p-3">Especialidad</th>
                    <th className="p-3">Teléfono Ingresado</th>
                    <th className="p-3">WhatsApp Normalizado (E.164)</th>
                    <th className="p-3">Observación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {previewData.rows.map((row: any) => (
                    <tr key={row.tempId} className="hover:bg-slate-900/40 transition">
                      <td className="p-3">
                        {row.category === 'VALID' && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold">
                            VÁLIDO
                          </span>
                        )}
                        {row.category === 'NEEDS_REVIEW' && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-semibold">
                            REVISIÓN
                          </span>
                        )}
                        {row.category === 'DUPLICATE' && (
                          <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-[10px] font-semibold">
                            DUPLICADO
                          </span>
                        )}
                        {row.category === 'INVALID' && (
                          <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-[10px] font-semibold">
                            INVÁLIDO
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-semibold text-slate-100">
                        {row.clinicName}
                        <span className="block text-[11px] text-slate-400 font-normal">{row.name}</span>
                      </td>
                      <td className="p-3 text-slate-300">{row.specialty}</td>
                      <td className="p-3 font-mono text-slate-400">{row.rawPhone}</td>
                      <td className="p-3 font-mono text-emerald-400 font-medium">{row.formattedPhone}</td>
                      <td className="p-3 text-slate-400 italic">{row.issueReason || 'Normalizado correctamente'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
