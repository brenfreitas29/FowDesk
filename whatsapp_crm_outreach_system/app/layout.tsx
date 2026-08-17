import './globals.css';
import Sidebar from '@/components/Sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WhatsApp CRM Outreach | Platform',
  description: 'Consent-first outreach CRM powered by official Meta WhatsApp Cloud API',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className="flex min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {children}
        </div>
      </body>
    </html>
  );
}
