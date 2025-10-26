import { defineConfig } from "tsup"
export default defineConfig({
  entry: ["src/**/*.ts", "migrate.ts"],
  clean: true,
  format: "esm",
  outDir: "dist",
  outExtension() {
    return {
      js: `.js`,
    }
  },
})
