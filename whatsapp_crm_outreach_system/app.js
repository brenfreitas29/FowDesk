/* ==========================================================================
   AutoArchitect - Main Application Logic & i18n Engine
   ========================================================================== */

// Translation Dictionary (English & Spanish)
const TRANSLATIONS = {
  en: {
    nav_solutions: "Solutions",
    nav_industries: "Industries",
    nav_how_it_works: "How It Works",
    nav_integrations: "Integrations",
    nav_pricing: "Pricing",
    nav_about: "About Us",
    nav_contact: "Contact",
    btn_login: "Sign In",
    btn_signup: "Get Started",
    btn_launch_app: "Launch Platform",
    btn_back_public: "Public Website",
    btn_public_website: "Public Website",

    hero_badge: "Workflow Automation Engine",
    hero_title: "Build smarter workflows for your business",
    hero_subtitle: "Design, simulate, and implement business automations from a single enterprise platform.",
    btn_get_started: "Get Started Free",
    btn_explore_demo: "Explore Live Platform",
    trust_note_security: "✓ Security-oriented architecture",
    trust_note_privacy: "✓ Data protection best practices",
    trust_note_custom: "✓ Customized per project requirements",
    window_title: "AutoArchitect Studio - Enterprise Workflow Editor",

    sec_solutions_title: "Designed for modern operational teams",
    sec_solutions_sub: "Eliminate repetitive tasks and connect your entire software ecosystem seamlessly.",
    sol_1_title: "Visual Workflow Designer",
    sol_1_desc: "Build complex multi-step processes with interactive node orchestration and clean JSON export support.",
    sol_2_title: "Real-Time Event Simulator",
    sol_2_desc: "Test execution flows, payload transforms, and API calls with live execution logs before going live.",
    sol_3_title: "ROI & Impact Analysis",
    sol_3_desc: "Quantify labor hour savings, operational efficiency gains, and financial returns per department.",

    sec_industries_title: "Pre-built automation models for key sectors",
    sec_industries_sub: "Explore industry-specific workflows engineered for scale.",

    hiw_title: "How AutoArchitect Works",
    hiw_sub: "Three simple steps to automate your business operations.",
    hiw_step_1_title: "Model & Connect",
    hiw_step_1_desc: "Select your industry blueprint or model custom nodes for your ERP, CRM, and APIs.",
    hiw_step_2_title: "Simulate & Test",
    hiw_step_2_desc: "Run real-time payload simulations to verify execution logic and error handling.",
    hiw_step_3_title: "Deploy & Monitor",
    hiw_step_3_desc: "Export production-ready n8n/Make blueprints and monitor performance from your dashboard.",

    int_title: "Integrate with your favorite tools",
    int_sub: "Connect seamless webhooks and APIs across your software stack.",

    sec_pricing_title: "Transparent plans for teams of any size",
    sec_pricing_sub: "Choose the right tier for your operational volume. Upgrade or cancel anytime.",
    plan_monthly: "Monthly Billing",
    plan_annual: "Annual Billing",
    discount_20: "Save 20%",

    plan_free_title: "Free",
    plan_free_desc: "For individuals exploring workflow modeling.",
    period_forever: "/ forever",
    bullet_free_1: "✓ 1 Active Workflow",
    bullet_free_2: "✓ 100 Simulations / month",
    bullet_free_3: "✓ Standard Community Support",
    btn_start_free: "Get Started Free",

    plan_starter_title: "Starter",
    plan_starter_desc: "For growing small businesses.",
    period_month: "/ month",
    bullet_starter_1: "✓ 5 Active Workflows",
    bullet_starter_2: "✓ 5,000 Executions / month",
    bullet_starter_3: "✓ Email Support (24h SLA)",
    btn_choose_starter: "Select Starter",

    ribbon_popular: "Most Popular",
    plan_pro_title: "Professional",
    plan_pro_desc: "For operational teams requiring automated orchestration.",
    bullet_pro_1: "✓ 25 Active Workflows",
    bullet_pro_2: "✓ 50,000 Executions / month",
    bullet_pro_3: "✓ Priority Support & Real-time Logs",
    btn_choose_pro: "Select Professional",

    plan_business_title: "Business",
    plan_business_desc: "For high-volume operations and complex integrations.",
    bullet_biz_1: "✓ Unlimited Workflows",
    bullet_biz_2: "✓ Dedicated API Gateways",
    bullet_biz_3: "✓ SLA & Dedicated Account Lead",
    btn_choose_biz: "Contact Sales",

    about_title: "About AutoArchitect",
    about_sub: "We empower organizations to design, simulate, and operate efficient automated workflows.",
    about_p1: "AutoArchitect was founded to solve operational friction in modern enterprises. By providing intuitive workflow modeling, real-time simulation, and production-ready blueprints, we help teams automate repetitive tasks securely.",

    contact_title: "Get in Touch",
    contact_sub: "Have questions or need a custom enterprise solution? Our team is ready to help.",
    lbl_contact_name: "Your Name",
    lbl_contact_email: "Work Email",
    lbl_contact_msg: "Message",
    btn_send_msg: "Send Message",

    footer_tagline: "Build, simulate and execute smarter business processes from one platform.",
    footer_platform: "Platform",
    footer_company: "Company",
    footer_about: "About Us",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",

    modal_login_title: "Sign In to AutoArchitect",
    lbl_email: "Work Email",
    lbl_password: "Password",

    portal_sectors_title: "Sectors & Models",
    prompt_tab_1: "Prompt 1: Operational Flow",
    prompt_tab_2: "Prompt 2: Benefits & CTA",
    btn_copy_prompt: "Copy Prompt",
    cta_label: "Call to Action:",

    tab_workflows: "Workflows",
    tab_simulator: "Simulations",
    tab_generator: "Prompt Generator",
    tab_roi: "ROI Calculator",
    tab_proposals: "Commercial Proposal",
    tab_billing: "Billing & Account",

    wf_title: "Workflow Canvas (Execution Nodes)",
    wf_sub: "Click any node to inspect data payloads and rules.",
    tech_title: "Engineering Specifications",
    tech_stack_label: "Integrations & Tech Stack",
    tech_goals_label: "Key Operational Goals",
    expanded_prompt_label: "Expanded Prompt",
    btn_copy_expanded: "Copy Expanded Prompt",

    sim_title: "Real-Time Event Simulator",
    btn_trigger_event: "Run Test Event",
    btn_clear_console: "Clear Console",
    sim_status: "Status",
    sim_time: "Latency",
    sim_nodes: "Processed Nodes",
    terminal_title: "Execution Logs - Automation Engine",

    gen_title: "Custom Automation Prompt & Blueprint Generator",
    gen_sub: "Configure your company scale and tech stack to output customized n8n/Make blueprints.",
    gen_scale_label: "Company Scale",
    opt_startup: "Startup / Small (Up to 500 ops/mo)",
    opt_medium: "Mid-sized (500 - 10,000 ops/mo)",
    opt_enterprise: "Enterprise (10,000+ ops/mo)",
    gen_stack_label: "Primary Platform / ERP",
    gen_channel_label: "Notification Channel",
    gen_ai_label: "AI Model Engine",
    opt_rules: "Standard Rules (No AI)",
    opt_fast_ai: "Fast AI Parser (Gemini Flash)",
    opt_adv_ai: "Advanced AI Reasoning (Gemini Pro)",
    gen_output_title: "Generated Prompt",
    btn_download_blueprint: "Download JSON Blueprint",

    roi_title: "ROI & Impact Calculator",
    roi_vol_label: "Monthly Operation Volume",
    roi_time_label: "Manual Time per Task (minutes)",
    roi_cost_label: "Average Hourly Labor Cost ($)",
    roi_summary_title: "Estimated Monthly Savings",
    roi_direct_savings: "Financial Savings",
    roi_hours_saved: "Hours Saved",
    roi_speedup: "Speed Multiplier",

    prop_title: "Commercial Proposal Generator (11 Sections)",
    btn_copy_text: "Copy Text",
    btn_print_pdf: "Print / Save PDF",
    prop_client_label: "Client Company Name",
    prop_contact_label: "Decision Maker",
    prop_provider_label: "Your Company Name",
    prop_setup_label: "Setup Fee ($)",
    prop_monthly_label: "Monthly Fee ($)",
    prop_days_label: "Delivery Timeline (Days)",

    bill_title: "Subscription & Billing Management",
    bill_active_plan: "Current Plan: Professional",
    bill_renews_on: "Next Billing Date: September 1, 2026",
    bill_payment_method: "Payment Method: Visa ending in 4242",
    btn_change_plan: "Change Plan",
    btn_cancel_sub: "Cancel Subscription",
    btn_stripe_portal: "Open Billing Portal",
    admin_stripe_notice: "Payment integration pending configuration.",
    bill_history_title: "Payment History & Invoices",
    th_date: "Date",
    th_description: "Description",
    th_amount: "Amount",
    th_status: "Status",
    th_invoice: "Invoice",
    tag_paid: "Paid",
    link_download_pdf: "Download PDF",

    modal_checkout_title: "Complete Subscription",
    lbl_selected_plan: "Selected Plan:",
    lbl_cardholder: "Cardholder Name",
    lbl_cardnum: "Card Number",
    lbl_exp: "Expiry (MM/YY)",
    lbl_cvc: "CVC",
    btn_confirm_pay: "Confirm & Subscribe",
    stripe_notice: "256-bit SSL encrypted connection.",

    tab_admin: "Owner Console",
    admin_panel_title: "👑 Site Owner & Administration Console",
    admin_panel_sub: "Full platform privileges, API key configuration, and subscription management.",
    role_owner_label: "Role: Platform Owner",
    owner_profile_title: "Owner Account Details",
    admin_stripe_config_title: "Stripe Production API Keys",
    btn_save_keys: "Save Production Keys",
    admin_metrics_title: "Platform Overview Metrics",
    admin_users_title: "Registered Platform Accounts",
    lbl_total_users: "Registered Users",
    lbl_active_wf: "Active Workflows",
    lbl_mrr: "Monthly Recurring Revenue"
  },
  es: {
    nav_solutions: "Soluciones",
    nav_industries: "Industrias",
    nav_how_it_works: "Cómo Funciona",
    nav_integrations: "Integraciones",
    nav_pricing: "Precios",
    nav_about: "Nosotros",
    nav_contact: "Contacto",
    btn_login: "Iniciar Sesión",
    btn_signup: "Comenzar",
    btn_launch_app: "Abrir Plataforma",
    btn_back_public: "Sitio Público",
    btn_public_website: "Sitio Público",

    hero_badge: "Motor de Automatización de Flujos",
    hero_title: "Automatiza los procesos de tu empresa",
    hero_subtitle: "Diseña, simula e implementa flujos de trabajo desde una sola plataforma corporativa.",
    btn_get_started: "Comenzar Gratis",
    btn_explore_demo: "Explorar Plataforma en Vivo",
    trust_note_security: "✓ Arquitectura orientada a la seguridad",
    trust_note_privacy: "✓ Buenas prácticas de protección de datos",
    trust_note_custom: "✓ Personalizado según el proyecto",
    window_title: "AutoArchitect Studio - Editor de Automatización",

    sec_solutions_title: "Diseñado para equipos de operaciones modernos",
    sec_solutions_sub: "Elimina tareas repetitivas y conecta todo tu ecosistema de software sin fricciones.",
    sol_1_title: "Diseñador Visual de Flujos",
    sol_1_desc: "Construye procesos complejos multietapa con orquestación interactiva de nodos y exportación JSON.",
    sol_2_title: "Simulador de Eventos en Tiempo Real",
    sol_2_desc: "Prueba flujos de ejecución, transformación de datos y llamadas API con logs en vivo antes de publicar.",
    sol_3_title: "Análisis de ROI e Impacto",
    sol_3_desc: "Cuantifica el ahorro en horas de trabajo, aumentos de eficiencia y retornos financieros por departamento.",

    sec_industries_title: "Modelos de automatización listos por sector",
    sec_industries_sub: "Explora flujos de trabajo diseñados para escalar en cada industria.",

    hiw_title: "Cómo Funciona AutoArchitect",
    hiw_sub: "Tres simples pasos para automatizar las operaciones de tu empresa.",
    hiw_step_1_title: "Modelar y Conectar",
    hiw_step_1_desc: "Selecciona el modelo de tu industria o diseña nodos personalizados para tu ERP y APIs.",
    hiw_step_2_title: "Simular y Probar",
    hiw_step_2_desc: "Ejecuta simulaciones en tiempo real para verificar reglas y manejo de errores.",
    hiw_step_3_title: "Desplegar y Monitorear",
    hiw_step_3_desc: "Exporta planos listos para producción en n8n/Make y monitorea métricas desde tu panel.",

    int_title: "Integra con tus herramientas favoritas",
    int_sub: "Conecta webhooks y APIs sin fricción en todo tu software.",

    sec_pricing_title: "Planes transparentes para equipos de cualquier tamaño",
    sec_pricing_sub: "Elige el plan ideal según tu volumen operacional. Actualiza o cancela en cualquier momento.",
    plan_monthly: "Facturación Mensual",
    plan_annual: "Facturación Anual",
    discount_20: "Ahorra 20%",

    plan_free_title: "Gratis",
    plan_free_desc: "Para explorar el modelado de flujos de trabajo.",
    period_forever: "/ para siempre",
    bullet_free_1: "✓ 1 Flujo Activo",
    bullet_free_2: "✓ 100 Simulaciones / mes",
    bullet_free_3: "✓ Soporte Comunitario",
    btn_start_free: "Comenzar Gratis",

    plan_starter_title: "Starter",
    plan_starter_desc: "Para pequenas empresas en crecimiento.",
    period_month: "/ mes",
    bullet_starter_1: "✓ 5 Flujos Activos",
    bullet_starter_2: "✓ 5,000 Ejecuciones / mes",
    bullet_starter_3: "✓ Soporte por Email (SLA 24h)",
    btn_choose_starter: "Seleccionar Starter",

    ribbon_popular: "Más Popular",
    plan_pro_title: "Profesional",
    plan_pro_desc: "Para equipos que requieren orquestación automatizada.",
    bullet_pro_1: "✓ 25 Flujos Activos",
    bullet_pro_2: "✓ 50,000 Ejecuciones / mes",
    bullet_pro_3: "✓ Soporte Prioritario y Logs en Vivo",
    btn_choose_pro: "Seleccionar Profesional",

    plan_business_title: "Business",
    plan_business_desc: "Para operaciones de alto volumen e integraciones complejas.",
    bullet_biz_1: "✓ Flujos Ilimitados",
    bullet_biz_2: "✓ Gateways API Dedicados",
    bullet_biz_3: "✓ SLA y Gerente de Cuenta Dedicado",
    btn_choose_biz: "Contactar Ventas",

    about_title: "Acerca de AutoArchitect",
    about_sub: "Impulsamos a las organizaciones a diseñar, simular y operar flujos automatizados eficientes.",
    about_p1: "AutoArchitect fue fundado para eliminar la fricción operacional en empresas modernas. Proporcionamos modelado intuitivo, simulación en vivo y planos de producción para automatizar tareas repetitivas con máxima seguridad.",

    contact_title: "Ponte en Contacto",
    contact_sub: "¿Tienes preguntas o necesitas una solución corporativa a medida? Nuestro equipo está listo para ayudarte.",
    lbl_contact_name: "Tu Nombre",
    lbl_contact_email: "Correo Corporativo",
    lbl_contact_msg: "Mensaje",
    btn_send_msg: "Enviar Mensaje",

    footer_tagline: "Diseña, simula e implementa flujos de trabajo desde una sola plataforma.",
    footer_platform: "Plataforma",
    footer_company: "Compañía",
    footer_about: "Nosotros",
    footer_privacy: "Política de Privacidad",
    footer_terms: "Términos de Servicio",

    modal_login_title: "Iniciar Sesión en AutoArchitect",
    lbl_email: "Correo Corporativo",
    lbl_password: "Contraseña",

    portal_sectors_title: "Sectores y Modelos",
    prompt_tab_1: "Prompt 1: Flujo Operativo",
    prompt_tab_2: "Prompt 2: Beneficios y CTA",
    btn_copy_prompt: "Copiar Prompt",
    cta_label: "Llamada a la Acción:",

    tab_workflows: "Flujos de Trabajo",
    tab_simulator: "Simulaciones",
    tab_generator: "Generador de Prompts",
    tab_roi: "Calculadora de ROI",
    tab_proposals: "Propuesta Comercial",
    tab_billing: "Facturación y Cuenta",

    wf_title: "Lienzo de Flujo de Trabajo (Nodos de Ejecución)",
    wf_sub: "Haz clic en cualquier nodo para inspeccionar reglas y datos.",
    tech_title: "Especificaciones Técnicas",
    tech_stack_label: "Integraciones y Herramientas",
    tech_goals_label: "Objetivos Operativos Clave",
    expanded_prompt_label: "Prompt Expandido",
    btn_copy_expanded: "Copiar Prompt Expandido",

    sim_title: "Simulador de Eventos en Tiempo Real",
    btn_trigger_event: "Ejecutar Evento de Prueba",
    btn_clear_console: "Limpiar Consola",
    sim_status: "Estado",
    sim_time: "Latencia",
    sim_nodes: "Nodos Procesados",
    terminal_title: "Logs de Ejecución - Motor de Automatización",

    gen_title: "Generador Personalizado de Prompts y JSON",
    gen_sub: "Configura la escala de tu empresa y pila tecnológica para exportar planos n8n/Make.",
    gen_scale_label: "Escala de la Empresa",
    opt_startup: "Startup / Pequeña (Hasta 500 ops/mes)",
    opt_medium: "Mediana Empresa (500 - 10,000 ops/mes)",
    opt_enterprise: "Enterprise (10,000+ ops/mes)",
    gen_stack_label: "Plataforma Principal / ERP",
    gen_channel_label: "Canal de Notificación",
    gen_ai_label: "Modelo de IA",
    opt_rules: "Reglas Estándar (Sin IA)",
    opt_fast_ai: "Procesador IA Rápido (Gemini Flash)",
    opt_adv_ai: "Razonamiento IA Avanzado (Gemini Pro)",
    gen_output_title: "Prompt Generado",
    btn_download_blueprint: "Descargar JSON Blueprint",

    roi_title: "Calculadora de ROI e Impacto",
    roi_vol_label: "Volumen Operacional Mensual",
    roi_time_label: "Tiempo Manual por Tarea (minutos)",
    roi_cost_label: "Costo Hora Hombre Promedio ($)",
    roi_summary_title: "Ahorro Mensual Estimado",
    roi_direct_savings: "Ahorro Financiero",
    roi_hours_saved: "Horas Ahorradas",
    roi_speedup: "Multiplicador de Velocidad",

    prop_title: "Generador de Propuestas Comerciales (11 Secciones)",
    btn_copy_text: "Copiar Texto",
    btn_print_pdf: "Imprimir / Guardar PDF",
    prop_client_label: "Nombre de la Empresa Cliente",
    prop_contact_label: "Persona de Contacto",
    prop_provider_label: "Tu Empresa de Automatización",
    prop_setup_label: "Costo de Setup ($)",
    prop_monthly_label: "Tarifa Mensual ($)",
    prop_days_label: "Plazo de Entrega (Días)",

    bill_title: "Gestión de Suscripción y Facturación",
    bill_active_plan: "Plan Actual: Profesional",
    bill_renews_on: "Próxima fecha de cobro: 1 de septiembre de 2026",
    bill_payment_method: "Método de pago: Visa terminada en 4242",
    btn_change_plan: "Cambiar Plan",
    btn_cancel_sub: "Cancelar Suscripción",
    btn_stripe_portal: "Abrir Portal de Facturación",
    admin_stripe_notice: "Integración de pago pendiente de configuración.",
    bill_history_title: "Historial de Pagos y Facturas",
    th_date: "Fecha",
    th_description: "Descripción",
    th_amount: "Monto",
    th_status: "Estado",
    th_invoice: "Factura",
    tag_paid: "Pagado",
    link_download_pdf: "Descargar PDF",

    modal_checkout_title: "Completar Suscripción",
    lbl_selected_plan: "Plan Seleccionado:",
    lbl_cardholder: "Nombre en la Tarjeta",
    lbl_cardnum: "Número de Tarjeta",
    lbl_exp: "Vencimiento (MM/AA)",
    lbl_cvc: "CVC",
    btn_confirm_pay: "Confirmar y Suscribirse",
    stripe_notice: "Conexión cifrada SSL de 256 bits.",

    tab_admin: "Consola Propietario",
    admin_panel_title: "👑 Consola de Administración y Propietario",
    admin_panel_sub: "Privilegios completos de la plataforma, configuración de API y gestión de suscripciones.",
    role_owner_label: "Rol: Propietario de la Plataforma",
    owner_profile_title: "Detalles de la Cuenta del Propietario",
    admin_stripe_config_title: "Claves de API de Stripe en Producción",
    btn_save_keys: "Guardar Claves de Producción",
    admin_metrics_title: "Métricas Generales de la Plataforma",
    admin_users_title: "Cuentas Registradas en la Plataforma",
    lbl_total_users: "Usuarios Registrados",
    lbl_active_wf: "Flujos Activos",
    lbl_mrr: "Ingreso Mensual Recurrente"
  }
};

// 10 Sector Models (Multilingual & Clean SVG Icons)
const SECTORS = [
  {
    id: "ecommerce",
    num: 1,
    name: { en: "E-commerce & Retail", es: "Comercio Electrónico y Retail" },
    iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`,
    prompt1: {
      en: "Describe how our automation service optimizes order processing, manages inventory, and automates marketing campaigns to boost store efficiency.",
      es: "Describe cómo nuestro servicio de automatización optimiza el procesamiento de pedidos, gestiona el inventario y automatiza campañas para aumentar la eficiencia."
    },
    prompt2: {
      en: "Explain the core benefits of e-commerce automation, such as reduced processing errors, faster shipping notifications, and conversion growth.",
      es: "Explica los beneficios de la automatización en e-commerce, como la reducción de errores, notificaciones rápidas y aumento de conversión."
    },
    cta: {
      en: "Contact our team to automate your online store operations today!",
      es: "¡Contáctanos para automatizar las operaciones de tu tienda hoy mismo!"
    },
    techStack: ["Shopify API", "n8n Engine", "ERP Connector", "ActiveCampaign", "WhatsApp API"],
    benefits: {
      en: ["Instant order validation and inventory adjustment.", "Automated shipping updates via WhatsApp and Email.", "Retargeting flows for abandoned checkout recovery."],
      es: ["Validación instantánea de pedidos y ajuste de inventario.", "Actualizaciones automáticas de envío por WhatsApp y Email.", "Flujos de retención para carritos abandonados."]
    },
    expandedPrompt: "Enterprise E-commerce Workflow Architecture Prompt...",
    nodes: [
      { step: 1, title: "Webhook: Order Paid", sub: "Shopify / WooCommerce API" },
      { step: 2, title: "Invoice & Stock Sync", sub: "ERP Integration" },
      { step: 3, title: "Customer Notification", sub: "WhatsApp / Email Gateway" },
      { step: 4, title: "CRM Tagging", sub: "ActiveCampaign / Hubspot" }
    ],
    logs: [
      "[TRIGGER] Webhook received: Order #4812 from Customer A ($120.00).",
      "[ERP] Syncing stock reservation... Remaining SKU balance: 42.",
      "[API] Generating automated invoice PDF... Status: APPROVED.",
      "[NOTIFICATION] Dispatching WhatsApp confirmation message.",
      "[CRM] Tag 'VIP_Customer' updated. Workflow completed in 420ms!"
    ]
  },
  {
    id: "finance",
    num: 2,
    name: { en: "Financial Services & Fintech", es: "Servicios Financieros y Fintech" },
    iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
    prompt1: {
      en: "Detail our automation solution for financial services, focusing on real-time accounting reports and automated bank reconciliation.",
      es: "Detalla nuestra solución de automatización financiera, enfocada en reportes contables en tiempo real y conciliación bancaria."
    },
    prompt2: {
      en: "Discuss the key financial benefits of automation, including human error elimination and faster executive decision-making.",
      es: "Discute los beneficios financieros clave de la automatización, incluyendo la eliminación de errores humanos y decisiones rápidas."
    },
    cta: {
      en: "Schedule a financial demo to streamline your accounting pipeline!",
      es: "¡Agenda una demostración para optimizar tu gestión contable!"
    },
    techStack: ["Open Finance APIs", "Python Data Engine", "PostgreSQL", "Gemini AI", "SendGrid"],
    benefits: {
      en: ["100% automated bank reconciliation from OFX/API feeds.", "Daily financial statement generation delivered to executive inbox.", "Real-time anomaly detection for unassigned ledger transactions."],
      es: ["Conciliación bancaria 100% automatizada desde extractos/APIs.", "Generación diaria de estados financieros en la bandeja ejecutiva.", "Detección de anomalías en tiempo real para transacciones sin asignar."]
    },
    expandedPrompt: "Fintech Automated Accounting & Reporting Pipeline Prompt...",
    nodes: [
      { step: 1, title: "Cron: Bank Feed Ingestion", sub: "Open Finance Open API" },
      { step: 2, title: "AI Transaction Classifier", sub: "Gemini Parser Engine" },
      { step: 3, title: "Statement Compilation", sub: "PDF Report Generator" },
      { step: 4, title: "Executive Dispatch", sub: "Secure Email / Slack" }
    ],
    logs: [
      "[CRON] Initiating daily Open Finance statement sync.",
      "[PLUGGY] Imported 142 bank transactions across 3 accounts.",
      "[AI] Categorizing unlabelled records... 1 anomaly flagged.",
      "[REPORT] Compiling PDF financial statement...",
      "[DISPATCH] Statement delivered to executive board in 610ms!"
    ]
  },
  {
    id: "health",
    num: 3,
    name: { en: "Healthcare & Clinics", es: "Salud y Clínicas Médicas" },
    iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
    prompt1: {
      en: "Describe how our clinical automation system manages appointment scheduling, automatic patient reminders, and electronic record updates.",
      es: "Describe cómo nuestro sistema para clínicas gestiona agendamientos, recordatorios automáticos y actualización de expediente médico."
    },
    prompt2: {
      en: "Explain the benefits of healthcare automation, such as reduced patient no-show rates and improved operational clinic throughput.",
      es: "Explica los beneficios de la automatización médica, como la reducción de inasistencias y la mejora del flujo de la clínica."
    },
    cta: {
      en: "Book a consultation to optimize your clinic's patient experience!",
      es: "¡Reserva una consulta para optimizar la experiencia de tus pacientes!"
    },
    techStack: ["Google Calendar API", "WhatsApp AI Assistant", "EHR/PEP Connector", "Twilio SMS"],
    benefits: {
      en: ["Drastic reduction in appointment no-show rates (down under 5%).", "24/7 automated patient scheduling without receptionist overhead.", "Automatic pre-triage questionnaire synced directly to patient chart."],
      es: ["Reducción drástica en inasistencias a citas (por debajo del 5%).", "Agendamiento automatizado 24/7 sin recargar recepción.", "Cuestionario de pre-triaje sincronizado directamente a la ficha médica."]
    },
    expandedPrompt: "Clinical Scheduling & EHR Integration Architecture Prompt...",
    nodes: [
      { step: 1, title: "Patient WhatsApp Booking", sub: "AI Conversational Bot" },
      { step: 2, title: "T-24h Reminder Dispatch", sub: "Interactive Messaging" },
      { step: 3, title: "EHR Sync & Pre-triage", sub: "HL7/FHIR Health API" },
      { step: 4, title: "Directions & Prep Push", sub: "SMS / WhatsApp Link" }
    ],
    logs: [
      "[TRIGGER] Appointment confirmation sent for T-24h window.",
      "[WHATSAPP] Patient clicked 'Confirm Presence'.",
      "[EHR] Pre-triage questionnaire answers saved to medical chart.",
      "[SUCCESS] Patient status set to Confirmed."
    ]
  },
  {
    id: "hr",
    num: 4,
    name: { en: "Human Resources & Hiring", es: "Recursos Humanos y Contratación" },
    iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    prompt1: {
      en: "Detail our HR automation service focusing on resume screening optimization, candidate ranking, and streamlined payroll prep.",
      es: "Detalla nuestro servicio para RRHH, enfocado en optimizar el filtrado de currículums, clasificación de candidatos y nómina."
    },
    prompt2: {
      en: "Discuss HR automation benefits including reduced time-to-hire and automated employee onboarding workflows.",
      es: "Discute los beneficios en RRHH, incluyendo la reducción del tiempo de contratación y flujos automáticos de incorporación."
    },
    cta: {
      en: "Discover how automation can transform your HR recruitment pipeline!",
      es: "¡Descubre cómo la automatización puede transformar tu reclutamiento!"
    },
    techStack: ["ATS Connector API", "Gemini CV Parser", "ERP Payroll System", "Slack Webhooks"],
    benefits: {
      en: ["Instant resume parsing and technical scoring across applicant pools.", "Reduced time-to-hire from 30 days down to 5 days.", "Automated document collection and contract generation for new hires."],
      es: ["Procesamiento instantáneo de CVs y puntuación técnica de candidatos.", "Reducción del tiempo de contratación de 30 días a 5 días.", "Recopilación automática de documentos y contratos para contrataciones."]
    },
    expandedPrompt: "HR Recruitment & Payroll Processing Pipeline Prompt...",
    nodes: [
      { step: 1, title: "Resume PDF Ingestion", sub: "Applicant Tracking API" },
      { step: 2, title: "AI Resume Parsing", sub: "Gemini Match Engine" },
      { step: 3, title: "Interview Scheduling", sub: "Calendar API Sync" },
      { step: 4, title: "Payroll & Onboarding Prep", sub: "ERP HR Integration" }
    ],
    logs: [
      "[ATS] Received applicant PDF resume: Jane_Doe_CV.pdf.",
      "[AI] Extracting technical skills... Candidate Score: 94/100.",
      "[SLACK] Alert sent to hiring lead: Top Candidate Found.",
      "[CALENDAR] Interview invitation dispatched."
    ]
  },
  {
    id: "marketing",
    num: 5,
    name: { en: "Digital Marketing & Media", es: "Marketing Digital y Medios" },
    iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
    prompt1: {
      en: "Describe how our digital marketing automation manages cross-platform posting, lead nurturing email series, and ad performance tracking.",
      es: "Describe cómo nuestra automatización de marketing gestiona publicaciones multiplataforma, secuencias de emails y rendimiento de anuncios."
    },
    prompt2: {
      en: "Explain marketing automation benefits including precise audience segmentation and automated ROI dashboard reporting.",
      es: "Explica los beneficios de automatización en marketing, incluyendo segmentación de audiencia y reportes de ROI automáticos."
    },
    cta: {
      en: "Request a free consultation to scale your digital marketing campaigns!",
      es: "¡Solicita una consulta gratuita para escalar tus campañas de marketing!"
    },
    techStack: ["Meta Graph API", "LinkedIn API", "Mailchimp / Brevo", "Supabase DB", "Analytics API"],
    benefits: {
      en: ["Omnichannel social media publishing from a central scheduler.", "Behavioral email triggers based on user website interactions.", "Consolidated ad spend and CAC/ROAS tracking in unified view."],
      es: ["Publicación de contenido omnicanal desde un programador central.", "Envíos de email basados en el comportamiento del usuario en el sitio.", "Consolidación de gastos publicitarios y métricas ROAS en un panel."]
    },
    expandedPrompt: "Omnichannel Digital Marketing Automation Prompt...",
    nodes: [
      { step: 1, title: "Social Post Scheduler", sub: "Meta & LinkedIn API" },
      { step: 2, title: "Behavioral Email Sequence", sub: "Email Provider API" },
      { step: 3, title: "Ad Performance ETL", sub: "Database Aggregator" },
      { step: 4, title: "ROAS Alert & Dashboard", sub: "Analytics Engine" }
    ],
    logs: [
      "[SCHEDULER] Dispatching scheduled post to LinkedIn & Instagram.",
      "[EMAIL] Triggering welcome series to 5,400 active subscribers.",
      "[ADS] Ingesting ROAS metrics... Current return: 4.2x.",
      "[DASHBOARD] Reporting metrics updated successfully."
    ]
  }
];

// Application State
let currentLang = localStorage.getItem("autoarch_lang") || "en";
let activeSector = SECTORS[0];
let activePromptMode = 1;
let currentPricingCycle = "monthly";
let selectedPricingPlan = "pro";

// DOM Initialization
document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  initNavigation();
  initSectorSelector();
  initPublicPricing();
  initPromptGenerator();
  initSimulator();
  initRoiCalculator();
  initProposalGenerator();
  initStripeCheckout();
  initContactForm();
  initAuthModals();
  initAdminConsole();
});

// Language Initialization Engine
function initLanguage() {
  setLanguage(currentLang);

  document.querySelectorAll(".lang-toggle-btn, .lang-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const selected = e.target.getAttribute("data-lang");
      if (selected) {
        setLanguage(selected);
      }
    });
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("autoarch_lang", lang);

  document.querySelectorAll(".lang-toggle-btn, .lang-btn").forEach(btn => {
    if (btn.getAttribute("data-lang") === lang) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      el.textContent = TRANSLATIONS[lang][key];
    }
  });

  renderPublicIndustries();
  renderSectorDetails(activeSector);
}

// Navigation & View Switching
function initNavigation() {
  const btnLaunchApp = document.getElementById("btnHeaderLaunchApp");
  const btnHeroExploreApp = document.getElementById("btnHeroExploreApp");
  const btnBackToPublicSite = document.getElementById("btnBackToPublicSite");
  const logoHomeLink = document.getElementById("logoHomeLink");

  const publicView = document.getElementById("publicSiteView");
  const portalView = document.getElementById("appPortalView");
  const desktopPublicNav = document.getElementById("desktopPublicNav");

  const showPortal = () => {
    publicView.style.display = "none";
    portalView.style.display = "block";
    btnBackToPublicSite.style.display = "inline-flex";
    btnLaunchApp.style.display = "none";
    desktopPublicNav.style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showPublic = () => {
    publicView.style.display = "block";
    portalView.style.display = "none";
    btnBackToPublicSite.style.display = "none";
    btnLaunchApp.style.display = "inline-flex";
    desktopPublicNav.style.display = "flex";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  btnLaunchApp?.addEventListener("click", showPortal);
  btnHeroExploreApp?.addEventListener("click", showPortal);
  btnBackToPublicSite?.addEventListener("click", showPublic);
  logoHomeLink?.addEventListener("click", showPublic);

  // Mobile Drawer Toggle
  const btnOpenMobileDrawer = document.getElementById("btnOpenMobileDrawer");
  const btnCloseMobileDrawer = document.getElementById("btnCloseMobileDrawer");
  const mobileDrawerPanel = document.getElementById("mobileDrawerPanel");
  const mobileDrawerBackdrop = document.getElementById("mobileDrawerBackdrop");

  const openDrawer = () => {
    mobileDrawerPanel.classList.add("open");
    mobileDrawerBackdrop.classList.add("open");
  };

  const closeDrawer = () => {
    mobileDrawerPanel.classList.remove("open");
    mobileDrawerBackdrop.classList.remove("open");
  };

  btnOpenMobileDrawer?.addEventListener("click", openDrawer);
  btnCloseMobileDrawer?.addEventListener("click", closeDrawer);
  mobileDrawerBackdrop?.addEventListener("click", closeDrawer);

  document.querySelectorAll(".nav-public-link").forEach(link => {
    link.addEventListener("click", () => {
      closeDrawer();
      showPublic();
    });
  });

  document.getElementById("btnHeroGetStarted")?.addEventListener("click", showPortal);
}

// Public Contact Form
function initContactForm() {
  const form = document.getElementById("publicContactForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast(currentLang === "en" ? "Thank you! Your message has been sent." : "¡Gracias! Tu mensaje ha sido enviado.");
    form.reset();
  });
}

// Auth Modals (Sign In / Sign Up)
function initAuthModals() {
  const modal = document.getElementById("signInModal");
  const btnClose = document.getElementById("btnCloseSignInModal");
  const btnHeaderLogin = document.getElementById("btnHeaderLogin");
  const btnDrawerLogin = document.getElementById("btnDrawerLogin");

  const openModal = () => modal.style.display = "flex";
  const closeModal = () => modal.style.display = "none";

  btnHeaderLogin?.addEventListener("click", openModal);
  btnDrawerLogin?.addEventListener("click", openModal);
  btnClose?.addEventListener("click", closeModal);

  document.getElementById("signInForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    closeModal();
    document.getElementById("btnHeaderLaunchApp")?.click();
  });
}

// Render Public Industries Section with Clean Vector SVGs
function renderPublicIndustries() {
  const container = document.getElementById("publicIndustriesGrid");
  if (!container) return;

  container.innerHTML = SECTORS.map(sec => `
    <div class="industry-public-card">
      <div class="ind-svg-icon">${sec.iconSvg}</div>
      <div class="ind-card-content">
        <h4>${sec.name[currentLang]}</h4>
        <p>${sec.prompt1[currentLang]}</p>
      </div>
    </div>
  `).join("");
}

// Sector Selector in Customer Portal
function initSectorSelector() {
  const menuContainer = document.getElementById("sectorMenuList");
  if (!menuContainer) return;

  menuContainer.innerHTML = "";
  SECTORS.forEach((sec, idx) => {
    const btn = document.createElement("button");
    btn.className = `portal-sec-item ${idx === 0 ? "active" : ""}`;
    btn.innerHTML = `
      <span style="display:flex;align-items:center;">${sec.iconSvg}</span>
      <span>${sec.num}. ${sec.name[currentLang]}</span>
    `;

    btn.addEventListener("click", () => {
      document.querySelectorAll(".portal-sec-item").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeSector = sec;
      renderSectorDetails(sec);
    });

    menuContainer.appendChild(btn);
  });

  // Portal Tab Switcher
  const tabBtns = document.querySelectorAll(".portal-tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".portal-pane").forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const target = btn.getAttribute("data-tab");
      document.getElementById(target)?.classList.add("active");
    });
  });

  // Dual Prompt Toggle Buttons
  const btnP1 = document.getElementById("btnTogglePrompt1");
  const btnP2 = document.getElementById("btnTogglePrompt2");

  btnP1?.addEventListener("click", () => {
    btnP1.classList.add("active");
    btnP2.classList.remove("active");
    activePromptMode = 1;
    updatePromptText();
  });

  btnP2?.addEventListener("click", () => {
    btnP2.classList.add("active");
    btnP1.classList.remove("active");
    activePromptMode = 2;
    updatePromptText();
  });
}

function renderSectorDetails(sec) {
  const iconBox = document.getElementById("sectorIconSvgBox");
  if (iconBox) iconBox.innerHTML = sec.iconSvg;

  document.getElementById("sectorCategoryLabel").textContent = `Sector #${sec.num}`;
  document.getElementById("sectorTitleDisplay").textContent = sec.name[currentLang];

  updatePromptText();

  const benefitsList = document.getElementById("sectorBenefitsList");
  if (benefitsList) {
    benefitsList.innerHTML = sec.benefits[currentLang].map(b => `<li>✓ ${b}</li>`).join("");
  }

  const techContainer = document.getElementById("techStackTags");
  if (techContainer) {
    techContainer.innerHTML = sec.techStack.map(t => `<span class="count-badge">${t}</span>`).join(" ");
  }

  document.getElementById("expandedPromptBlock").textContent = sec.expandedPrompt;

  renderNodes(sec.nodes);
  renderProposalDocument();
}

function updatePromptText() {
  const tagLabel = document.getElementById("promptTagLabel");
  const textEl = document.getElementById("sectorPromptText");
  const ctaBox = document.getElementById("ctaBadge");
  const ctaText = document.getElementById("ctaTextDisplay");

  if (activePromptMode === 1) {
    tagLabel.textContent = "PROMPT 1 (OPERATIONAL)";
    textEl.textContent = `"${activeSector.prompt1[currentLang]}"`;
    ctaBox.style.display = "none";
  } else {
    tagLabel.textContent = "PROMPT 2 (BENEFITS & CTA)";
    textEl.textContent = `"${activeSector.prompt2[currentLang]}"`;
    ctaBox.style.display = "block";
    ctaText.textContent = `"${activeSector.cta[currentLang]}"`;
  }
}

function renderNodes(nodes) {
  const canvas = document.getElementById("workflowCanvas");
  if (!canvas) return;
  canvas.innerHTML = "";

  nodes.forEach((n, idx) => {
    const nodeEl = document.createElement("div");
    nodeEl.className = "wf-node";
    nodeEl.innerHTML = `
      <div class="wf-badge">${n.step}</div>
      <div>
        <div style="font-weight:700;font-size:0.88rem;">${n.title}</div>
        <div style="font-size:0.75rem;color:var(--color-slate-muted);">${n.sub}</div>
      </div>
    `;
    canvas.appendChild(nodeEl);

    if (idx < nodes.length - 1) {
      const arrow = document.createElement("div");
      arrow.className = "wf-arrow";
      arrow.textContent = "↓";
      canvas.appendChild(arrow);
    }
  });
}

// Public Pricing & Checkout Setup
function initPublicPricing() {
  const cycleSwitch = document.getElementById("billingCycleSwitch");
  const labelMonthly = document.getElementById("labelMonthly");
  const labelAnnual = document.getElementById("labelAnnual");

  cycleSwitch?.addEventListener("change", (e) => {
    if (e.target.checked) {
      currentPricingCycle = "annual";
      labelAnnual.classList.add("active");
      labelMonthly.classList.remove("active");
      updatePricingValues(0.8);
    } else {
      currentPricingCycle = "monthly";
      labelMonthly.classList.add("active");
      labelAnnual.classList.remove("active");
      updatePricingValues(1.0);
    }
  });

  document.querySelectorAll(".btnSelectPricingPlan").forEach(btn => {
    btn.addEventListener("click", (e) => {
      selectedPricingPlan = e.target.getAttribute("data-plan");
      openStripeModal(selectedPricingPlan);
    });
  });
}

function updatePricingValues(factor) {
  document.querySelector(".priceValStarter").textContent = `$${Math.round(99 * factor)}`;
  document.querySelector(".priceValPro").textContent = `$${Math.round(299 * factor)}`;
  document.querySelector(".priceValBusiness").textContent = `$${Math.round(599 * factor)}`;
}

function initStripeCheckout() {
  const modal = document.getElementById("stripeCheckoutModal");
  const btnClose = document.getElementById("btnCloseCheckoutModal");
  const form = document.getElementById("stripeSimulationForm");

  btnClose?.addEventListener("click", () => {
    modal.style.display = "none";
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    modal.style.display = "none";
    showToast(currentLang === "en" ? "Subscription Activated Successfully!" : "¡Suscripción activada con éxito!");
  });
}

function openStripeModal(planKey) {
  const modal = document.getElementById("stripeCheckoutModal");
  const planTitle = document.getElementById("modalPlanTitle");
  const planPrice = document.getElementById("modalPlanPrice");

  if (planKey === "free") {
    showToast(currentLang === "en" ? "Free Account Activated!" : "¡Cuenta Gratuita Activada!");
    return;
  }

  const prices = { starter: "$99.00", pro: "$299.00", business: "$599.00" };
  const titles = {
    starter: currentLang === "en" ? "Starter Plan" : "Plan Starter",
    pro: currentLang === "en" ? "Professional Plan" : "Plan Profesional",
    business: currentLang === "en" ? "Business Plan" : "Plan Business"
  };

  planTitle.textContent = titles[planKey] || "Professional Plan";
  planPrice.textContent = `${prices[planKey] || "$299.00"} / ${currentPricingCycle === "monthly" ? "month" : "month (billed annually)"}`;
  modal.style.display = "flex";
}

// Prompt Generator Engine
function initPromptGenerator() {
  const inputs = ["companyScale", "primaryStack", "notificationChannel", "aiEnhancement"];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener("change", updateGeneratedPrompt);
    el?.addEventListener("input", updateGeneratedPrompt);
  });

  document.getElementById("btnCopyGeneratedPrompt")?.addEventListener("click", () => {
    const text = document.getElementById("generatedPromptResult")?.textContent;
    if (text) {
      navigator.clipboard.writeText(text).then(() => showToast(currentLang === "en" ? "Custom prompt copied!" : "¡Prompt personalizado copiado!"));
    }
  });

  document.getElementById("btnDownloadBlueprintJson")?.addEventListener("click", () => {
    const scale = document.getElementById("companyScale")?.value || "medium";
    const stack = document.getElementById("primaryStack")?.value || activeSector.techStack[0];
    const channel = document.getElementById("notificationChannel")?.value || "WhatsApp";

    const jsonBlueprint = {
      name: `AutoArchitect Blueprint - ${activeSector.name[currentLang]}`,
      sector: activeSector.id,
      version: "2.0.0",
      targetScale: scale,
      stackConfig: {
        primary: stack,
        notification: channel
      },
      nodes: activeSector.nodes.map(n => ({
        step: n.step,
        name: n.title,
        service: n.sub
      }))
    };

    const jsonStr = JSON.stringify(jsonBlueprint, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `blueprint_${activeSector.id}_n8n.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(currentLang === "en" ? "JSON Blueprint Downloaded!" : "¡JSON Blueprint Descargado!");
  });

  updateGeneratedPrompt();
}

function updateGeneratedPrompt() {
  const scale = document.getElementById("companyScale")?.value || "medium";
  const stack = document.getElementById("primaryStack")?.value || activeSector.techStack[0];
  const channel = document.getElementById("notificationChannel")?.value || "WhatsApp";
  const ai = document.getElementById("aiEnhancement")?.value || "Fast AI Parser";
  const resultBox = document.getElementById("generatedPromptResult");

  if (!resultBox) return;

  if (currentLang === "en") {
    resultBox.textContent = `AUTOMATION ENGINEERING PROMPT:
--------------------------------------------------
TARGET SECTOR: ${activeSector.name.en}
SCALE: ${scale.toUpperCase()}
STACK: ${stack} | NOTIFICATIONS: ${channel} | AI ENGINE: ${ai}

CORE GOAL:
Build an automated workflow that listens to ${stack} webhooks, processes payload using ${ai}, and dispatches status updates to ${channel}.

BASE PROMPT:
"${activeSector.prompt1.en}"`;
  } else {
    resultBox.textContent = `PROMPT DE INGENIERÍA DE AUTOMATIZACIÓN:
--------------------------------------------------
SECTOR OBJETIVO: ${activeSector.name.es}
ESCALA: ${scale.toUpperCase()}
PILATECNOLÓGICA: ${stack} | NOTIFICACIONES: ${channel} | MOTOR IA: ${ai}

OBJETIVO PRINCIPAL:
Construir un flujo automatizado que reciba webhooks de ${stack}, procese datos con ${ai} y notifique vía ${channel}.

PROMPT BASE:
"${activeSector.prompt1.es}"`;
  }
}

// Simulator Console Engine
function initSimulator() {
  const btnStart = document.getElementById("btnStartSimulation");
  const btnClear = document.getElementById("btnClearLogs");
  const logsContainer = document.getElementById("terminalLogs");

  btnStart?.addEventListener("click", () => {
    const logs = activeSector.logs;
    const statusEl = document.getElementById("simStatus");
    const timeEl = document.getElementById("simTime");
    const nodesEl = document.getElementById("simNodesCount");
    const progressEl = document.getElementById("simProgressBar");

    statusEl.textContent = currentLang === "en" ? "Running..." : "Ejecutando...";
    statusEl.className = "m-val status-running";
    logsContainer.innerHTML = `<div class="log-line info">[SYSTEM] Starting simulation event...</div>`;

    let idx = 0;
    const startT = Date.now();

    const interval = setInterval(() => {
      if (idx < logs.length) {
        const line = document.createElement("div");
        line.className = "log-line process";
        line.textContent = logs[idx];
        logsContainer.appendChild(line);
        logsContainer.scrollTop = logsContainer.scrollHeight;

        const pct = Math.round(((idx + 1) / logs.length) * 100);
        progressEl.style.width = `${pct}%`;
        nodesEl.textContent = `${Math.min(4, idx + 1)} / 4`;
        timeEl.textContent = `${Date.now() - startT} ms`;
        idx++;
      } else {
        clearInterval(interval);
        statusEl.textContent = currentLang === "en" ? "Completed" : "Completado";
        statusEl.className = "m-val status-done";
        showToast(currentLang === "en" ? "Simulation Finished!" : "¡Simulación Finalizada!");
      }
    }, 350);
  });

  btnClear?.addEventListener("click", () => {
    logsContainer.innerHTML = `<div class="log-line info">[SYSTEM] Console cleared.</div>`;
    document.getElementById("simStatus").textContent = "Idle";
    document.getElementById("simStatus").className = "m-val status-idle";
    document.getElementById("simProgressBar").style.width = "0%";
    document.getElementById("simNodesCount").textContent = "0 / 4";
    document.getElementById("simTime").textContent = "0 ms";
  });
}

// ROI Calculator Engine
function initRoiCalculator() {
  const volIn = document.getElementById("monthlyVolume");
  const timeIn = document.getElementById("manualTimeMin");
  const costIn = document.getElementById("hourlyCostBr");

  const calc = () => {
    const vol = parseFloat(volIn.value) || 0;
    const min = parseFloat(timeIn.value) || 0;
    const cost = parseFloat(costIn.value) || 0;

    const hours = (vol * min) / 60;
    const savings = hours * cost;
    const speed = (min / 0.5).toFixed(0);

    document.getElementById("roiFinancialSavings").textContent = `$${savings.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    document.getElementById("roiHoursSaved").textContent = `${Math.round(hours)} hrs`;
    document.getElementById("roiSpeedup").textContent = `${speed}x faster`;
  };

  [volIn, timeIn, costIn].forEach(input => input?.addEventListener("input", calc));
}

// Proposal Generator Engine
function initProposalGenerator() {
  const inputs = ["propClientName", "propContactName", "propProviderName", "propSetupPrice", "propMonthlyPrice", "propDeadlineDays"];
  inputs.forEach(id => document.getElementById(id)?.addEventListener("input", renderProposalDocument));

  document.getElementById("btnPrintProposalPdf")?.addEventListener("click", () => window.print());
  document.getElementById("btnCopyProposalText")?.addEventListener("click", () => {
    const txt = document.getElementById("proposalDocument").innerText;
    navigator.clipboard.writeText(txt).then(() => showToast(currentLang === "en" ? "Proposal copied!" : "¡Propuesta copiada!"));
  });
}

function renderProposalDocument() {
  const client = document.getElementById("propClientName")?.value || "Client Corp";
  const contact = document.getElementById("propContactName")?.value || "John Doe";
  const provider = document.getElementById("propProviderName")?.value || "AutoArchitect";
  const setup = parseFloat(document.getElementById("propSetupPrice")?.value) || 4500;
  const monthly = parseFloat(document.getElementById("propMonthlyPrice")?.value) || 550;
  const days = parseInt(document.getElementById("propDeadlineDays")?.value) || 20;

  const doc = document.getElementById("proposalDocument");
  if (!doc) return;

  if (currentLang === "en") {
    doc.innerHTML = `
      <h2>AUTOMATION SERVICE PROPOSAL</h2>
      <p><strong>Prepared For:</strong> ${client} (${contact}) | <strong>Provider:</strong> ${provider}</p>
      <hr style="margin: 12px 0;">
      <h3>1. Executive Summary</h3>
      <p>This proposal outlines the deployment of an enterprise automation architecture for <em>${activeSector.name.en}</em>.</p>
      <h3>2. Scope & Implementation</h3>
      <ul>${activeSector.nodes.map(n => `<li><strong>${n.title}:</strong> ${n.sub}</li>`).join("")}</ul>
      <h3>3. Financial Terms</h3>
      <p><strong>Setup Fee:</strong> $${setup.toLocaleString()} | <strong>Monthly Recurring:</strong> $${monthly.toLocaleString()}/mo</p>
      <p><strong>Estimated Timeline:</strong> ${days} business days.</p>
    `;
  } else {
    doc.innerHTML = `
      <h2>PROPUESTA DE SERVICIO DE AUTOMATIZACIÓN</h2>
      <p><strong>Preparado Para:</strong> ${client} (${contact}) | <strong>Proveedor:</strong> ${provider}</p>
      <hr style="margin: 12px 0;">
      <h3>1. Resumen Ejecutivo</h3>
      <p>Esta propuesta detalla la implementación de automatización para <em>${activeSector.name.es}</em>.</p>
      <h3>2. Alcance e Implementación</h3>
      <ul>${activeSector.nodes.map(n => `<li><strong>${n.title}:</strong> ${n.sub}</li>`).join("")}</ul>
      <h3>3. Términos Financieros</h3>
      <p><strong>Costo de Setup:</strong> $${setup.toLocaleString()} | <strong>Cuota Mensual:</strong> $${monthly.toLocaleString()}/mes</p>
      <p><strong>Tiempo Estimado:</strong> ${days} días hábiles.</p>
    `;
  }
}

// Site Owner & Admin Console Engine
function initAdminConsole() {
  const stripeForm = document.getElementById("adminStripeKeysForm");
  stripeForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const pk = document.getElementById("adminStripePk")?.value;
    const sk = document.getElementById("adminStripeSk")?.value;

    if (pk && sk) {
      localStorage.setItem("stripe_pk", pk);
      localStorage.setItem("stripe_sk", sk);

      const notice = document.getElementById("adminStripeConfigNotice");
      if (notice) {
        notice.textContent = currentLang === "en" ? "Stripe Production Active (Configured)" : "Stripe Producción Activo (Configurado)";
        notice.style.color = "var(--color-success)";
      }

      showToast(currentLang === "en" ? "Stripe Production Keys Saved Successfully!" : "¡Claves de Stripe guardadas con éxito!");
    }
  });

  const profileForm = document.getElementById("ownerProfileForm");
  profileForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("ownerNameInput")?.value;
    const email = document.getElementById("ownerEmailInput")?.value;
    const pass = document.getElementById("ownerPasswordInput")?.value;

    if (name && email) {
      localStorage.setItem("owner_name", name);
      localStorage.setItem("owner_email", email);
      if (pass) localStorage.setItem("owner_pass", pass);

      showToast(currentLang === "en" ? "Owner Profile Updated Successfully!" : "¡Perfil de propietario actualizado con éxito!");
    }
  });
}

// Toast Helper
function showToast(msg) {
  const toast = document.getElementById("toastNotification");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}
