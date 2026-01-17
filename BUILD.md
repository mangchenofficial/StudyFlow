# StudyFlow 构建指南

## 支持的系统

- ✅ Windows 7 SP1 (32位/64位)
- ✅ Windows 8.1 (32位/64位)
- ✅ Windows 10 (32位/64位)
- ✅ Windows 11 (32位/64位)

## 前置要求

### 通用要求
- Node.js v14+ (推荐 v18+)
- Rust 最新稳定版
- Visual Studio C++ Build Tools

### Windows 7 特殊要求
**必须安装 WebView2 Runtime**
- 下载地址：https://developer.microsoft.com/microsoft-edge/webview2/
- 选择：Evergreen Bootstrapper
- 安装后重启系统

## 构建步骤

### 1. 安装依赖

```bash
npm install
```

### 2. 构建 64 位版本（默认）

```bash
npm run tauri build
```

输出文件：
- `src-tauri/target/release/bundle/msis/StudyFlow_0.1.0_x64_en-US.msi`
- `src-tauri/target/release/bundle/nsis/StudyFlow_0.1.0_x64-setup.exe`

### 3. 构建 32 位版本

```bash
# 设置 Rust 目标为 32 位
rustup target add i686-pc-windows-msvc

# 构建 32 位版本
set TAURI_TRIPLE=i686-pc-windows-msvc
npm run tauri build
```

输出文件：
- `src-tauri/target/i686-pc-windows-msvc/release/bundle/msis/StudyFlow_0.1.0_x86_en-US.msi`
- `src-tauri/target/i686-pc-windows-msvc/release/bundle/nsis/StudyFlow_0.1.0_x86-setup.exe`

### 4. 构建所有版本（64位 + 32位）

```bash
# 添加 32 位目标
rustup target add i686-pc-windows-msvc

# 构建 64 位
npm run tauri build

# 构建 32 位
set TAURI_TRIPLE=i686-pc-windows-msvc
npm run tauri build
```

## 输出文件说明

### 64 位版本
- `StudyFlow_0.1.0_x64_en-US.msi` - MSI 安装包（约 15MB）
- `StudyFlow_0.1.0_x64-setup.exe` - NSIS 安装包（约 20MB）
- `StudyFlow.exe` - 独立可执行文件（约 10MB）

### 32 位版本
- `StudyFlow_0.1.0_x86_en-US.msi` - MSI 安装包（约 15MB）
- `StudyFlow_0.1.0_x86-setup.exe` - NSIS 安装包（约 20MB）
- `StudyFlow.exe` - 独立可执行文件（约 10MB）

## Windows 7 安装说明

### 1. 安装 WebView2 Runtime（如未安装）
- 下载：https://go.microsoft.com/fwlink/p/?LinkId=2124703
- 运行安装程序
- 重启系统

### 2. 安装 StudyFlow
- 运行 `StudyFlow_0.1.0_x86-setup.exe`（32位系统）
- 或运行 `StudyFlow_0.1.0_x64-setup.exe`（64位系统）
- 按照安装向导完成安装

### 3. 启动应用
- 双击桌面快捷方式
- 或从开始菜单启动

## 性能优化建议

### Windows 7 用户
- 关闭透明窗口效果
- 使用"仅保留提醒动效"模式
- 关闭不必要的后台程序
- 确保系统有足够内存（建议 4GB+）

### Windows 10/11 用户
- 可使用所有动效
- 可开启透明窗口
- 推荐使用 64 位版本

## 故障排除

### 问题：应用无法启动
**解决方案**：
1. 检查是否安装了 WebView2 Runtime
2. 重新安装应用
3. 检查系统日志

### 问题：动效卡顿
**解决方案**：
1. 在设置中关闭动效
2. 或选择"仅保留提醒动效"
3. 关闭其他占用资源的程序

### 问题：32位构建失败
**解决方案**：
1. 确保安装了 32 位 Rust 工具链
2. 运行 `rustup target add i686-pc-windows-msvc`
3. 确保安装了 32 位 C++ 构建工具

## 开发模式

### 启动开发服务器

```bash
npm run dev
```

### 启动 Tauri 开发模式

```bash
npm run tauri dev
```

## 版本信息

- **当前版本**: 0.1.0
- **作者**: 芒辰Official
- **Tauri 版本**: 1.5
- **React 版本**: 18.2.0
- **TypeScript 版本**: 5.3.0
- **Rust 版本**: 最新稳定版

## 许可证

MIT License - 详见 [LICENSE](../LICENSE) 文件

## 联系方式

- **QQ社群**: 1078054540
- **GitHub**: https://github.com/mangchenofficial/studyflow
- **问题反馈**: https://github.com/mangchenofficial/studyflow/issues
