# FlowDesk

> AI-powered, multi-tenant CRM SaaS for managing leads, conversations, pipelines, scheduling and automation in one workspace.

**Live demo:** https://whats-app-crm-system-architecture.vercel.app  
**Portfolio case study:** https://brenda-studio-portfolio.vercel.app/projects/flowdesk

## Overview

FlowDesk is a full-stack CRM product designed for teams that manage customer conversations and sales workflows across WhatsApp-oriented processes. The goal is to turn fragmented conversations and follow-ups into a structured operating system where communication is connected to lead status, pipeline stages, appointments, customer records and automation.

This repository demonstrates SaaS product architecture rather than only a dashboard UI: authentication, tenant-aware data access, CRM workflows, subscription foundations and production deployment are treated as connected parts of the product.

## Key features

- Multi-tenant SaaS structure for multiple companies
- Authentication and protected product areas
- Role-aware access and Row Level Security patterns
- Lead management and Kanban-style pipeline
- Conversations and customer context
- Scheduling and customer/patient records
- Automation-ready workflows
- Analytics and operational dashboards
- Admin/company management foundation
- Stripe-oriented subscription, checkout and customer portal flows
- Responsive product UI
- English and Spanish product experience

## Technical challenges

### Tenant isolation

A CRM used by multiple companies needs strict separation between organizations. The product architecture is designed around tenant-aware records and authorization rules instead of relying only on client-side filtering.

### Turning conversations into workflow

Messages are more useful when connected to business state. FlowDesk links communication with leads, pipeline stages, scheduling and customer context so the interface behaves as one system rather than several unrelated screens.

### SaaS foundations

Authentication, permissions, billing readiness and administration were designed as product-level concerns from the beginning so the application can evolve beyond a single-company prototype.

## Stack

- Next.js
- React
- TypeScript
- Supabase
- PostgreSQL
- Row Level Security (RLS)
- Stripe
- Tailwind CSS
- AI/automation workflows
- Vercel

## Product areas

```text
Authentication
   ↓
Company / tenant context
   ↓
Leads → Pipeline → Conversations
   ↓          ↓
Scheduling   Customer records
   ↓
Automation + Analytics
   ↓
Admin / Billing foundation
```

## Local development

```bash
npm install
npm run dev
```

Create the required local environment file using the project's environment template/configuration and add only development credentials. Never commit service-role keys, payment secrets or provider tokens.

Before production, run the repository's lint, type-check and build commands and verify authentication, tenant isolation and protected routes with separate test users.

## What I learned

Building FlowDesk reinforced that multi-tenant SaaS architecture is primarily a data-ownership and authorization problem, not simply a UI problem. It also showed how CRM value comes from connecting conversations to operational context instead of treating messaging as an isolated inbox.

## What I would improve next

- Expand automated tests for tenant isolation and critical CRM workflows
- Add deeper observability for automation execution and failures
- Continue refining role/permission granularity
- Improve onboarding for new companies
- Expand analytics around pipeline conversion and response workflows

## Project status

Portfolio project under active development. The public deployment is intended to demonstrate the product experience; integrations that require private credentials should be configured separately for production use.

## Author

Built by **Brenda Freitas** — Full Stack Developer focused on SaaS products, React/Next.js, Supabase and automation.

Portfolio: https://brenda-studio-portfolio.vercel.app  
GitHub: https://github.com/brenfreitas29
