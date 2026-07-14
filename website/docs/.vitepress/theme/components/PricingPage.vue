<template>
  <main class="ds-pricing">
    <div class="ds-pricing-header">
      <h1 class="ds-pricing-title">定价</h1>
      <p class="ds-pricing-desc">选择适合您的方案，灵活应对不同场景需求。</p>
    </div>

    <div class="ds-pricing-grid">
      <!-- 免费版 -->
      <div class="ds-pricing-card">
        <div class="ds-pricing-card-header">
          <h2 class="ds-pricing-plan-name">免费版</h2>
          <div class="ds-pricing-price">
            <span class="ds-pricing-amount">免费</span>
          </div>
        </div>
        <p class="ds-pricing-plan-desc">适合个人体验与轻量使用</p>
        <ul class="ds-pricing-features">
          <li class="ds-pricing-feature ds-pricing-feature--included">
            <svg class="ds-pricing-check" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            基础仿真功能
          </li>
          <li class="ds-pricing-feature ds-pricing-feature--included">
            <svg class="ds-pricing-check" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            在线实时使用
          </li>
          <li class="ds-pricing-feature ds-pricing-feature--included">
            <svg class="ds-pricing-check" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            社区支持
          </li>
          <li class="ds-pricing-feature ds-pricing-feature--excluded">
            <svg class="ds-pricing-cross" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            离线使用
          </li>
          <li class="ds-pricing-feature ds-pricing-feature--excluded">
            <svg class="ds-pricing-cross" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            去除水印
          </li>
          <li class="ds-pricing-feature ds-pricing-feature--excluded">
            <svg class="ds-pricing-cross" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            高级功能（部分功能受限）
          </li>
        </ul>
        <a href="/guide/" class="ds-pricing-btn ds-pricing-btn--secondary">开始使用</a>
      </div>

      <!-- 企业版 -->
      <div class="ds-pricing-card ds-pricing-card--featured">
        <div class="ds-pricing-badge">推荐</div>
        <div class="ds-pricing-card-header">
          <h2 class="ds-pricing-plan-name">企业版</h2>
          <div class="ds-pricing-price">
            <span class="ds-pricing-amount">联系我们</span>
          </div>
        </div>
        <p class="ds-pricing-plan-desc">适合企业团队与私有化部署场景</p>
        <ul class="ds-pricing-features">
          <li class="ds-pricing-feature ds-pricing-feature--included">
            <svg class="ds-pricing-check" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            免费版全部功能
          </li>
          <li class="ds-pricing-feature ds-pricing-feature--included">
            <svg class="ds-pricing-check" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            支持私有环境部署
          </li>
          <li class="ds-pricing-feature ds-pricing-feature--included">
            <svg class="ds-pricing-check" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            可去除水印
          </li>
          <li class="ds-pricing-feature ds-pricing-feature--included">
            <svg class="ds-pricing-check" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            功能无限制
          </li>
          <li class="ds-pricing-feature ds-pricing-feature--included">
            <svg class="ds-pricing-check" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            专属技术支持
          </li>
          <li class="ds-pricing-feature ds-pricing-feature--included">
            <svg class="ds-pricing-check" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            优先需求响应
          </li>
        </ul>
        <a href="mailto:contact@daisy.space" class="ds-pricing-btn ds-pricing-btn--primary " style="opacity: 0.8;">联系销售（该功能暂未开放）</a>
      </div>
    </div>

    <div class="ds-pricing-footer">
      <p>需要定制化方案？<a href="mailto:contact@daisy.space" class="ds-pricing-footer-link">联系我们</a>，我们将为您提供专属报价。</p>
    </div>
  </main>
</template>
