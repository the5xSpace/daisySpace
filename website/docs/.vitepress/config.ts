import {defineConfig} from "vitepress";
import {fileURLToPath, URL} from "node:url";
import { autoApiLink } from "./auto-api-link";

export default defineConfig({
  title: "Daisy Space SDK",
  description:
    "航天可视化仿真 SDK — 卫星轨道传播、传感器波束覆盖、链路通信、天体系统",

  cleanUrls: true,
  lang: "zh-CN",
  lastUpdated: true,
  ignoreDeadLinks: true,

  head: [
    ["meta", {name: "theme-color", content: "#8b5cf6"}],
    ["link", {rel: "icon", type: "image/png", href: "/daisy-space-favicon.png"}],
    ["link", {rel: "preconnect", href: "https://fonts.googleapis.com"}],
    [
      "link",
      {rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: ""},
    ],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
        rel: "stylesheet",
      },
    ],
  ],

  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("../", import.meta.url)),
      },
    },
    server: process.env.DAISY_PLAYGROUND_PROXY === "true"
      ? {
          proxy: {
            "/playground": {
              target: "http://127.0.0.1:5174",
              changeOrigin: true,
              ws: true,
            },
          },
        }
      : undefined,
  },

  markdown: {
    config: (md) => {
      md.use(autoApiLink);
    },
  },

  themeConfig: {
    siteTitle: "Daisy Space",

    logo: "/logo/64x64@2x.png",

    nav: [
      {text: "首页", link: "/", activeMatch: "^/$"},
      {text: "指南", link: "/guide/", activeMatch: "^/guide/"},
      {text: "API", link: "/api/", activeMatch: "^/api/"},
      {
        text: "演示沙箱",
        link: "/playground/",
        target: "_blank",
      },
      {
        text: "版本更新记录",
        link: "https://github.com/the5xSpace/daisySpace/releases",
      },
      {text: "定价", link: "/pricing/", activeMatch: "^/pricing/"},
      {
        text: "GitHub",
        link: "https://github.com/the5xSpace/daisySpace",
      },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "入门",
          items: [
            {text: "快速开始", link: "/guide/"},
            {text: "安装", link: "/guide/installation"},
          ],
        },
        {
          text: "核心概念",
          items: [
            {text: "Engine 引擎", link: "/guide/engine"},
            {text: "Entity 实体", link: "/guide/entity"},
            {text: "Feature 可视化组件", link: "/guide/feature"},
            {text: "事件系统", link: "/guide/event-system"},
            {text: "时间调度", link: "/guide/time-schedule"},
            {text: "视距策略", link: "/guide/view-distance"},
          ],
        },
        {
          text: "物理世界",
          items: [
            {text: "卫星与轨道力学", link: "/guide/satellite"},
            {text: "传感器", link: "/guide/sensor"},
            {text: "链路通信", link: "/guide/link"},
            {text: "飞行器与航路", link: "/guide/route-aircraft"},
            {text: "火箭与推进", link: "/guide/rocket"},
            {text: "地面站", link: "/guide/ground-station"},
            {text: "星座容器", link: "/guide/constellation"},
            {text: "天体系统 🔬", link: "/guide/celestial-bodies"},
          ],
        },
        {
          text: "Feature 组件",
          items: [
            {text: "标记系统", link: "/guide/markers-labels"},
            {text: "弹出框", link: "/guide/popover"},
            {text: "线性图形", link: "/guide/line-features"},
            {text: "面状图形", link: "/guide/area-features"},
            {text: "立体几何", link: "/guide/solid-geometry"},
            {text: "自由几何", link: "/guide/free-geometry"},
            {text: "椭圆锥体", link: "/guide/elliptical-cone"},
            {text: "着色器多边形", link: "/guide/shader-polygon"},
            {text: "地面覆盖", link: "/guide/coverage-features"},
            {text: "3D 模型与 Tileset", link: "/guide/model-tileset"},
            {text: "轨迹尾迹", link: "/guide/trail-path"},
            {text: "粒子系统", link: "/guide/particle-system"},
            {text: "碰撞检测", link: "/guide/collision-detection"},
          ],
        },
        {
          text: "相机·图层·材质",
          items: [
            {text: "相机系统", link: "/guide/camera"},
            {text: "地理图层", link: "/guide/layers"},
            {text: "材质系统", link: "/guide/materials"},
            {text: "自定义 Shader 与 Material", link: "/guide/custom-shader-material"},
          ],
        },
        {
          text: "控件",
          items: [
            {text: "控制面板", link: "/guide/widgets-control-panel"},
            {text: "仿真时间与帧率", link: "/guide/widgets-display"},
            {text: "时间轴", link: "/guide/widgets-timeline"},
            {text: "任务看板", link: "/guide/widgets-task"},
            {text: "天体标记", link: "/guide/widgets-celestial-marker"},
            {text: "辅助图层", link: "/guide/layers-reference"},
          ],
        },
        {
          text: "数据与格式",
          items: [
            {text: "CZML 导入", link: "/guide/czml"},
            {text: "时间格式化", link: "/guide/time-format"},
          ],
        },
        {
          text: "分析工具",
          items: [
            {text: "波束投影", link: "/guide/beam-projector"},
            {text: "星座覆盖分析", link: "/guide/constellation-coverage"},
            {text: "GPU 通用计算", link: "/guide/gpu-compute"},
          ],
        },
        {
          text: "进阶",
          items: [
            {text: "性能优化", link: "/guide/performance"},
          ],
        },
      ],
      "/api/": [
        {text: "概览", link: "/api/"},
        {text: "命名空间 (Namespaces)", link: "/api/modules/"},
        {text: "Classes", link: "/api/classes/"},
        {text: "Interfaces", link: "/api/interfaces/"},
        {text: "Type Aliases", link: "/api/types/"},
        {text: "Enumerations", link: "/api/enums/"},
        {text: "Variables", link: "/api/variables/"},
        {text: "Functions", link: "/api/functions/"},
      ],
    },

    search: {
      provider: "local",
      options: {
        miniSearch: {
          options: {
            tokenize: (text: string) =>
              (text.toLowerCase().match(/[\u4e00-\u9fff]|[\w]+/g) || []) as string[],
            processTerm: (term: string) =>
              (term.match(/[\u4e00-\u9fff]|[\w]+/g) || []) as string[],
          },
        },
      },
    },

    socialLinks: [{icon: "github", link: "https://github.com/the5xSpace/daisySpace"}],

    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright © ${new Date().getFullYear()} Daisy Space`,
    },

    outline: {level: [2, 3], label: "页面导航"},
    docFooter: {prev: "上一页", next: "下一页"},
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "回到顶部",
  },
});
