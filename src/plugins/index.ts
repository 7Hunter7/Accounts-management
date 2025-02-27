// Plugins
import vuetify from "./vuetify";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persist";

// Types
import type { App } from "vue";

// Логика регистрации плагинов
export function registerPlugins(app: App) {
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  app.use(vuetify).use(pinia);
}
