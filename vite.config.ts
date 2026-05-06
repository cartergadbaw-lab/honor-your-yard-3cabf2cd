import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";
import { loadEnv } from "vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode ?? "development", process.cwd(), "");
  const serverEnv: Record<string, string> = {};
  for (const key of [
    "SUPABASE_URL",
    "SUPABASE_PUBLISHABLE_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "LOVABLE_API_KEY",
    "LOVABLE_SEND_URL",
  ]) {
    if (env[key]) serverEnv[`process.env.${key}`] = JSON.stringify(env[key]);
  }
  return {
    vite: {
      plugins: [nitro()],
      define: serverEnv,
      resolve: {
        alias: {
          "entities/lib/decode.js": path.resolve(
            process.cwd(),
            "node_modules/entities/lib/decode.js"
          ),
          "entities/lib/encode.js": path.resolve(
            process.cwd(),
            "node_modules/entities/lib/encode.js"
          ),
          entities: path.resolve(process.cwd(), "node_modules/entities"),
        },
      },
    },
  };
});
