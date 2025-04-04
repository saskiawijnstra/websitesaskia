import { createApp } from "vue";
import "./scss/style.scss";
import App from "./App.vue";
import { createI18n } from "vue-i18n";
import localeDataEn from "./localization/en/en.json";
import localeDataNl from "./localization/nl/nl.json";
import { router } from "./router/router";
import { createPinia } from "pinia";

var navigatorLanguage = window.navigator.language;
let defaultLanguage = "en";
if (navigatorLanguage === "nl") {
  defaultLanguage = "nl";
}

const i18n = createI18n({
  // something vue-i18n options here ...
  fallbackLocale: "en",
  locale: defaultLanguage,
  messages: {
    en: localeDataEn,
    nl: localeDataNl,
  },
});

const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(pinia);
app.mount("#app");
