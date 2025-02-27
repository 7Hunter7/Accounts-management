// Plugins
import vuetify from "./vuetify";
import pinia from "../stores";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persist";

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  pinia.use(piniaPluginPersistedstate);
  app.use(vuetify).use(pinia);
}
