# StudyFlow - 学习流

一款面向学生的桌面学习小组件工具，提供轻量化、沉浸式的学习体验。

## 系统要求

- ✅ Windows 7 SP1 (32位/64位)
- ✅ Windows 8.1 (32位/64位)
- ✅ Windows 10 (32位/64位)
- ✅ Windows 11 (32位/64位)
- ✅ macOS 10.15+
- ✅ Linux (主流发行版)

**注意**: Windows 7 用户需要单独安装 WebView2 Runtime

## 核心特性

- **自由画布**: 无边界画布，小组件自由拖拽、缩放、吸附对齐
- **学习小组件**: 课程表、时钟、番茄钟、待办清单、系统状态
- **专注模式**: 一键开启专注，屏蔽通知，提升学习效率
- **轻量动效**: 60fps流畅动效，支持一键关闭，不干扰学习
- **个性化**: 深色/浅色主题、护眼模式、自定义背景

## 技术栈

- **后端**: Tauri (Rust)
- **前端**: React + TypeScript
- **动效**: Framer Motion
- **状态管理**: Zustand
- **样式**: Tailwind CSS

## 开发指南

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建应用

```bash
npm run build
```

### 运行 Tauri 应用

```bash
npm run tauri dev
```

### 构建 Tauri 应用

#### 构建 64 位版本（默认）

```bash
npm run tauri build
```

#### 构建 32 位版本

```bash
# 添加 32 位 Rust 目标
rustup target add i686-pc-windows-msvc

# 构建 32 位版本
set TAURI_TRIPLE=i686-pc-windows-msvc
npm run tauri build
```

详细的构建说明请参考 [BUILD.md](./BUILD.md)

## 项目结构

```
StudyFlow/
├── src/
│   ├── components/       # 组件
│   ├── hooks/           # 自定义钩子
│   ├── store/           # 状态管理
│   ├── types/           # 类型定义
│   ├── App.tsx          # 主应用
│   ├── main.tsx         # 入口文件
│   └── index.css        # 全局样式
├── src-tauri/           # Tauri 后端
│   ├── src/
│   │   └── main.rs      # Rust 主文件
│   ├── Cargo.toml       # Rust 依赖
│   └── tauri.conf.json  # Tauri 配置
├── package.json         # Node.js 依赖
├── tsconfig.json        # TypeScript 配置
├── vite.config.ts       # Vite 配置
└── tailwind.config.js   # Tailwind CSS 配置
```

## 性能指标

- 内存占用: ≤100MB (动效关闭) / ≤120MB (动效开启)
- 启动时间: ≤3秒
- 打包体积: ≤120MB
- 动效帧率: 60fps (高配) / 30fps (低配)

## 许可证

MIT License

Copyright © 2026 芒辰Official

## 联系方式

- **QQ社群**: 1078054540
- **GitHub**: https://github.com/mangchenofficial/studyflow
- **问题反馈**: https://github.com/mangchenofficial/studyflow/issues
