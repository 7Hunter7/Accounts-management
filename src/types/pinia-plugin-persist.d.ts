import { PiniaPluginContext } from "pinia";
export interface PersistStrategy {
  key?: string;
  storage?: Storage;
  paths?: string[];
}
export interface PersistOptions {
  enabled: true;
  strategies?: PersistStrategy[];
}
declare type Store = PiniaPluginContext["store"];
declare module "pinia" {
  // Расширяем базовый интерфейс для опций defineStore, добавляя туда опцию persist
  interface DefineStoreOptionsBase<S, Store> {
    persist?: PersistOptions;
    // Позволяет TypeScript понимать, что мы можем использовать persist внутри defineStore.
  }
}
export declare const updateStorage: (
  strategy: PersistStrategy,
  store: Store
) => void;
declare const _default: ({ options, store }: PiniaPluginContext) => void;
export default _default;

// Предоставляем определения для модуля pinia-plugin-persist
declare module "pinia-plugin-persist" {
  import { PiniaPlugin } from "pinia";

  const persistStore: PiniaPlugin;
  export default persistStore;
}
