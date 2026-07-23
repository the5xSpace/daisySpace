import type { DefaultTheme } from "vitepress";

type Locale = "zh" | "en";
type Label = { zh: string; en: string };
export type DaisyThemeConfig = DefaultTheme.Config & { englishGuideReady: boolean };
type SearchOptions = NonNullable<DefaultTheme.Config["search"]>["options"];

const label = (zh: string, en: string): Label => ({ zh, en });

const guideSections = [
  {
    text: label("入门", "Getting Started"),
    items: [
      [label("快速开始", "Quick Start"), "/guide/"],
      [label("安装", "Installation"), "/guide/installation"],
      [label("内置静态资源", "Built-in Assets"), "/guide/builtin-assets"],
    ],
  },
  {
    text: label("核心概念", "Core Concepts"),
    items: [
      [label("Engine 引擎", "Engine"), "/guide/engine"],
      [label("Entity 实体", "Entity"), "/guide/entity"],
      [label("Feature 可视化组件", "Feature Components"), "/guide/feature"],
      [label("事件系统", "Event System"), "/guide/event-system"],
      [label("时间调度", "Time Scheduling"), "/guide/time-schedule"],
      [label("视距策略", "View Distance"), "/guide/view-distance"],
    ],
  },
  {
    text: label("物理世界", "Physical World"),
    items: [
      [label("卫星与轨道力学", "Satellites and Orbital Mechanics"), "/guide/satellite"],
      [label("传感器", "Sensors"), "/guide/sensor"],
      [label("链路通信", "Communication Links"), "/guide/link"],
      [label("飞行器与航路", "Aircraft and Routes"), "/guide/route-aircraft"],
      [label("火箭与推进", "Rockets and Propulsion"), "/guide/rocket"],
      [label("地面站", "Ground Stations"), "/guide/ground-station"],
      [label("星座容器", "Constellations"), "/guide/constellation"],
      [label("天体系统", "Celestial Bodies"), "/guide/celestial-bodies"],
    ],
  },
  {
    text: label("Feature 组件", "Feature Components"),
    items: [
      [label("标记系统", "Markers and Labels"), "/guide/markers-labels"],
      [label("弹出框", "Popovers"), "/guide/popover"],
      [label("线性图形", "Line Features"), "/guide/line-features"],
      [label("面状图形", "Area Features"), "/guide/area-features"],
      [label("立体几何", "Solid Geometry"), "/guide/solid-geometry"],
      [label("自定义几何", "Free Geometry"), "/guide/free-geometry"],
      [label("椭圆锥体", "Elliptical Cones"), "/guide/elliptical-cone"],
      [label("着色器多边形", "Shader Polygons"), "/guide/shader-polygon"],
      [label("地面覆盖", "Ground Coverage"), "/guide/coverage-features"],
      [label("3D 模型与 Tileset", "3D Models and Tilesets"), "/guide/model-tileset"],
      [label("轨迹尾迹", "Trail Paths"), "/guide/trail-path"],
      [label("粒子系统", "Particle Systems"), "/guide/particle-system"],
      [label("碰撞检测", "Collision Detection"), "/guide/collision-detection"],
    ],
  },
  {
    text: label("相机·图层·材质", "Camera, Layers, and Materials"),
    items: [
      [label("相机系统", "Camera System"), "/guide/camera"],
      [label("地理图层", "Geographic Layers"), "/guide/layers"],
      [label("材质系统", "Material System"), "/guide/materials"],
      [label("自定义 Shader 与 Material", "Custom Shaders and Materials"), "/guide/custom-shader-material"],
    ],
  },
  {
    text: label("控件", "Widgets"),
    items: [
      [label("控制面板", "Control Panel"), "/guide/widgets-control-panel"],
      [label("仿真时间与帧率", "Simulation Time and FPS"), "/guide/widgets-display"],
      [label("时间轴", "Timeline"), "/guide/widgets-timeline"],
      [label("任务看板", "Task Boards"), "/guide/widgets-task"],
      [label("天体标记", "Celestial Markers"), "/guide/widgets-celestial-marker"],
      [label("辅助图层", "Reference Layers"), "/guide/layers-reference"],
    ],
  },
  {
    text: label("数据与格式", "Data and Formats"),
    items: [
      [label("CZML 导入", "CZML Import"), "/guide/czml"],
      [label("时间格式化", "Time Formatting"), "/guide/time-format"],
    ],
  },
  {
    text: label("分析工具", "Analysis"),
    items: [
      [label("波束投影", "Beam Projection"), "/guide/beam-projector"],
      [label("星座覆盖分析", "Constellation Coverage"), "/guide/constellation-coverage"],
      [label("GPU 通用计算", "GPU Computing"), "/guide/gpu-compute"],
    ],
  },
  {
    text: label("进阶", "Advanced"),
    items: [[label("性能优化", "Performance"), "/guide/performance"]],
  },
] as const;

function route(locale: Locale, value: string) {
  return locale === "en" ? `/en${value}` : value;
}

function routeFile(value: string) {
  const relative = value.replace(/^\//, "");
  return relative.endsWith("/") ? `${relative}index.md` : `${relative}.md`;
}

function available(locale: Locale, value: string, englishFiles?: ReadonlySet<string>) {
  return locale === "zh" || Boolean(englishFiles?.has(routeFile(value)));
}

function translatedSidebar(
  locale: Locale,
  englishFiles?: ReadonlySet<string>,
): DefaultTheme.SidebarItem[] {
  return guideSections
    .map((section) => ({
      text: section.text[locale],
      items: section.items
        .filter(([, link]) => available(locale, link, englishFiles))
        .map(([text, link]) => ({
          text: text[locale],
          link: route(locale, link),
        })),
    }))
    .filter((section) => section.items.length > 0);
}

export function createThemeConfig(
  locale: Locale,
  englishFiles?: ReadonlySet<string>,
  searchOptions?: SearchOptions,
): DaisyThemeConfig {
  const en = locale === "en";
  const guide = route(locale, "/guide/");
  const api = route(locale, "/api/");
  const guideReady = available(locale, "/guide/", englishFiles);
  const apiReady = en ? true : available(locale, "/api/", englishFiles);
  const pricingReady = available(locale, "/pricing/", englishFiles);
  return {
    englishGuideReady: !en || guideReady,
    i18nRouting: false,
    siteTitle: "Daisy Space",
    logo: "/logo/64x64@2x.png",
    logoLink: en ? "/en/" : "/",
    nav: [
      { text: en ? "Home" : "首页", link: en ? "/en/" : "/" },
      ...(guideReady ? [{ text: en ? "Guide" : "指南", link: guide, activeMatch: `^${guide}` }] : []),
      ...(apiReady ? [{ text: "API", link: api, activeMatch: `^${api}` }] : []),
      { text: "Playground", link: "/playground/", target: "_blank" },
      {
        text: en ? "Releases" : "版本更新记录",
        link: "https://github.com/the5xSpace/daisySpace/releases",
      },
      ...(pricingReady ? [{ text: en ? "Pricing" : "定价", link: route(locale, "/pricing/") }] : []),
      { text: "GitHub", link: "https://github.com/the5xSpace/daisySpace" },
    ],
    sidebar: {
      ...(guideReady ? { [guide]: translatedSidebar(locale, englishFiles) } : {}),
      ...(apiReady ? { [api]: [
        { text: en ? "Overview" : "概览", link: api },
        { text: en ? "Namespaces" : "命名空间 (Namespaces)", link: `${api}modules/` },
        { text: "Classes", link: `${api}classes/` },
        { text: "Interfaces", link: `${api}interfaces/` },
        { text: "Type Aliases", link: `${api}types/` },
        { text: "Enumerations", link: `${api}enums/` },
        { text: "Variables", link: `${api}variables/` },
        { text: "Functions", link: `${api}functions/` },
      ].filter((item) => available(locale, item.link.replace(/^\/en/, ""), englishFiles)) } : {}),
    },
    search: {
      provider: "local",
      options: searchOptions,
    },
    socialLinks: [{ icon: "github", link: "https://github.com/the5xSpace/daisySpace" }],
    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright © ${new Date().getFullYear()} Daisy Space`,
    },
    outline: { level: [2, 3], label: en ? "On this page" : "页面导航" },
    docFooter: en ? { prev: "Previous", next: "Next" } : { prev: "上一页", next: "下一页" },
    darkModeSwitchLabel: en ? "Appearance" : "主题",
    sidebarMenuLabel: en ? "Menu" : "菜单",
    returnToTopLabel: en ? "Return to top" : "回到顶部",
    langMenuLabel: en ? "Change language" : "切换语言",
  };
}
