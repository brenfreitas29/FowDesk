/* ==========================================================================
   app.js - AutoArchitect SaaS Orchestrator & CRO Marketing Interactivity
   ========================================================================== */

import { AutoArchitectDAL } from './src/data/AutoArchitectDAL.js';
import { AutomationService } from './src/services/AutomationService.js';
import { renderKPICards } from './src/dashboard/components/KPICards.js';
import { renderRecentAutomations } from './src/dashboard/components/RecentAutomations.js';
import { renderActivityFeed } from './src/dashboard/components/ActivityFeed.js';
import { initCommandPalette } from './src/dashboard/components/CommandPalette.js';
import { renderAIBuilderAssistant } from './src/dashboard/components/AIBuilderAssistant.js';
import { renderWorkflowCanvas } from './src/workflows/builder/WorkflowCanvas.js';
import { renderTemplateMarketplace } from './src/dashboard/components/TemplateMarketplace.js';
import { renderConnectionsManager } from './src/dashboard/components/ConnectionsManager.js';
import { renderExecutionsHistory } from './src/dashboard/components/ExecutionsHistory.js';
import { renderAnalyticsReports } from './src/dashboard/components/AnalyticsReports.js';
import { renderTeamAuditManager } from './src/dashboard/components/TeamAuditManager.js';
import { renderBillingManager } from './src/dashboard/components/BillingManager.js';
import { renderWorkspaceSettings } from './src/dashboard/components/WorkspaceSettings.js';
import { renderHealthScore } from './src/dashboard/components/HealthScoreEngine.js';
import { renderWorkflowSimulatorModal } from './src/dashboard/components/WorkflowSimulator.js';
import { renderHumanApprovalsInbox } from './src/dashboard/components/HumanApprovalsInbox.js';
import { renderVersionCompareModal } from './src/dashboard/components/VersionCompareAndRollback.js';
import { renderCostAndRoiAnalytics } from './src/dashboard/components/CostAndRoiAnalytics.js';
import { renderAICopilotDrawer } from './src/dashboard/components/AICopilotDrawer.js';
import { renderAutomationsManager } from './src/dashboard/components/AutomationsManager.js';
import { renderAutomationDetailView } from './src/dashboard/components/AutomationDetailView.js';
import { renderExecutionDetailView } from './src/dashboard/components/ExecutionDetailView.js';
import { renderConnectionDetailView } from './src/dashboard/components/ConnectionDetailView.js';
import { renderOnboardingWizard } from './src/onboarding/OnboardingWizard.js';
import { renderMobileBottomNav } from './src/dashboard/components/MobileBottomNav.js';
import { renderAuthModal } from './src/auth/AuthModal.js';
import { showToast } from './src/shared/components/toast.js';
import { hasPermission } from './src/core/permissions/rbac.js';

let activeWorkspaceId = "ws_default";
let currentUser = JSON.parse(localStorage.getItem("autoarch_user") || '{"email":"user@company.com","role":"Owner"}');

document.addEventListener("DOMContentLoaded", async () => {
  initNavigation();
  initCommandPalette();
  initFaqAccordion();
  initFormValidation();
  initScrollAnimations();
  
  renderAuthModal("authModalContainer", {
    onLoginSuccess: (user) => {
      currentUser = user;
      updateUserProfileDisplay();
      loadDashboardData();
      document.getElementById("btnHeaderLaunchApp")?.click();
    }
  });

  renderAllModules();
  renderMobileBottomNav("mobileBottomNavContainer");
  updateUserProfileDisplay();
  await loadDashboardData();
  initEventHandlers();
});

/* ===== FAQ ACCORDION INTERACTIVITY ===== */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const isOpen = answer.classList.contains("open");

      // Close all answers
      document.querySelectorAll(".faq-answer").forEach(a => a.classList.remove("open"));
      document.querySelectorAll(".faq-question").forEach(q => q.classList.remove("active"));

      if (!isOpen) {
        question.classList.add("active");
        answer.classList.add("open");
      }
    });
  });
}

/* ===== FORM VALIDATION & REDIRECT ===== */
function initFormValidation() {
  const form = document.getElementById("leadContactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputNome = document.getElementById("inputNome");
    const inputWhatsapp = document.getElementById("inputWhatsapp");
    const inputNicho = document.getElementById("inputNicho");
    const checkConsent = document.getElementById("checkConsent");
    const submitBtn = document.getElementById("btnFormSubmit");

    let isValid = true;

    // Validate Nome
    if (!inputNome.value.trim()) {
      inputNome.classList.add("error");
      document.getElementById("errorNome").classList.add("visible");
      isValid = false;
    } else {
      inputNome.classList.remove("error");
      document.getElementById("errorNome").classList.remove("visible");
    }

    // Validate WhatsApp
    if (!inputWhatsapp.value.trim()) {
      inputWhatsapp.classList.add("error");
      document.getElementById("errorWhatsapp").classList.add("visible");
      isValid = false;
    } else {
      inputWhatsapp.classList.remove("error");
      document.getElementById("errorWhatsapp").classList.remove("visible");
    }

    // Validate Nicho
    if (!inputNicho.value.trim()) {
      inputNicho.classList.add("error");
      document.getElementById("errorNicho").classList.add("visible");
      isValid = false;
    } else {
      inputNicho.classList.remove("error");
      document.getElementById("errorNicho").classList.remove("visible");
    }

    // Validate Consent Checkbox
    if (!checkConsent.checked) {
      document.getElementById("errorConsent").classList.add("visible");
      isValid = false;
    } else {
      document.getElementById("errorConsent").classList.remove("visible");
    }

    if (isValid) {
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;

      // Save lead locally
      const lead = {
        nome: inputNome.value.trim(),
        whatsapp: inputWhatsapp.value.trim(),
        nicho: inputNicho.value.trim(),
        date: new Date().toISOString()
      };
      localStorage.setItem("autoarch_latest_lead", JSON.stringify(lead));

      setTimeout(() => {
        window.location.href = "obrigado.html";
      }, 1200);
    }
  });
}

/* ===== SCROLL REVEAL & STICKY CTA ===== */
function initScrollAnimations() {
  const reveals = document.querySelectorAll(".reveal");
  const backToTop = document.getElementById("btnBackToTop");
  const stickyCta = document.getElementById("stickyMobileCta");

  const handleScroll = () => {
    const scrollPos = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollPos / docHeight) * 100;

    // Show Back to Top / Sticky CTA after 30% scroll
    if (scrollPercent > 30) {
      if (backToTop) backToTop.classList.add("visible");
      if (stickyCta) stickyCta.style.display = "block";
    } else {
      if (backToTop) backToTop.classList.remove("visible");
      if (stickyCta) stickyCta.style.display = "none";
    }

    // Reveal elements
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        el.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function updateUserProfileDisplay() {
  const emailDisplay = document.getElementById("activeUserEmailDisplay");
  const roleBadge = document.getElementById("userRoleBadge");

  if (emailDisplay) emailDisplay.textContent = currentUser.email || "user@company.com";
  if (roleBadge) {
    roleBadge.textContent = currentUser.role || "Owner";
    roleBadge.className = currentUser.role === 'Owner' ? 'tag-primary' : currentUser.role === 'Admin' ? 'tag-success' : 'tag-warning';
  }
}

async function loadDashboardData() {
  const automations = await AutomationService.fetchAutomations(activeWorkspaceId);
  const isOnboardingComplete = localStorage.getItem("autoarch_onboarding_complete") === "true";

  if (automations.length === 0 || !isOnboardingComplete) {
    renderOnboardingWizard("dashboardOnboardingContainer", {
      onComplete: async () => {
        showToast("Onboarding complete! Workspace activated.");
        document.getElementById("dashboardOnboardingContainer").style.display = "none";
        await loadDashboardData();
      }
    });
  } else {
    document.getElementById("dashboardOnboardingContainer").style.display = "none";
  }

  const canModify = hasPermission(currentUser.role || "Owner", "delete_automation");

  renderKPICards("dashboardKpiContainer");
  renderRecentAutomations("recentAutomationsContainer", automations, { canModify });
  renderAutomationsManager("automationsListGrid", automations, { canModify });

  const activities = [
    { title: "Stripe Order & Invoice Sync Executed", summary: "Customer invoice delivered via email", timestamp: "2 mins ago" },
    { title: "Shopify Lead Welcome WhatsApp Sent", summary: "WhatsApp message delivered to buyer", timestamp: "14 mins ago" }
  ];
  renderActivityFeed("dashboardActivityFeedContainer", activities);

  if (hasPermission(currentUser.role || "Owner", "view_audit_logs")) {
    const logs = await AutoArchitectDAL.getAuditLogs(activeWorkspaceId, currentUser);
    renderAuditLogs(logs);
  }
}

function renderAllModules() {
  renderAIBuilderAssistant("tab-ai-builder");
  renderWorkflowCanvas("tab-ai-builder");
  renderTemplateMarketplace("portalTemplatesGrid");
  renderConnectionsManager("connectionsGridContainer");
  renderExecutionsHistory("tab-executions");
  renderAnalyticsReports("tab-analytics");
  renderTeamAuditManager("tab-team-content");
  renderBillingManager("tab-billing");
  renderWorkspaceSettings("tab-settings");

  renderHealthScore("dashboardHealthScoreContainer");
  renderWorkflowSimulatorModal("simulatorModalContainer");
  renderHumanApprovalsInbox("dashboardApprovalsContainer");
  renderVersionCompareModal("versionCompareModalContainer");
  renderCostAndRoiAnalytics("dashboardCostRoiContainer");
  renderAICopilotDrawer("aiCopilotDrawerContainer");

  renderAutomationDetailView("tab-automation-detail-content");
  renderExecutionDetailView("tab-execution-detail-content");
  renderConnectionDetailView("tab-connection-detail-content");
}

function renderAuditLogs(logs) {
  const container = document.getElementById("auditLogsContainer");
  if (!container) return;

  if (!logs || logs.length === 0) {
    container.innerHTML = `<div class="text-sub-sm">No audit logs recorded yet.</div>`;
    return;
  }

  container.innerHTML = logs.map(l => `
    <div class="visual-step-block margin-bottom-xs">
      <div>
        <strong>${l.action}: ${l.resource}</strong>
        <div class="text-sub-sm">User: ${l.user}</div>
      </div>
      <span class="tag-primary">${l.timestamp}</span>
    </div>
  `).join("");
}

function initNavigation() {
  const btnLaunchApp = document.getElementById("btnHeaderLaunchApp");
  const btnHeroExploreApp = document.getElementById("btnHeroExploreApp");
  const btnHeaderLogin = document.getElementById("btnHeaderLogin");
  const btnHeaderGetStarted = document.getElementById("btnHeroGetStarted");
  const btnBackToPublicSite = document.getElementById("btnBackToPublicSite");
  const logoHomeLink = document.getElementById("logoHomeLink");
  const btnSignOut = document.getElementById("btnSignOut");

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

  const openAuthModal = () => {
    const modal = document.getElementById("authModal");
    if (modal) modal.style.display = "flex";
  };

  btnHeaderLogin?.addEventListener("click", openAuthModal);
  btnHeaderGetStarted?.addEventListener("click", openAuthModal);

  btnLaunchApp?.addEventListener("click", showPortal);
  btnHeroExploreApp?.addEventListener("click", showPortal);
  btnBackToPublicSite?.addEventListener("click", showPublic);
  logoHomeLink?.addEventListener("click", showPublic);

  btnSignOut?.addEventListener("click", () => {
    localStorage.removeItem("autoarch_user");
    currentUser = { email: "user@company.com", role: "Owner" };
    showToast("Signed out successfully");
    showPublic();
  });

  // Tab Switchers & Detail View Openers
  const navBtns = document.querySelectorAll(".portal-nav-item");
  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      navBtns.forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".portal-pane").forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const target = btn.getAttribute("data-tab");
      document.getElementById(target)?.classList.add("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest(".btn-open-auto-detail")) {
      e.preventDefault();
      document.querySelectorAll(".portal-pane").forEach(p => p.classList.remove("active"));
      document.getElementById("tab-automation-detail")?.classList.add("active");
    }
  });
}

function initEventHandlers() {
  document.getElementById("btnToggleCopilotDrawer")?.addEventListener("click", () => {
    const drawer = document.getElementById("aiCopilotDrawerPanel");
    if (drawer) drawer.style.display = drawer.style.display === "none" ? "flex" : "none";
  });

  document.getElementById("btnCloseCopilotDrawer")?.addEventListener("click", () => {
    document.getElementById("aiCopilotDrawerPanel").style.display = "none";
  });

  document.getElementById("btnOpenCmdPaletteHint")?.addEventListener("click", () => {
    document.getElementById("commandPaletteModal").style.display = "flex";
    document.getElementById("cmdPaletteInput")?.focus();
  });
}
