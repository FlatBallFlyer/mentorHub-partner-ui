import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import {usePartnersStore} from "./stores";

// Vuetify
import "@mdi/font/css/materialdesignicons.css"
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives
});

app.use(router);
app.use(vuetify);
app.use(createPinia());

const store = usePartnersStore();
store.initializeStore();

app.mount("#app")
