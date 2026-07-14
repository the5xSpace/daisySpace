import DefaultTheme from "vitepress/theme";
import HomePage from "./components/HomePage.vue";
import PricingPage from "./components/PricingPage.vue";
import "../../../src/css/custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("HomePage", HomePage);
    app.component("PricingPage", PricingPage);
  },
};
