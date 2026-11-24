import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vitest/config";

const here = fileURLToPath(new URL("./", import.meta.url));
const kit = fileURLToPath(new URL("../../packages/paper-kit/", import.meta.url));

// The kit has no node_modules of its own: a bare import inside it resolves from this folder's.
const peersFromHere: Plugin = {
  name: "kit-peers-from-tests",
  enforce: "pre",
  async resolveId(source, importer) {
    if (!importer?.startsWith(kit) || source.startsWith(".") || source.startsWith("/")) return null;
    return this.resolve(source, `${here}setup.ts`, { skipSelf: true });
  },
};

export default defineConfig({
  plugins: [peersFromHere],
  server: { fs: { allow: [here, kit] } },
  test: {
    include: ["src/**/*.test.tsx"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./setup.ts"],
  },
});
