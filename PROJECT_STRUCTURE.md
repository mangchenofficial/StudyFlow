# StudyFlow 项目结构

```
StudyFlow/
│
├── 📄 package.json                 # Node.js 依赖配置
├── 📄 tsconfig.json                # TypeScript 配置
├── 📄 tsconfig.node.json           # Node TypeScript 配置
├── 📄 vite.config.ts               # Vite 构建配置
├── 📄 tailwind.config.js           # Tailwind CSS 配置
├── 📄 postcss.config.js            # PostCSS 配置
├── 📄 index.html                   # HTML 入口文件
├── 📄 .gitignore                   # Git 忽略文件
│
├── 📄 README.md                    # 项目说明文档
├── 📄 QUICKSTART.md                # 快速启动指南
├── 📄 PROJECT_SUMMARY.md            # 项目开发完成报告
│
├── 📁 src/                         # 源代码目录
│   ├── 📄 main.tsx                 # React 入口文件
│   ├── 📄 App.tsx                  # 主应用组件
│   ├── 📄 index.css                # 全局样式
│   │
│   ├── 📁 components/              # React 组件
│   │   ├── 📄 Widget.tsx           # 小组件容器
│   │   ├── 📄 ScheduleWidget.tsx    # 课程表小组件
│   │   ├── 📄 ClockWidget.tsx       # 时钟小组件
│   │   ├── 📄 PomodoroWidget.tsx    # 番茄钟小组件
│   │   ├── 📄 TodoWidget.tsx        # 待办清单小组件
│   │   ├── 📄 SystemStatusWidget.tsx # 系统状态小组件
│   │   ├── 📄 FocusMode.tsx         # 专注模式
│   │   └── 📄 SettingsPanel.tsx     # 设置面板
│   │
│   ├── 📁 hooks/                   # 自定义 React Hooks
│   │   └── 📄 useAnimation.ts       # 动效钩子
│   │
│   ├── 📁 store/                   # 状态管理
│   │   └── 📄 index.ts             # Zustand Store
│   │
│   └── 📁 types/                   # TypeScript 类型定义
│       └── 📄 index.ts             # 类型定义
│
└── 📁 src-tauri/                   # Tauri 后端（Rust）
    ├── 📄 tauri.conf.json          # Tauri 配置
    ├── 📄 Cargo.toml               # Rust 依赖配置
    ├── 📄 build.rs                 # Rust 构建脚本
    │
    ├── 📁 src/                     # Rust 源代码
    │   └── 📄 main.rs              # Rust 主文件
    │
    └── 📁 icons/                   # 应用图标
        └── 📄 icon.svg             # SVG 图标
```

## 文件说明

### 配置文件

| 文件 | 说明 |
|------|------|
| `package.json` | Node.js 依赖和脚本配置 |
| `tsconfig.json` | TypeScript 编译配置 |
| `vite.config.ts` | Vite 构建工具配置 |
| `tailwind.config.js` | Tailwind CSS 样式配置 |
| `postcss.config.js` | PostCSS 处理器配置 |
| `index.html` | HTML 入口文件 |

### 源代码

| 文件/目录 | 说明 |
|-----------|------|
| `src/main.tsx` | React 应用入口 |
| `src/App.tsx` | 主应用组件 |
| `src/index.css` | 全局样式和 Tailwind 指令 |
| `src/components/` | 所有 React 组件 |
| `src/hooks/` | 自定义 React Hooks |
| `src/store/` | Zustand 状态管理 |
| `src/types/` | TypeScript 类型定义 |

### Tauri 后端

| 文件/目录 | 说明 |
|-----------|------|
| `src-tauri/tauri.conf.json` | Tauri 应用配置 |
| `src-tauri/Cargo.toml` | Rust 依赖配置 |
| `src-tauri/build.rs` | Rust 构建脚本 |
| `src-tauri/src/main.rs` | Rust 主程序 |
| `src-tauri/icons/` | 应用图标 |

### 文档

| 文件 | 说明 |
|------|------|
| `README.md` | 项目说明文档 |
| `QUICKSTART.md` | 快速启动指南 |
| `PROJECT_SUMMARY.md` | 项目开发完成报告 |

## 核心组件说明

### Widget.tsx
小组件容器组件，提供：
- 拖拽功能
- 缩放功能
- 选中状态管理
- 动效支持

### ScheduleWidget.tsx
课程表小组件，提供：
- 按天显示课程
- 节次切换
- 当前课程高亮
- 横向滑动动效

### ClockWidget.tsx
时钟小组件，提供：
- 数字时钟显示
- 模拟时钟显示
- 点击切换模式
- 秒针流畅动画

### PomodoroWidget.tsx
番茄钟小组件，提供：
- 专注计时
- 可设置时长
- 开始/暂停/继续/停止
- 进度圆环动画

### TodoWidget.tsx
待办清单小组件，提供：
- 添加待办
- 勾选完成
- 删除待办
- 分类管理

### SystemStatusWidget.tsx
系统状态小组件，提供：
- 电量显示
- 内存使用率
- 网络状态
- 数值变化动效

### FocusMode.tsx
专注模式，提供：
- 全局模糊效果
- 专注计时
- 锁定功能
- PIN码解锁

### SettingsPanel.tsx
设置面板，提供：
- 主题切换
- 护眼模式
- 动效设置
- 背景设置

## 状态管理

Zustand Store 包含以下状态：

- `widgets`: 小组件列表
- `schedule`: 课程表数据
- `todos`: 待办清单
- `layouts`: 布局配置
- `pomodoro`: 番茄钟状态
- `focusMode`: 专注模式状态
- `settings`: 个性化设置
- `selectedWidgetIds`: 选中的小组件ID

## 动效系统

useAnimation Hook 提供：

- `shouldAnimate(type)`: 判断是否播放动效
- `getTransition(type)`: 获取过渡配置
- `getInitial(type)`: 获取初始状态
- `getAnimate(type)`: 获取动画状态
- `getExit(type)`: 获取退出状态

动效级别：
- `none`: 关闭所有动效
- `reminders`: 仅保留提醒动效
- `all`: 开启所有动效

## 类型定义

主要类型：

- `Widget`: 小组件
- `ScheduleItem`: 课程表项
- `TodoItem`: 待办项
- `Layout`: 布局
- `PomodoroState`: 番茄钟状态
- `FocusModeState`: 专注模式状态
- `SystemStatus`: 系统状态
- `Settings`: 设置
- `AnimationLevel`: 动效级别

## 开发流程

1. 安装依赖：`npm install`
2. 开发模式：`npm run dev`
3. 运行应用：`npm run tauri dev`
4. 构建应用：`npm run tauri build`

## 性能优化

- 使用 Framer Motion 硬件加速
- Zustand 轻量级状态管理
- Tauri Rust 后端高性能
- Tailwind CSS 原子化样式
- 动效帧率自适应

## 数据持久化

使用 Zustand persist 中间件自动保存数据到本地存储。
