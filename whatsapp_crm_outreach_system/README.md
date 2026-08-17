# AutoArchitect - Enterprise Workflow Automation Platform

AutoArchitect is an enterprise-grade web platform designed to model, simulate, and implement intelligent business process automations across 10 industry sectors.

## 🚀 Features

- **Public Marketing Site**: Full corporate presentation with Hero, Solutions, Industries, How It Works, Integrations, Pricing, About Us, Contact, and Auth Modals.
- **Authenticated Customer Portal**:
  - **Workflows Canvas**: Interactive execution nodes and engineering specs.
  - **Real-Time Event Simulator**: Live terminal logs, latency counters, and step-by-step event triggers.
  - **Custom Prompt & Blueprint Generator**: Exports production-ready n8n/Make JSON blueprints.
  - **ROI & Impact Calculator**: Real-time financial savings, hours saved, and speed multiplier calculations.
  - **Commercial Proposal Generator**: 11-section dynamic contract document generator with Print/PDF export.
  - **Subscription & Billing**: Plan management, invoice history, and Stripe integration support.
- **Multilingual Support (i18n)**: Instant switching between **English (EN)** and **Spanish (ES)**.
- **Responsive Design System**: Seamless experience across 360px, 390px, 768px, 1024px, and Desktop viewports.

## 📁 Project Structure

```
sharp-pasteur/
├── index.html               # Main HTML structure (Public Site & Customer Portal)
├── styles.css               # Corporate CSS design system & responsive rules
├── app.js                   # Application state, i18n engine, and interactive tools
├── assets/                  # High-quality visual assets
│   ├── automation_hero.jpg
│   └── client_testimonial.jpg
├── README.md                # Project overview and setup instructions
└── stripe_setup_guide.md    # Stripe API key configuration guide
```

## 🛠️ Local Running Instructions

1. Open a terminal in the project directory.
2. Start a local HTTP server:
   ```bash
   python -m http.server 8080
   ```
3. Open your browser and navigate to:
   `http://localhost:8080`

## 💳 Stripe Production Integration

To connect real Stripe credit card payments in production, set the following environment variables on your server:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

For server-side integration details, refer to `stripe_setup_guide.md`.
