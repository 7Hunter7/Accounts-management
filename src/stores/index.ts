import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persist";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
