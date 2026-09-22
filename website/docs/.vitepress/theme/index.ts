import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import Layout from "./Layout.vue";
import HomePage from "./components/HomePage.vue";
import PricingPage from "./components/PricingPage.vue";
import "../../../src/css/custom.css";

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component("HomePage", HomePage);
    app.component("PricingPage", PricingPage);
  },
} satisfies Theme;
