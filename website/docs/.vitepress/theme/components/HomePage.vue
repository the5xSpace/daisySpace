<script setup lang="ts">
import { computed } from "vue";
import { useData, withBase } from "vitepress";
import type { DaisyThemeConfig } from "../../navigation";
import {
  Orbit,
  Layers,
  Satellite,
  Globe,
  FileCode,
  Cpu,
} from "lucide-vue-next";
import heroVisual from "../assets/hero-visual.svg";

const { lang, theme } = useData<DaisyThemeConfig>();
const isEnglish = computed(() => lang.value.startsWith("en"));
const showQuickStart = computed(() => !isEnglish.value || theme.value.englishGuideReady);
const copy = computed(() => isEnglish.value ? {
  subtitle: "Space Visualization and Simulation SDK",
  description: "Orbit propagation, sensor coverage, communication links, and celestial systems in one focused SDK.",
  quickStart: "Quick Start",
  guideHref: "/en/guide/",
  heroAlt: "Daisy Space 3D scene",
  showcase: "See the simulation",
  showcaseDescription: "Real-time 3D rendering from satellite orbits to sensor coverage",
  details: [
    "SGP4 orbit propagation - 20k+ satellites in real time",
    "Sensor volumes - beam coverage merge analysis",
    "Celestial systems - high-fidelity Moon and Mars rendering",
    "CZML - load standard simulation data directly",
  ],
  cta: "Start with Daisy Space",
  ctaDescription: "Explore every core capability and editable example in the Playground",
  playground: "Open Playground",
} : {
  subtitle: "航天可视化仿真 SDK",
  description: "航天可视化仿真 SDK - 卫星轨道传播、传感器波束覆盖、链路通信、天体系统，一切尽在掌握。",
  quickStart: "快速开始",
  guideHref: "/guide/",
  heroAlt: "Daisy Space 3D 场景示意",
  showcase: "所见即所得",
  showcaseDescription: "从卫星轨道到传感器覆盖，实时 3D 渲染呈现",
  details: [
    "SGP4 轨道传播 - 20k+ 卫星实时仿真",
    "传感器锥体 - 波束覆盖合并分析",
    "天体系统 - 月球 / 火星高精度渲染",
    "CZML 协议 - 标准格式一键加载",
  ],
  cta: "开始使用 Daisy Space",
  ctaDescription: "在 Playground 中即时体验所有核心功能，查看源码并动手修改",
  playground: "前往 Playground",
});

const featureData = [
  {
    icon: Orbit,
    zhTitle: "轨道力学",
    enTitle: "Orbital Mechanics",
    zhDetails: "SGP4 双精度轨道传播器，支持 TLE / OMM / JSON 格式，WASM 硬件加速，过境预报与交会预估",
    enDetails: "Double-precision SGP4 propagation with TLE, OMM, and JSON input, WASM acceleration, pass prediction, and conjunction analysis.",
  },
  {
    icon: Layers,
    zhTitle: "可视化组件",
    enTitle: "Visualization Components",
    zhDetails: "20+ 种 Feature 组件：模型 / 点线面 / 传感器锥体 / 轨迹路径，组合式架构自由装配",
    enDetails: "More than 20 composable Feature components for models, geometry, sensor volumes, and trajectory paths.",
  },
  {
    icon: Satellite,
    zhTitle: "传感器波束",
    enTitle: "Sensor Beams",
    zhDetails: "锥体 / 椭圆锥 / 动态波束，波束覆盖合并（WASM），流动箭头材质，多发射方向",
    enDetails: "Conical, elliptical, and dynamic beams with WASM coverage merging, flow materials, and multiple emission directions.",
  },
  {
    icon: Globe,
    zhTitle: "天体系统",
    enTitle: "Celestial Systems",
    zhDetails: "地球 / 月球 / 火星完整支持，大气层渲染、晨昏线 Shader、局部坐标变换",
    enDetails: "Earth, Moon, and Mars support with atmospheres, terminator shaders, and local coordinate transforms.",
  },
  {
    icon: FileCode,
    zhTitle: "CZML 协议",
    enTitle: "CZML",
    zhDetails: "标准 CZML 格式解析与加载，支持实体 / 路径 / 模型 / 传感器等类型的时间调度",
    enDetails: "Parse and load standard CZML with time scheduling for entities, paths, models, and sensors.",
  },
  {
    icon: Cpu,
    zhTitle: "高性能渲染",
    enTitle: "High-performance Rendering",
    zhDetails: "Web Worker + WASM 并行计算，轨道传播 / 覆盖合并 / 网格构建卸出主线程",
    enDetails: "Web Workers and WASM move orbit propagation, coverage merging, and mesh construction off the main thread.",
  },
];

const features = computed(() => featureData.map((feature) => ({
  icon: feature.icon,
  title: isEnglish.value ? feature.enTitle : feature.zhTitle,
  details: isEnglish.value ? feature.enDetails : feature.zhDetails,
})));
const quickStartHref = computed(() => withBase(copy.value.guideHref));
const playgroundHref = withBase("/playground/");
</script>

<template>
  <div class="ds-home">
    <!-- Hero -->
    <section class="ds-hero">
      <div class="ds-hero-content">
        <h1 class="ds-hero-title">Daisy Space</h1>
        <p class="ds-hero-subtitle">{{ copy.subtitle }}</p>
        <p class="ds-hero-desc">{{ copy.description }}</p>
        <div class="ds-hero-actions">
          <a v-if="showQuickStart" class="ds-btn-primary" :href="quickStartHref">{{ copy.quickStart }} →</a>
          <a
            class="ds-btn-secondary"
            :href="playgroundHref"
            >Playground →</a
          >
        </div>
      </div>
    </section>

    <!-- Hero Image Banner -->
    <section class="ds-hero-banner">
      <div class="ds-hero-banner-inner">
        <img :src="heroVisual" :alt="copy.heroAlt" />
      </div>
    </section>

    <!-- Features -->
    <section class="ds-features">
      <div class="ds-features-grid">
        <div v-for="f in features" :key="f.title" class="ds-feature-card">
          <component :is="f.icon" class="ds-feature-icon" :size="20" />
          <h3 class="ds-feature-title">{{ f.title }}</h3>
          <p class="ds-feature-details">{{ f.details }}</p>
        </div>
      </div>
    </section>

    <!-- Screenshot -->
    <section class="ds-screenshot">
      <h2 class="ds-section-title">{{ copy.showcase }}</h2>
      <p class="ds-section-desc">{{ copy.showcaseDescription }}</p>
      <div class="ds-screenshot-frame">
        <div class="ds-screenshot-content">
          <div class="ds-orbit-group">
            <div class="ds-orbit-ring"></div>
            <div class="ds-orbit-ring"></div>
            <div class="ds-orbit-ring"></div>
            <div class="ds-orbit-center"></div>
          </div>
          <div class="ds-screenshot-details">
            <div class="ds-screenshot-item">
              <span class="ds-screenshot-dot"></span>
              <span class="ds-screenshot-text">{{ copy.details[0] }}</span>
            </div>
            <div class="ds-screenshot-item">
              <span class="ds-screenshot-dot"></span>
              <span class="ds-screenshot-text">{{ copy.details[1] }}</span>
            </div>
            <div class="ds-screenshot-item">
              <span class="ds-screenshot-dot"></span>
              <span class="ds-screenshot-text">{{ copy.details[2] }}</span>
            </div>
            <div class="ds-screenshot-item">
              <span class="ds-screenshot-dot"></span>
              <span class="ds-screenshot-text">{{ copy.details[3] }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="ds-cta">
      <h2 class="ds-section-title">{{ copy.cta }}</h2>
      <p class="ds-section-desc">{{ copy.ctaDescription }}</p>
      <a
        class="ds-btn-primary"
        :href="playgroundHref"
        >{{ copy.playground }} →</a
      >
    </section>
  </div>
</template>
