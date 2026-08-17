'use client';

import Header from '@/components/Header';
import { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Globe,
  Key,
  MessageSquare,
  RefreshCw,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';

export default function TestSandboxPage() {
  const [testPhone, setTestPhone] = useState('+5491112345678');
  const [testMessage, setTestMessage] = useState('Hola! Este es un mensaje de prueba de la sandbox CRM WhatsApp.');
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<any>(null);

  // Webhook challenge tester
  const [webhookVerifyResult, setWebhookVerifyResult] = useState<any>(null);
  const [verifyingWebhook, setVerifyingWebhook] = useState(false);

  // Webhook simulator state
  const [simText, setSimText] = useState('No gracias, por favor no contactar');
  const [simPhone, setSimPhone] = useState('+5491147829012');
  const [simulating, setSimulating] = useState(false);
  const [simResult, setSimResult] = useState<any>(null);

  const handleTestSend = async () => {
    setSending(true);
    setSendResult(null);

    try {
      const res = await fetch('/api/test-sandbox/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientPhone: testPhone,
          messageContent: testMessage,
        }),
      });

      const data = await res.json();
      setSendResult({ ok: res.ok, status: res.status, data });
    } catch (err: any) {
      setSendResult({ ok: false, error: err.message });
    } finally {
      setSending(false);
    }
  };

  const handleVerifyWebhook = async () => {
    setVerifyingWebhook(true);
    setWebhookVerifyResult(null);

    try {
      const token = 'crm_secure_webhook_token_2026';
      const challenge = `challenge_${Date.now()}`;
      const url = `/api/webhooks/whatsapp?hub.mode=subscribe&hub.verify_token=${token}&hub.challenge=${challenge}`;

      const res = await fetch(url);
      const text = await res.text();

      setWebhookVerifyResult({
        ok: res.ok,
        status: res.status,
        passed: text === challenge,
        challengeReturned: text,
      });
    } catch (err: any) {
      setWebhookVerifyResult({ ok: false, error: err.message });
    } finally {
      setVerifyingWebhook(false);
    }
  };

  const handleSimulateWebhook = async (type: 'INCOMING_MESSAGE' | 'STATUS_UPDATE', status = 'delivered') => {
    setSimulating(true);
    setSimResult(null);

    try {
      const res = await fetch('/api/test-sandbox/simulate-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          recipientPhone: simPhone,
          messageText: simText,
          status,
        }),
      });

      const data = await res.json();
      setSimResult({ ok: res.ok, data });
    } catch (err: any) {
      setSimResult({ ok: false, error: err.message });
    } finally {
      setSimulating(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Sandbox de Pruebas & Verificación Webhook" />

      <main className="p-8 max-w-6xl mx-auto space-y-8">
        {/* Safety Header Banner */}
        <div className="glass-panel p-5 border-l-4 border-l-amber-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Entorno Sandbox Isolado de Pruebas</h3>
              <p className="text-xs text-slate-400">
                Los envíos de prueba están restringidos a números de test autorizados. No se envían mensajes a leads reales de producción.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
            WHATSAPP_SEND_ENABLED = false
          </span>
        </div>

        {/* 1. Test Send Section (Test Numbers Only) */}
        <div className="glass-panel p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-400" /> Probador de Envío (Restringido a Números de Test)
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">WHATSAPP_TEST_PHONE_NUMBERS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-400 font-semibold">Teléfono de Prueba (E.164)</label>
              <input
                type="text"
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400 font-semibold">Mensaje de Prueba</label>
              <textarea
                rows={2}
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:border-emerald-500 focus:outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-[11px] text-slate-500">
              En Modo Simulación, se generará un registro con estado <code className="text-amber-300 font-mono">DRY_RUN</code> y metaMessageId null.
            </p>
            <button
              onClick={handleTestSend}
              disabled={sending}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              {sending ? 'Ejecutando...' : 'Enviar Prueba Sandbox'}
            </button>
          </div>

          {sendResult && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className={`font-bold ${sendResult.ok ? 'text-emerald-400' : 'text-red-400'}`}>
                  {sendResult.ok ? 'EXITOSO' : 'FALLIDO'} (HTTP {sendResult.status || 500})
                </span>
              </div>
              <pre className="text-[11px] text-slate-300 whitespace-pre-wrap overflow-x-auto">
                {JSON.stringify(sendResult.data || sendResult.error, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* 2. Webhook GET Verification Challenge Tester */}
        <div className="glass-panel p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" /> Verificación GET del Webhook Meta
            </h3>
            <button
              onClick={handleVerifyWebhook}
              disabled={verifyingWebhook}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${verifyingWebhook ? 'animate-spin' : ''}`} />
              Probar Desafío Webhook GET
            </button>
          </div>

          {webhookVerifyResult && (
            <div className={`p-4 rounded-xl border text-xs font-mono space-y-1 ${
              webhookVerifyResult.passed ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'
            }`}>
              <div>Resultado: {webhookVerifyResult.passed ? 'PASÓ VERIFICACIÓN META 200 OK' : 'FALLÓ VERIFICACIÓN'}</div>
              <div>Desafío retornado: {webhookVerifyResult.challengeReturned}</div>
            </div>
          )}
        </div>

        {/* 3. Webhook Simulation Engine */}
        <div className="glass-panel p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" /> Simulador de Webhooks Entrantes & Eventos Meta
            </h3>
            <span className="text-xs text-slate-400">Prueba Inbound, Opt-Out y Estados de Entrega</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-400 font-semibold">Teléfono Prospecto Simulado</label>
              <input
                type="text"
                value={simPhone}
                onChange={(e) => setSimPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 font-mono focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400 font-semibold">Texto de Mensaje Entrante Simulado</label>
              <input
                type="text"
                value={simText}
                onChange={(e) => setSimText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => handleSimulateWebhook('INCOMING_MESSAGE')}
              disabled={simulating}
              className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-slate-950 font-bold text-xs transition"
            >
              Simular Mensaje Entrante
            </button>
            <button
              onClick={() => handleSimulateWebhook('STATUS_UPDATE', 'delivered')}
              disabled={simulating}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              Simular Estado DELIVERED
            </button>
            <button
              onClick={() => handleSimulateWebhook('STATUS_UPDATE', 'read')}
              disabled={simulating}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              Simular Estado READ
            </button>
          </div>

          {simResult && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
              <div className="text-purple-400 font-bold">Simulación Procesada por Endpoint Webhook</div>
              <pre className="text-[11px] text-slate-300 whitespace-pre-wrap overflow-x-auto">
                {JSON.stringify(simResult.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
