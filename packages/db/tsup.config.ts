import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // 1. Entry file to read
  format: ["cjs", "esm"], // 2. Output both CJS (for NestJS) and ESM (for Next.js)
  dts: true, // 3. Emit .d.ts type definitions for IDE autocompletion
  clean: true, // 4. Wipe dist/ before each build
});
