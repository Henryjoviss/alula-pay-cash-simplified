import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.alulapay.app",
  appName: "Alula Pay",
  webDir: "dist",
  server: {
    url: "https://tanstack-start-app.oyamakhumalo.workers.dev",
    cleartext: false,
  },
};

export default config;
