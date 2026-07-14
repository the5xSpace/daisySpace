<script setup lang="ts">
import {
  Orbit,
  Layers,
  Satellite,
  Globe,
  FileCode,
  Cpu,
} from "lucide-vue-next";
import heroVisual from "../assets/hero-visual.svg";

const features = [
  {
    icon: Orbit,
    title: "轨道力学",
    details:
      "SGP4 双精度轨道传播器，支持 TLE / OMM / JSON 格式，WASM 硬件加速，过境预报与交会预估",
  },
  {
    icon: Layers,
    title: "可视化组件",
    details:
      "20+ 种 Feature 组件：模型 / 点线面 / 传感器锥体 / 轨迹路径，组合式架构自由装配",
  },
  {
    icon: Satellite,
    title: "传感器波束",
    details:
      "锥体 / 椭圆锥 / 动态波束，波束覆盖合并（WASM），流动箭头材质，多发射方向",
  },
  {
    icon: Globe,
    title: "天体系统",
    details:
      "地球 / 月球 / 火星完整支持，大气层渲染、晨昏线 Shader、局部坐标变换",
  },
  {
    icon: FileCode,
    title: "CZML 协议",
    details:
      "标准 CZML 格式解析与加载，支持实体 / 路径 / 模型 / 传感器等类型的时间调度",
  },
  {
    icon: Cpu,
    title: "高性能渲染",
    details:
      "Web Worker + WASM 并行计算，轨道传播 / 覆盖合并 / 网格构建卸出主线程",
  },
];
</script>

<template>
  <div class="ds-home">
    <!-- Hero -->
    <section class="ds-hero">
      <div class="ds-hero-content">
        <h1 class="ds-hero-title">Daisy Space</h1>
        <p class="ds-hero-subtitle">航天可视化仿真 SDK</p>
        <p class="ds-hero-desc">
          航天可视化仿真 SDK — 卫星轨道传播、传感器波束覆盖、链路通信、天体系统，一切尽在掌握。
        </p>
        <div class="ds-hero-actions">
          <a class="ds-btn-primary" href="/guide/">快速开始 →</a>
          <a
            class="ds-btn-secondary"
            href="/playground/"
            >Playground →</a
          >
        </div>
      </div>
    </section>

    <!-- Hero Image Banner -->
    <section class="ds-hero-banner">
      <div class="ds-hero-banner-inner">
        <img :src="heroVisual" alt="Daisy Space 3D 场景示意" />
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
      <h2 class="ds-section-title">所见即所得</h2>
      <p class="ds-section-desc">从卫星轨道到传感器覆盖，实时 3D 渲染呈现</p>
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
              <span class="ds-screenshot-text"
                >SGP4 轨道传播 · 20k+ 卫星实时仿真</span
              >
            </div>
            <div class="ds-screenshot-item">
              <span class="ds-screenshot-dot"></span>
              <span class="ds-screenshot-text"
                >传感器锥体 · 波束覆盖合并分析</span
              >
            </div>
            <div class="ds-screenshot-item">
              <span class="ds-screenshot-dot"></span>
              <span class="ds-screenshot-text"
                >天体系统 · 月球 / 火星高精度渲染</span
              >
            </div>
            <div class="ds-screenshot-item">
              <span class="ds-screenshot-dot"></span>
              <span class="ds-screenshot-text"
                >CZML 协议 · 标准格式一键加载</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="ds-cta">
      <h2 class="ds-section-title">开始使用 Daisy Space</h2>
      <p class="ds-section-desc">
        在 Playground 中即时体验所有核心功能，查看源码并动手修改
      </p>
      <a
        class="ds-btn-primary"
        href="/playground/"
        >前往 Playground →</a
      >
    </section>
  </div>
</template>
