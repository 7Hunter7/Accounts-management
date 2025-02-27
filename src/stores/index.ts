import { createPinia } from "pinia";
import { persistStore } from "pinia-plugin-persist";

const pinia = createPinia();
pinia.use(persistStore);

export default pinia;
