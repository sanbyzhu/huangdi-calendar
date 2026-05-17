# 古历法

古历法是一个融合中华传统历法、节气物候、黄帝纪元、圣太一天历与玛雅历法的跨平台时间系统。项目以 React、TypeScript、Vite、Capacitor 和 Electron 构建，支持 Web、Android 与 Windows 桌面端。

> 项目仍在持续打磨中，历法模型和文化资料会随着校对与反馈继续迭代。

## 核心功能

- 多历法同屏：公历、农历、黄帝纪元历、圣太一天历、玛雅历法。
- 节气与物候：二十四节气、七十二候、五运六气相关展示。
- 时空推演：支持切换日期和年份，查看不同纪元下的历法对应关系。
- 玛雅历法：包含 Tzolkin、Haab、KIN、波符、图腾与能量调性展示。
- 个人印记：本地保存日记/札记，按日期形成跨年回响。
- 多端打包：Web/PWA、Android Capacitor、Electron Windows 桌面端。

## 技术栈

- React 19 + TypeScript
- Vite 7 + Tailwind CSS 4
- Framer Motion + Lucide React
- lunar-javascript + date-fns
- Capacitor Android
- Electron + electron-builder

## 快速开始

```bash
npm install
npm run dev
```

开发服务器默认运行在 `http://localhost:5173`。

## 常用脚本

```bash
npm run dev             # 启动 Web 开发服务器
npm run build           # 类型检查并构建 Web 产物
npm run lint            # 运行 ESLint
npm run preview         # 预览 dist 构建结果
npm run electron:dev    # 启动 Electron 开发版
npm run electron:build  # 构建 Windows 桌面安装包
```

## Android 构建

```bash
npm run build
npx cap sync android
```

随后用 Android Studio 打开 `android/` 目录构建 APK，或在 `android/` 下使用 Gradle 命令构建。

## 项目结构

```text
huangdi-calendar/
├─ android/              # Capacitor Android 工程
├─ assets/               # 桌面端/构建图标资源
├─ electron/             # Electron 主进程与预加载脚本
├─ public/
│  ├─ assets/            # 玛雅历法、图腾、波符等静态资源
│  ├─ data/              # 历史、节气、经典与天历数据
│  └─ images/            # 打赏码等图片资源
├─ src/
│  ├─ components/        # 页面与交互组件
│  ├─ hooks/             # 自定义 Hooks
│  ├─ types/             # 类型声明
│  └─ utils/             # 历法计算与资源工具
└─ package.json
```

## 文档

- `USER_MANUAL.md`：应用使用说明
- `DEVELOPER_GUIDE.md`：开发与打包说明
- `古历法介绍.md`：项目愿景与功能介绍
- `古历法开发说明.md`：技术结构说明
- `古历法更新说明.md`：版本更新记录

## 开源说明

代码以 MIT License 开源。仓库中的图片、文化资料和整理文本如涉及第三方来源或后续补充授权，请以对应资源说明为准。历法、养生和文化内容仅作学习研究与辅助参考，不构成专业建议。

## 反馈

欢迎通过 GitHub Issues 提交问题、建议和校对反馈。若你发现历法算法、节气数据、文案出处或界面适配上的问题，请尽量附上日期、平台和复现路径。
