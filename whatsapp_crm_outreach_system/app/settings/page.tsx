import Header from '@/components/Header';
import { Settings, ShieldCheck, ShieldAlert, Key, Globe, Database, Server } from 'lucide-react';

export default function SettingsPage() {
  const sendEnabled = process.env.WHATSAPP_SEND_ENABLED === 'true';
  const apiVersion = process.env.WHATSAPP_API_VERSION || 'v20.0';
  const webhookToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'crm_secure_webhook_token_2026';
  const dbUrl = process.env.DATABASE_URL || 'file:./dev.db';

  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Configuración del Sistema & Credenciales Meta" />

      <main className="p-8 max-w-4xl mx-auto space-y-6">
        {/* Safety Mode Banner */}
        <div className="glass-panel p-6 border-l-4 border-l-amber-500 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
            <ShieldAlert className="w-5 h-5" />
            <span>ESTADO DE ENVIOS EN PRODUCCION (WHATSAPP_SEND_ENABLED)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Actualmente <code className="text-amber-300 font-mono">WHATSAPP_SEND_ENABLED = {sendEnabled ? 'true' : 'false'}</code>. Todos los intentos de envío de outreach se guardan con el estado inofensivo <code className="text-amber-300 font-mono">DRY_RUN</code> en la base de datos sin conectar con la API real de Meta.
          </p>
        </div>

        {/* Credentials & Config Card */}
        <div className="glass-panel p-6 space-y-5">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2 border-b border-slate-800 pb-3">
            <Key className="w-4 h-4 text-emerald-400" /> Variables de Entorno & Configuración del Servidor
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 gap-2">
              <div>
                <span className="font-bold text-slate-200">WHATSAPP_API_VERSION</span>
                <p className="text-[11px] text-slate-500">Versión configurable de la API de Graph Meta</p>
              </div>
              <span className="font-mono text-emerald-400 font-bold bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">{apiVersion}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 gap-2">
              <div>
                <span className="font-bold text-slate-200">WHATSAPP_WEBHOOK_VERIFY_TOKEN</span>
                <p className="text-[11px] text-slate-500">Token de verificación para endpoint GET /api/webhooks/whatsapp</p>
              </div>
              <span className="font-mono text-cyan-400 font-bold bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">{webhookToken}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 gap-2">
              <div>
                <span className="font-bold text-slate-200">DATABASE_URL</span>
                <p className="text-[11px] text-slate-500">Conexión ORM Prisma (SQLite en desarrollo local, PostgreSQL en producción)</p>
              </div>
              <span className="font-mono text-slate-300 font-bold bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 truncate max-w-xs">{dbUrl}</span>
            </div>
          </div>
        </div>

        {/* Webhook Production Endpoint Info */}
        <div className="glass-panel p-6 space-y-3">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2 border-b border-slate-800 pb-3">
            <Globe className="w-4 h-4 text-cyan-400" /> Endpoint de Webhook para Meta Business Manager
          </h3>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 break-all">
            https://tu-dominio.com/api/webhooks/whatsapp
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Configura este URL en tu panel de Meta Developers bajo el producto WhatsApp Webhook para recibir eventos de entrega (sent, delivered, read) y mensajes entrantes.
          </p>
        </div>
      </main>
    </div>
  );
}
