# StudyFlow 快速启动指南

**作者**: 芒辰Official
**版本**: 0.1.0
**许可证**: MIT License

## 前置要求

在开始之前，请确保您的系统已安装以下软件：

1. **Node.js** (v14.0.0 或更高版本，推荐 v18+)
   - 下载地址: https://nodejs.org/

2. **Rust** (最新稳定版)
   - 下载地址: https://www.rust-lang.org/tools/install
   - 安装后运行: `rustup update`

3. **系统依赖**
   - **Windows 7 SP1 及以上**: 
     - Visual Studio C++ Build Tools
     - WebView2 Runtime（Windows 7 必须单独安装）
     - 下载地址: https://developer.microsoft.com/microsoft-edge/webview2/
   - **Windows 10/11**: 
     - Visual Studio C++ Build Tools
     - WebView2（系统已预装）
   - **macOS**: Xcode Command Line Tools
   - **Linux**: libwebkit2gtk-4.0-dev, build-essential, curl, wget, file, libssl-dev, libgtk-3-dev, libayatana-appindicator3-dev, librsvg2-dev

## 安装步骤

### 1. 安装 Node.js 依赖

```bash
npm install
```

### 2. 开发模式启动

```bash
npm run dev
```

这将在 `http://localhost:1420` 启动开发服务器。

### 3. 运行 Tauri 应用

```bash
npm run tauri dev
```

这将启动完整的桌面应用程序。

## 功能概览

### 核心小组件

1. **课程表小组件**
   - 显示当前周课程安排
   - 支持按天切换
   - 当前课程高亮显示
   - 节次切换横向滑动动效

2. **时钟小组件**
   - 数字/模拟时钟切换
   - 秒针流畅帧动画
   - 点击切换显示模式

3. **番茄钟小组件**
   - 可设置专注时长（5/15/25/45/60分钟）
   - 开始/暂停/继续/停止功能
   - 进度圆环动画
   - 时间跳动轻微缩放动效

4. **待办清单小组件**
   - 添加待办事项
   - 勾选完成（划掉 + 渐灰）
   - 删除待办（渐隐 + 收缩）
   - 分类切换（全部/学习/生活/其他）

5. **系统状态小组件**
   - 电量显示（带充电状态）
   - 内存使用率
   - 网络连接状态
   - 数值变化平滑过渡动效

### 专注模式

- 一键开启专注模式
- 全局模糊效果
- 屏蔽通知
- 可锁定专注（需PIN码解锁）
- 专注时长累计

### 个性化设置

- **主题切换**: 浅色/深色/跟随系统
- **护眼模式**: 屏幕色温调整
- **动效设置**: 
  - 关闭所有动效
  - 仅保留提醒动效
  - 开启所有动效
- **背景设置**: 纯色/图片 + 透明度调整

### 动效系统

所有动效都基于 Framer Motion 实现，支持：

- **拖拽动效**: 顺滑跟随，无延迟
- **缩放动效**: 渐进式缩放，ease-out 缓动
- **淡入淡出**: 0.3-0.5秒过渡
- **呼吸动效**: 2-3秒循环
- **滑动动效**: 横向/纵向滑动

动效时长控制在 0.8 秒以内，确保不干扰学习专注。

## 快捷键

- `ESC`: 关闭设置面板 / 取消选择

## 数据存储

所有数据自动保存到本地：

- 小组件位置和大小
- 课程表数据
- 待办清单
- 个性化设置
- 布局配置

数据存储位置:
- **Windows**: `%APPDATA%\com.studyflow.app`
- **macOS**: `~/Library/Application Support/com.studyflow.app`
- **Linux**: `~/.config/com.studyflow.app`

## 性能优化

- 内存占用: ≤100MB (动效关闭) / ≤120MB (动效开启)
- 启动时间: ≤3秒
- 动效帧率: 60fps (高配) / 30fps (低配)

如遇性能问题，可在设置中关闭动效或选择"仅保留提醒动效"。

## 常见问题

### Q: 应用无法启动？

A: 请检查：
1. Node.js 和 Rust 是否正确安装
2. 运行 `npm install` 确保依赖已安装
3. 检查端口 1420 是否被占用

### Q: 动效卡顿？

A: 尝试：
1. 在设置中将动效级别改为"仅保留提醒动效"或"关闭所有动效"
2. 关闭其他占用资源的程序
3. 检查系统性能

### Q: 数据丢失？

A: 数据存储在本地，如遇问题：
1. 检查应用是否有写入权限
2. 查看数据存储位置的文件
3. 尝试重新导入数据（功能开发中）

## 开发者信息

- 技术栈: Tauri + React + TypeScript + Framer Motion
- 许可证: MIT
- 源代码: 完整开源

## 联系支持

如遇问题或有建议，请通过以下方式联系：

- **QQ社群**: 1078054540
- **GitHub Issues**: https://github.com/mangchenofficial/studyflow/issues
- **提交 Issue**

---

祝学习愉快！📚
