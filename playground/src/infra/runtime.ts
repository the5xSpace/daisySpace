/**
 * SDK 运行时封装 — Engine 创建/销毁/BaseUrl 设置
 */
import * as Daisy from "daisy-space-sdk";
import { initDaisyErrorInterceptor } from "daisy-space-sdk";

export { Daisy };
export type { DemoCleanup } from "./types";

// ✅ 全局初始化标志，避免重复调用
let _sdkInitialized = false;

/** 初始化 SDK BaseUrl（必须在 Engine.create 之前调用，但只需一次） */
export function initSdkBaseUrl(): void {
    if (_sdkInitialized) return;  // ✅ 只初始化一次

    const baseUrl = (import.meta as any).env?.BASE_URL;
    if (typeof baseUrl === "string" && baseUrl.trim()) {
        Daisy.BuildModuleUrl.setBaseUrl(baseUrl);
    }
    Daisy.Engine.beforeInit();
    initDaisyErrorInterceptor();    // ✅ 初始化 AOP 全局异常拦截器
    _sdkInitialized = true;
}

/** 创建 Engine 实例 */
export async function createEngine(
    container: HTMLElement | string,
    options?: Daisy.DaisySpaceCreateOptions,
): Promise<Daisy.Engine> {
    initSdkBaseUrl();
    const engine = await Daisy.Engine.create(container, options);
    return engine;
}

/** 安全销毁 Engine （改进版）*/
export async function destroyEngine(engine: Daisy.Engine | null): Promise<void> {
    if (!engine) return;

    try {
        // ✅ 标记为已销毁
        (engine as any)._destroyed = true;

        // ✅ 同步调用销毁
        engine.destroy();

        // ✅ 给垃圾回收一些时间，让浏览器清理 WebGL 资源
        await new Promise(resolve => setTimeout(resolve, 50));

    } catch (e) {
        console.warn("[Playground] Engine destroy error:", e);
    }
}
