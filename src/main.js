import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";
import router from "./route";

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import axiosInstance from "./plugins/axios.js";
import VueAxios from "vue-axios";

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    }
})

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.use(VueAxios, axiosInstance);
app.provide('axios', app.config.globalProperties.axios)
app.mount("#app");
