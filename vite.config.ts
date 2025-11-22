// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // <-- 引入 React 插件！

export default defineConfig({
  // 关键：设置部署路径为您的 GitHub 仓库名
  base: '/dreamweaver-website/', 
  
  // 关键：告诉 Vite 这是 React 项目
  plugins: [react()], 
});