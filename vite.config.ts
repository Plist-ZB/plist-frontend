import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import fs from "node:fs";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "plist-fe-env", "");

  // Firebase Config용 json 파일 생성
  function generateEnvJsonPlugin() {
    return {
      name: "generate-firebase-config-json",
      // closeBundle 훅은 빌드가 완료된 후 실행됩니다
      closeBundle() {
        // 원하는 환경 변수만 선택
        const firebaseConfig = {
          apiKey: env.VITE_FIREBASE_API_KEY,
          authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
          projectId: env.VITE_FIREBASE_PROJECT_ID,
          storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
          appId: env.VITE_FIREBASE_APP_ID,
        };

        // dist 폴더에 JSON 파일 생성 (빌드 결과물 폴더)
        const outputPath = path.resolve(__dirname, "dist/firebase-config.json");
        fs.writeFileSync(outputPath, JSON.stringify(firebaseConfig, null, 2));
        console.log(`${"\x1b[35m"}✓ Generated firebase-config.json${"\x1b[32m"}`);
      },
    };
  }

  return {
    plugins: [
      react(),
      svgr({
        // svgr options: https://react-svgr.com/docs/options/
        svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
        include: "**/*.svg",
      }),
      generateEnvJsonPlugin(),
    ],
    resolve: {
      alias: [
        { find: "public", replacement: "/public" },
        { find: "@", replacement: "/src" },
      ],
    },
    server: {
      port: 3000,
    },
    envDir: "plist-fe-env",
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  };
});
