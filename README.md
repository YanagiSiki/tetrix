# TETRIX 3D — Cyberpunk 3D Tetris Game 🎮

![Three.js](https://img.shields.io/badge/Three.js-r160-black?style=flat-square&logo=three.js)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

一個基於 **JavaScript (ES Modules)**、**HTML5** 與 **Three.js** 開發的高質感 3D 俄羅斯方塊遊戲。具備賽博朋克毛玻璃 UI 介面、Web Audio 原生音效合成、3D 層消除粒子特效與開發者除錯模式，支援一鍵部署至 **Vercel**。

---

## 🌟 遊戲特色 (Features)

- **3D 立體透明玻璃井舞台**：基於 Three.js 打造，配備動態 SpotLight 聚光燈陰影與空間層引導網格。
- **經典 7 種 3D 方塊 (Tetrominoes)**：金屬發光質感方塊，支援 X/Y/Z 空間多軸旋轉、平移與 Ghost Piece 下落虛影。
- **全層 3D 消除與粒子爆發**：當單一水平面 (6×6=36 格) 完全填滿時觸發立體層消除與 3D 粒子爆發特效。
- **Web Audio 原生音效引擎**：無需載入外部音訊檔案，純程式碼動態合成移動、旋轉、下落與消除音效。
- **賽博朋克毛玻璃 HUD 介面**：即時顯示分數、最高分 (Local Storage)、Hold 方塊預覽、Next 方塊預覽與行動裝置觸控面板。
- **開發者 Debug 機制**：鍵盤快捷鍵切換 3D Wireframe 網格模式，全域控制台除錯 API 與即時 FPS 幀率監控。

---

## 🛠️ 技術棧 (Tech Stack)

| 領域 | 使用技術 |
|---|---|
| **核心語言 (Core)** | Vanilla JavaScript (ES6+ Modules), HTML5 |
| **3D 渲染 (Graphics)** | [Three.js](https://threejs.org/) (WebGL Renderer, OrbitControls, PCFSoftShadowMap) |
| **視覺樣式 (Styling)** | Vanilla CSS3 (Glassmorphic Design, Custom CSS Variables, Responsive Grid) |
| **音效 (Audio)** | Web Audio API (`AudioContext`, `OscillatorNode`, `GainNode`) |
| **開發工具 (Build Tool)** | [Vite 5](https://vitejs.dev/) (Rapid HMR & ES Module Bundling) |
| **託管與部署 (Deployment)** | [Vercel](https://vercel.com/) (Zero-Config Static Hosting) |

---

## 🚀 本地開發與啟動流程 (Local Setup & Launch)

### 前置需求
- 已安裝 **Node.js** (建議 v18 或更新版本)
- **npm** 或 **pnpm** / **yarn**

### 1. 安裝套件
在專案根目錄執行：
```bash
npm install
```

### 2. 啟動本地開發伺服器 (Development Server)
```bash
npm run dev
```
伺服器已自動綁定網卡介面 (`0.0.0.0`) 與授權主標頭，可在瀏覽器開啟：
- **自訂網域／主機**：`http://yanagi-arm-jp:3000`
- **本地預設**：`http://localhost:3000`

### 3. 測試生產環境打包 (Production Build Preview)
```bash
npm run build
npm run preview
```
打包產物將輸出至 `dist/` 目錄。

---

## 🕹️ 遊戲操作說明 (Controls Guide)

| 操作類型 | 按鍵 / 動作 | 說明 |
|---|---|---|
| **XY 平移** | <kbd>W</kbd> / <kbd>S</kbd> / <kbd>A</kbd> / <kbd>D</kbd> 或 <kbd>←</kbd> <kbd>→</kbd> <kbd>↑</kbd> <kbd>↓</kbd> | 前後左右移動方塊 |
| **Z 軸平移** | <kbd>Q</kbd> / <kbd>E</kbd> | 深淺方向移動方塊 |
| **3D 旋轉** | <kbd>J</kbd> (Rot X) / <kbd>K</kbd> (Rot Y) / <kbd>L</kbd> (Rot Z) | 沿著 3D 空間 X / Y / Z 軸旋轉方塊 |
| **瞬降 (Hard Drop)** | <kbd>Space</kbd> (空白鍵) | 將當前目標方塊瞬間沉底並鎖定 |
| **暫存 (Hold)** | <kbd>Shift</kbd> 或 <kbd>C</kbd> | 暫存或替換目前方塊 |
| **視角旋轉** | 按住 <kbd>滑鼠右鍵</kbd> 或 <kbd>左鍵拖曳</kbd> | 360 度旋轉與縮放 3D 攝影機視角 |
| **功能切換** | <kbd>P</kbd> (Pause) / <kbd>R</kbd> (Reset View) / <kbd>M</kbd> (Mute) | 暫停遊戲 / 重置視角 / 音效開關 |

---

## 🛠️ 如何進行 Debug (Debugging Guide)

專案提供兩種便利的除錯維護機制：

### 1. 視覺化 Wireframe 模式 (鍵盤快捷鍵 <kbd>D</kbd>)
- 在遊戲進行中按下鍵盤 <kbd>D</kbd> 鍵，或點擊左側面板的 `🛠️ Wireframe` 按鈕。
- Three.js 渲染器將立即切換方塊為線框模式，方便檢視方塊在 3D 井內部的對齊與幾何結構。
- 左下角將顯示 `FPS` 幀率與 `DEBUG` 狀態。

### 2. 瀏覽器 DevTools 控制台 API (`window.TETRIS_DEBUG`)
在 Chrome / Firefox / Safari 開啟 F12 開發者工具 Console 輸入以下指令：

```javascript
// 切換 3D 線框除錯模式
TETRIS_DEBUG.toggleWireframe();

// 獲取當前遊戲核心狀態 (分數, 等級, 消除層數, 當前方塊)
TETRIS_DEBUG.getState();

// 手動加分測試
TETRIS_DEBUG.addScore(5000);
```

---

## ☁️ 如何部署到 Vercel (Vercel Deployment)

本專案已包含專用的 `vercel.json` 靜態部署設定。

### 方法 A：連結 GitHub 自動部署 (推薦)
1. 將此專案 Push 至您的 GitHub / GitLab 儲存庫。
2. 登入 [Vercel Dashboard](https://vercel.com/dashboard) 並點擊 **"Add New"** -> **"Project"**。
3. 選擇您的 Tetrix 儲存庫，Framework Preset 選擇 **Vite**。
4. 點擊 **Deploy** 即可完成自動 CI/CD 上線。

### 方法 B：使用 Vercel CLI 本地一鍵部署
1. 全域安裝 Vercel CLI：
   ```bash
   npm i -g vercel
   ```
2. 在專案根目錄執行部署命令：
   ```bash
   vercel --prod
   ```
3. 遵循 CLI 提示輸入即可獲得正式生產網址。

---

## 📁 專案架構 (Project Structure)

```
tetrix/
├── src/
│   ├── main.js        # 應用程式入口、事件綁定與 Game Loop 循環
│   ├── renderer.js    # Three.js 3D 舞台渲染器、燈光、玻璃井與粒子引擎
│   ├── engine.js      # 3D 俄羅斯方塊核心物理矩陣、旋轉與層消除演算法
│   ├── audio.js       # Web Audio API 音效動態合成器
│   ├── ui.js          # 毛玻璃 HUD 介面、2D 方塊預覽與彈出視窗
│   └── constants.js   # 3D 網格尺寸、7 種方塊定義與得分計分表
├── index.html         # 頁面主結構與 UI Overlay
├── style.css          # 賽博朋克毛玻璃視覺 CSS 系統
├── vercel.json        # Vercel 靜態服務部署組態
├── vite.config.js     # Vite 構建選項
└── package.json       # 專案依賴與腳本定義
```

---

## 📄 License

MIT License © 2026 Tetrix 3D.
