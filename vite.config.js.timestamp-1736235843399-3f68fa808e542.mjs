// vite.config.js
import terser from "file:///Users/ice/tatalock/aptos-tool/node_modules/.pnpm/@rollup+plugin-terser@0.4.4_rollup@4.30.0/node_modules/@rollup/plugin-terser/dist/es/index.js";
import { resolve } from "path";
import { defineConfig } from "file:///Users/ice/tatalock/aptos-tool/node_modules/.pnpm/vite@6.0.7_@types+node@22.10.5_jiti@2.4.2_terser@5.37.0/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/ice/tatalock/aptos-tool/node_modules/.pnpm/vite-plugin-dts@4.4.0_@types+node@22.10.5_rollup@4.30.0_typescript@5.7.2_vite@6.0.7_@types+no_2okeq4jm543qjmxa5yfdz5vmhu/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/ice/tatalock/aptos-tool";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: "index"
    },
    rollupOptions: {
      external: ["@aptos-labs/ts-sdk", "bignumber.js"]
    }
  },
  resolve: { alias: { src: resolve("src/") } },
  plugins: [
    dts({
      outDir: "dist/types"
    }),
    terser({
      format: {
        comments: false
      },
      compress: true
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvaWNlL3RhdGFsb2NrL2FwdG9zLXRvb2xcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9pY2UvdGF0YWxvY2svYXB0b3MtdG9vbC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvaWNlL3RhdGFsb2NrL2FwdG9zLXRvb2wvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgdGVyc2VyIGZyb20gXCJAcm9sbHVwL3BsdWdpbi10ZXJzZXJcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBkdHMgZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvaW5kZXgudHNcIiksXG4gICAgICBmb3JtYXRzOiBbXCJlc1wiLCBcImNqc1wiXSxcbiAgICAgIGZpbGVOYW1lOiBcImluZGV4XCIsXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1wiQGFwdG9zLWxhYnMvdHMtc2RrXCIsIFwiYmlnbnVtYmVyLmpzXCJdLFxuICAgIH0sXG4gIH0sXG4gIHJlc29sdmU6IHsgYWxpYXM6IHsgc3JjOiByZXNvbHZlKFwic3JjL1wiKSB9IH0sXG4gIHBsdWdpbnM6IFtcbiAgICBkdHMoe1xuICAgICAgb3V0RGlyOiBcImRpc3QvdHlwZXNcIixcbiAgICB9KSxcbiAgICB0ZXJzZXIoe1xuICAgICAgZm9ybWF0OiB7XG4gICAgICAgIGNvbW1lbnRzOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBjb21wcmVzczogdHJ1ZSxcbiAgICB9KSxcbiAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0USxPQUFPLFlBQVk7QUFDL1IsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUhoQixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLFNBQVMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxNQUNyQixVQUFVO0FBQUEsSUFDWjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLHNCQUFzQixjQUFjO0FBQUEsSUFDakQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTLEVBQUUsT0FBTyxFQUFFLEtBQUssUUFBUSxNQUFNLEVBQUUsRUFBRTtBQUFBLEVBQzNDLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLFFBQVE7QUFBQSxJQUNWLENBQUM7QUFBQSxJQUNELE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxRQUNOLFVBQVU7QUFBQSxNQUNaO0FBQUEsTUFDQSxVQUFVO0FBQUEsSUFDWixDQUFDO0FBQUEsRUFDSDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
