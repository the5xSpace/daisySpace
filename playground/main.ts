import App from "./src/shell/App.svelte";
import "./src/shell/tokens.css";
import { mount } from "svelte";
import { Resource } from "daisy-space-sdk";

// 需要 Cesium Ion 地形/影像时在此设置真实 token，留空即全部阻断
// Resource.setCesiumIonToken("your-real-cesium-ion-token");

mount(App, {
    target: document.getElementById("app")!,
});
