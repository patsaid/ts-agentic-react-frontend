
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // add other env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}