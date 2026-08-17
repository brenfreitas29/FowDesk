'use client';

import { ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function Header({ title }: { title: string }) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    window.location.reload();
  };

  return (
    <header className="h-16 bg-slate-900/60 border-b border-slate-800 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      <div>
        <h1 className="text-xl font-bold text-slate-100 tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Safety Indicator Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>WHATSAPP_SEND_ENABLED = false (DRY RUN)</span>
        </div>

        {/* API Version Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Meta API v20.0</span>
        </div>

        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          title="Actualizar datos"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </header>
  );
}
