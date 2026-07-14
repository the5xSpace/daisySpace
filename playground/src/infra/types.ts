/**
 * Playground 公共类型定义
 */

import type * as Daisy from "daisy-space-sdk";

/** 示例难度等级 */
export type DemoDifficulty = "basic" | "intermediate" | "advanced";

/** 场景预设 ID */
export type PresetId =
    | "earth-basic"
    | "earth-timeline"
    | "moon"
    | "mars";

/** Demo 运行时 UI 配置 */
export interface DemoRuntimeUi {
    controlPanel?: boolean;
    timelineLabel?: boolean;
    simulationTimeWidget?: boolean;
}

/** 示例定义 */
export interface DemoDefinition {
    /** 唯一 ID，格式: module-name */
    id: string;
    /** 显示标题 */
    title: string;
    /** 副标题/简述 */
    subtitle: string;
    /** 所属 SDK 模块名 */
    module: string;
    /** 标签（用于搜索/过滤） */
    tags: string[];
    /** 难度等级 */
    difficulty: DemoDifficulty;
    /** 问题描述，用于 UI 快速理解这个 demo 在解决什么 */
    problem?: string;
    /** 依赖资源说明 */
    assets?: string[];
    /** 运行时 UI 配置 */
    runtimeUi?: DemoRuntimeUi;
    /** 场景预设 ID */
    preset?: PresetId;
    /** 加载示例代码（返回原始字符串），用于代码展示 */
    code: () => Promise<string>;
    /** 可选：加载 Svelte 组件（用于组件化 demo） */
    component?: () => Promise<{ default: any }>;
}

/** 模块分组定义 */
export interface DemoModuleGroup {
    /** 模块 ID */
    id: string;
    /** 显示名称 */
    label: string;
    /** 图标（可选） */
    icon?: string;
    /** 排序权重 */
    order: number;
}

/** Demo 运行上下文 */
export interface DemoRunContext {
    /** SDK Engine 实例 */
    engine: Daisy.Engine;
    /** 容器 DOM */
    container: HTMLElement;
    /** 日志输出 */
    log: (msg: string) => void;
    /** 统一 cleanup 注册器 */
    registerCleanup: (fn: DemoCleanup) => void;
    /** Daisy SDK 命名空间 */
    Daisy: typeof Daisy;
}

/** Demo 清理函数 */
export type DemoCleanup = () => void | Promise<void>;

/** Demo 执行函数签名 */
export type DemoExecuteFn = (ctx: DemoRunContext) => Promise<DemoCleanup | void> | DemoCleanup | void;
