import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";
import path from "path";

export default defineConfig({
  plugins: [nitro()],
  vite: {
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
});
