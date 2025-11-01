/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  // agrega aquí otras variables que uses
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
