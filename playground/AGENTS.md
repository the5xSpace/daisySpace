# playground/ — Demo 运行环境

本目录是独立的 Svelte 5 + Vite 子项目，用于展示 SDK 各模块能力。

## 目录结构

playground/src/demos/ — 按模块分组的 demo 文件夹

| 模块 | 内容 |
|---|---|
| physicalWorld/ | 物理世界对象演示（卫星/飞行器/传感器/航线等） |
| analysis/ | 覆盖分析引擎演示 |
| features/ | 可视化 Feature 组件演示 |
| core/ | 引擎/事件/时间调度核心演示 |
| camera/ | 相机系统演示 |
| control/ | 控制面板演示 |
| czml/ | CZML 数据导入演示 |
| geoLayer/ | 地理图层演示 |
| materials/ | 材质特效演示 |
| showcases/ | 综合场景演示 |
| widgets/ | UI 控件演示 |

## 开发命令

| 命令 | 说明 |
|---|---|
| npm run dev:playground | 启动开发服务器（端口由 Vite 自动选择） |
| npm run build | 完整构建（含 playground） |

## 添加新 Demo

1. 在对应模块目录下创建 MyDemo.svelte
2. 在 playground/src/demos/{module}/index.ts 中注册
3. 如有新模块需在 playground/src/demos/registry.ts 中添加聚合
