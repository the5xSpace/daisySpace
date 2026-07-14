<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";

const { lang } = useData();
const copy = computed(() => lang.value.startsWith("en") ? {
  title: "Pricing",
  description: "Choose a plan that matches your deployment and support requirements.",
  free: "Free",
  freeDescription: "For evaluation and lightweight personal use",
  freeFeatures: ["Core simulation features", "Online use", "Community support"],
  freeLimits: ["Offline use", "Watermark removal", "Unrestricted advanced features"],
  start: "Get Started",
  recommended: "Recommended",
  enterprise: "Enterprise",
  contact: "Contact us",
  enterpriseDescription: "For teams and private deployments",
  enterpriseFeatures: [
    "Everything in Free",
    "Private deployment",
    "Watermark removal",
    "Unrestricted features",
    "Dedicated technical support",
    "Priority request handling",
  ],
  sales: "Contact Sales (coming soon)",
  custom: "Need a custom plan?",
  customLink: "Contact us",
  customSuffix: "for a tailored quote.",
} : {
  title: "定价",
  description: "选择适合您的方案，灵活应对不同场景需求。",
  free: "免费版",
  freeDescription: "适合个人体验与轻量使用",
  freeFeatures: ["基础仿真功能", "在线实时使用", "社区支持"],
  freeLimits: ["离线使用", "去除水印", "高级功能（部分功能受限）"],
  start: "开始使用",
  recommended: "推荐",
  enterprise: "企业版",
  contact: "联系我们",
  enterpriseDescription: "适合企业团队与私有化部署场景",
  enterpriseFeatures: [
    "免费版全部功能",
    "支持私有环境部署",
    "可去除水印",
    "功能无限制",
    "专属技术支持",
    "优先需求响应",
  ],
  sales: "联系销售（该功能暂未开放）",
  custom: "需要定制化方案？",
  customLink: "联系我们",
  customSuffix: "，我们将为您提供专属报价。",
});
const guideHref = computed(() => lang.value.startsWith("en") ? "/en/guide/" : "/guide/");
</script>

<template>
  <main class="ds-pricing">
    <div class="ds-pricing-header">
      <h1 class="ds-pricing-title">{{ copy.title }}</h1>
      <p class="ds-pricing-desc">{{ copy.description }}</p>
    </div>

    <div class="ds-pricing-grid">
      <!-- 免费版 -->
      <div class="ds-pricing-card">
        <div class="ds-pricing-card-header">
          <h2 class="ds-pricing-plan-name">{{ copy.free }}</h2>
          <div class="ds-pricing-price">
            <span class="ds-pricing-amount">{{ copy.free }}</span>
          </div>
        </div>
        <p class="ds-pricing-plan-desc">{{ copy.freeDescription }}</p>
        <ul class="ds-pricing-features">
          <li class="ds-pricing-feature ds-pricing-feature--included">
            <svg class="ds-pricing-check" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            {{ copy.freeFeatures[0] }}
          </li>
          <li class="ds-pricing-feature ds-pricing-feature--included">
            <svg class="ds-pricing-check" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            {{ copy.freeFeatures[1] }}
          </li>
          <li class="ds-pricing-feature ds-pricing-feature--included">
            <svg class="ds-pricing-check" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            {{ copy.freeFeatures[2] }}
          </li>
          <li class="ds-pricing-feature ds-pricing-feature--excluded">
            <svg class="ds-pricing-cross" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            {{ copy.freeLimits[0] }}
          </li>
          <li class="ds-pricing-feature ds-pricing-feature--excluded">
            <svg class="ds-pricing-cross" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            {{ copy.freeLimits[1] }}
          </li>
          <li class="ds-pricing-feature ds-pricing-feature--excluded">
            <svg class="ds-pricing-cross" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            {{ copy.freeLimits[2] }}
          </li>
        </ul>
        <a :href="guideHref" class="ds-pricing-btn ds-pricing-btn--secondary">{{ copy.start }}</a>
      </div>

      <!-- 企业版 -->
      <div class="ds-pricing-card ds-pricing-card--featured">
        <div class="ds-pricing-badge">{{ copy.recommended }}</div>
        <div class="ds-pricing-card-header">
          <h2 class="ds-pricing-plan-name">{{ copy.enterprise }}</h2>
          <div class="ds-pricing-price">
            <span class="ds-pricing-amount">{{ copy.contact }}</span>
          </div>
        </div>
        <p class="ds-pricing-plan-desc">{{ copy.enterpriseDescription }}</p>
        <ul class="ds-pricing-features">
          <li class="ds-pricing-feature ds-pricing-feature--included">
            <svg class="ds-pricing-check" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            {{ copy.enterpriseFeatures[0] }}
          </li>
          <li class="ds-pricing-feature ds-pricing-feature--included">
            <svg class="ds-pricing-check" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            {{ copy.enterpriseFeatures[1] }}
          </li>
          <li class="ds-pricing-feature ds-pricing-feature--included">
            <svg class="ds-pricing-check" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            {{ copy.enterpriseFeatures[2] }}
          </li>
          <li class="ds-pricing-feature ds-pricing-feature--included">
            <svg class="ds-pricing-check" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            {{ copy.enterpriseFeatures[3] }}
          </li>
          <li class="ds-pricing-feature ds-pricing-feature--included">
            <svg class="ds-pricing-check" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            {{ copy.enterpriseFeatures[4] }}
          </li>
          <li class="ds-pricing-feature ds-pricing-feature--included">
            <svg class="ds-pricing-check" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            {{ copy.enterpriseFeatures[5] }}
          </li>
        </ul>
        <a href="mailto:contact@daisy.space" class="ds-pricing-btn ds-pricing-btn--primary " style="opacity: 0.8;">{{ copy.sales }}</a>
      </div>
    </div>

    <div class="ds-pricing-footer">
      <p>{{ copy.custom }} <a href="mailto:contact@daisy.space" class="ds-pricing-footer-link">{{ copy.customLink }}</a>{{ copy.customSuffix }}</p>
    </div>
  </main>
</template>
