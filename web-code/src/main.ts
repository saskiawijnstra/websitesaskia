import { createApp } from 'vue'
import './scss/style.scss'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import localeDataEn from './localization/en.json';
import localeDataNl from './localization/nl.json'


const i18n = createI18n({
    // something vue-i18n options here ...
    messages: {
        en: localeDataEn,
        nl: localeDataNl
    }
  })

const app = createApp(App);

app.use(i18n);
app.mount('#app')


