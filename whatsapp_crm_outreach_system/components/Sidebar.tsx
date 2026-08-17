'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Upload,
  Send,
  MessageSquare,
  Megaphone,
  FileCode2,
  ShieldCheck,
  Settings,
  ShieldAlert,
  TestTube,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Importar Leads', href: '/import', icon: Upload },
  { name: 'Gestión de Leads', href: '/leads', icon: Users },
  { name: 'Cola de Revisión', href: '/queue', icon: Send },
  { name: 'Inbox & Chats', href: '/inbox', icon: MessageSquare },
  { name: 'Campañas', href: '/campaigns', icon: Megaphone },
  { name: 'Plantillas Meta', href: '/templates', icon: FileCode2 },
  { name: 'Sandbox & Webhooks', href: '/test-sandbox', icon: TestTube },
  { name: 'Auditoría & Logs', href: '/audit', icon: ShieldCheck },
  { name: 'Configuración', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900/90 border-r border-slate-800 flex flex-col justify-between h-screen sticky top-0 z-30">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
            <MessageSquare className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h1 className="font-bold text-base text-slate-100 tracking-tight">WhatsApp CRM</h1>
            <p className="text-xs text-slate-400 font-medium">Meta Business Cloud API</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Safety Mode Banner */}
      <div className="p-4 m-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-1.5">
        <div className="flex items-center gap-2 font-semibold text-xs text-amber-400">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>DRY RUN ACTIVE</span>
        </div>
        <p className="text-[11px] text-amber-200/80 leading-relaxed">
          Modo simulación activo. Ningún mensaje real será enviado a Meta API.
        </p>
      </div>
    </aside>
  );
}
