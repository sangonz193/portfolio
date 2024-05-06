export {};

declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_AS_OS: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
