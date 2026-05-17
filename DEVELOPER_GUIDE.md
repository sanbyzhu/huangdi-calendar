# 古历法·时空同步生活系统 (Huangdi Calendar)
**详细使用与开发说明文档**

---

## 1. 项目简介与愿景

**古历法·时空同步生活系统** 是一款跨平台的历法查询与生活记录工具，旨在成为承载中国八千年时间哲学（从伏羲太阳历到黄帝纪元）与中美洲星系时间法则（玛雅历）的桥梁。
区别于机械式的现代时钟，本系统倡导“在自然农耕与时空同步中生活”，通过多维度时间切片（天历、黄帝纪元历、汉历、西历、玛雅历），帮助使用者重新感受宇宙规律的律动。

本工程起始于 Web 技术的 React SPA 项目，随后依托 Ionic Capacitor 技术栈零成本重构为了原生的 Android 手机应用程序（APK）。

---

## 2. 技术栈架构 (Tech Stack)

*   **前端核心框架**：React 19 + TypeScript
*   **构建工具**：Vite（追求极速冷启动与热更新）
*   **样式方案**：Tailwind CSS v4 (原子化 CSS) + framer-motion (流畅的物理动画交互)
*   **状态管理**：Zustand (负责全局轻量状态流转，如笔记与设置)
*   **天文与日历核心引擎**：
    *   `lunar-javascript`: 负责处理繁杂的农历、干支纪年、节气计算。
    *   `date-fns`: 负责处理西历日期边界、增减等常规运算。
    *   自定义 `calendarCore.ts`: 高度整合模块，推算「圣太一天历」、「黄帝纪元历」及初级版「玛雅历法」。
*   **移动端混合打包**：Capacitor 核心库 (`@capacitor/core`, `@capacitor/android`)

---

## 3. 核心目录结构 (Project Structure)

```text
huangdi-calendar/
├── android/                 # Capacitor 生成的原生 Android 工程目录 (通过 Android Studio 打开)
├── public/                  # 静态公共资源文件
│   └── data/
│       └── history_today.json # "历史上的今天" 本地化数据源
├── src/
│   ├── components/          # 核心 UI 组件池
│   │   ├── AboutPage.tsx    # "说明" 界面，阐述理念
│   │   ├── CalendarCard.tsx # 首页四大历法的毛玻璃显示卡片
│   │   ├── CalendarView.tsx # 核心首页视图 (包含日期切换、下方的笔记流)
│   │   ├── ChronologyConverter.tsx # 年代转换标尺组件
│   │   ├── FullCalendarModal.tsx   # 各大历法的全屏月历查阅与选年弹窗
│   │   ├── MayanPage.tsx    # 玛雅 13月亮历专区科普展示
│   │   ├── NoteManagerModal.tsx # "我的时空印记" 笔记管理全览窗口
│   │   ├── SolartermPage.tsx# 二十四节气与七十二物候动态罗盘展示
│   │   └── TraditionalPanel.tsx # 日期下方详细的甲子与六十四卦象面板
│   ├── hooks/               # React 自定义 Hooks (例如 usePersonalNotes.ts 本地存储相关逻辑)
│   ├── utils/               # 工具函数集合 (核心是 calendarCore.ts 历法推算引擎)
│   ├── App.tsx              # 应用根路由与导航守卫，控制全局背景色调与底部 Nav 导航
│   └── main.tsx             # 挂载入口
├── index.html               # 网页根挂载点
├── package.json             # NPM 依赖管理
├── capacitor.config.ts      # Capacitor 配置文件
└── tailwind.config.ts       # Tailwind 自定义配置 (如动画、主色调)
```

---

## 4. 功能模块使用指南 (Usage Guide)

### 4.1. 跨维历法展示 (Calendar Module)
首页默认展示当天的历法情况。
*   **圣太一天历**：展示八千年伏羲历史，由奇数阴月(36天)与偶数阳月(37天)构成。
*   **黄帝纪元历**：目前为黄帝纪元 4723 年，体现传统甲子年与周期的流转。
*   **玛雅历**：通过 `calendarCore.ts` 映射出长计历、卓尔金历（260天）以及每日对应的银河星系印记。

点击主页各项历法卡片，不仅可查看详细当日属性，亦可唤出全局月历框（`FullCalendarModal`），支持自由切换年份与历法视距进行查询。

### 4.2. 时空印记记录 (Personal Notes)
位于主界面的下半边。这不仅仅是日记，系统会通过本地 Storage 功能（`usePersonalNotes` Hook），帮你跨年度映射同一天发生的记录：
*   点击右下角的 `+` 悬浮按钮，留存今日心境。
*   系统会为你自动汇总在历史上的同月同日，你写下的所有历史感悟。

### 4.3. 知识图谱扩展
顶部导航包含了：
*   **科普**：系统详述各历法的由来（例如冬至为岁首的黄帝纪元算法证明）。
*   **节气**：通过生动的罗盘刻画出中国七十二物候，对应黄赤交角变化。
*   **玛雅**：探索玛雅星系色调（红白蓝黄绿）机制与 KIN 印记。

---

## 5. 开发与编译打包指南 (Development Pipeline)

如果你需要对代码进行二次开发（增加新功能或者修改文案），请遵循以下流程：

### 5.1. 本地网页端开发
确保电脑已经安装 `Node.js` (版本 > 18.x)。在 `huangdi-calendar` 根目录下，打开终端：

1. **安装依赖**：
   ```bash
   npm install
   ```
2. **启动本地开发服务器**：
   ```bash
   npm run dev
   ```
   随后浏览器输入 `http://localhost:5173` 即可实时预览并开发，你修改 `src/` 里的任何文件都会瞬间在浏览器热更新。

### 5.2. 构建到 Android 手机端 (APK打包)
每次你在网页测试完成后，如果想要将新的代码做到手机 APP 里，执行以下操作：

1. **构建前端生产环境文件** (打包输出到 `dist` 目录)：
   ```bash
   npm run build
   ```
2. **同步代码至安卓原生工程**：
   ```bash
   npx cap copy android
   ```
   这一步会将 `dist` 目录下的 HTML/CSS/JS 全盘复制到 `android/app/src/main/assets/public` 中。

3. **进入 Android Studio 打包编译**：
   * 打开 Android Studio，选择 `Open Project`，选中本项目中的 `android` 目录。
   * 确保 Gradle 自动同步完毕。
   * 顶部菜单栏点击 **Build** -> **Build Bundle(s) / APK(s)** -> **Build APK(s)** 生成最新的调试体验包。
   * （另外，如果通过数据线连接了安卓手机且已开户开发者模式，直接按顶部绿色的 ▶ `Run` 按钮即可安装至实机体验）。

---

## 6. 特别注意与兼容性调整记录

*   **半透明 SVG 兼容性考量**：
    原生 Capacitor 封装 WebView 时，部分低端或底层 Android 系统处理多重渐变配合 `opacity` 高旋转值的内置大量 SVG 时容易出现“渲染层卡死/黑屏”。**历法卡片（CalendarCard.tsx）原先的背景水印 SVG 图标已经因此被移除**，这是一种性能最优的妥协，确保 APP 在所有手机上都能绝对丝滑运行。
*   **顶部刘海屏与状态栏适配**：
    在 `App.tsx` 中，顶部导航栏的 CSS 间距 `top-4` 已对移动端特别处理为了 `md:top-4 top-12`，下放了安全距离以避免手机状态栏冲突。
*   **文本尺寸与移动端排版**：
    弹出框内的按钮和文字通过 Tailwind 的 `md:text-base text-sm` 进行了媒体查询适配。修改年份等较长交互元素时，特别剔除了部分冗余指导语以防止换行挤压。
