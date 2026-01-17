# StudyFlow 桌面版构建指南

## 🎯 构建目标

通过 Tauri 打包为 Windows 桌面应用（.exe 安装包）

## 📋 前置要求

### 必须安装
- ✅ Node.js v14+ (推荐 v18+)
- ✅ Rust 最新稳定版
- ✅ Visual Studio C++ Build Tools

### Windows 7 用户
- ✅ WebView2 Runtime（必须单独安装）
  - 下载：https://go.microsoft.com/fwlink/p/?LinkId=2124703

## 🚀 构建命令

### 方式一：构建 64 位版本（推荐）

```bash
# 1. 安装依赖
npm install

# 2. 构建 64 位版本
npm run tauri build
```

### 方式二：构建 32 位版本

```bash
# 1. 添加 32 位 Rust 目标
rustup target add i686-pc-windows-msvc

# 2. 构建 32 位版本
set TAURI_TRIPLE=i686-pc-windows-msvc
npm run tauri build
```

### 方式三：构建所有版本（64位 + 32位）

```bash
# 1. 安装依赖
npm install

# 2. 添加 32 位目标
rustup target add i686-pc-windows-msvc

# 3. 构建 64 位
npm run tauri build

# 4. 构建 32 位
set TAURI_TRIPLE=i686-pc-windows-msvc
npm run tauri build
```

## 📁 输出文件位置

### 64 位版本

```
src-tauri/target/release/bundle/msis/StudyFlow_0.1.0_x64_en-US.msi
src-tauri/target/release/bundle/nsis/StudyFlow_0.1.0_x64-setup.exe
src-tauri/target/release/StudyFlow.exe
```

### 32 位版本

```
src-tauri/target/i686-pc-windows-msvc/release/bundle/msis/StudyFlow_0.1.0_x86_en-US.msi
src-tauri/target/i686-pc-windows-msvc/release/bundle/nsis/StudyFlow_0.1.0_x86-setup.exe
src-tauri/target/i686-pc-windows-msvc/release/StudyFlow.exe
```

## 📦 安装包说明

### MSI 安装包
- **文件扩展名**: `.msi`
- **大小**: 约 15MB
- **特点**: Windows 标准安装程序

### NSIS 安装包（推荐）
- **文件扩展名**: `-setup.exe`
- **大小**: 约 20MB
- **特点**: 带安装向导，支持自定义安装路径

### 独立 exe
- **文件扩展名**: `.exe`
- **大小**: 约 10MB
- **特点**: 绿色版，免安装

## 🎯 推荐分发方式

### 方式一：NSIS 安装包（推荐）
```
分发文件：StudyFlow_0.1.0_x64-setup.exe
优势：
  - 带安装向导
  - 支持自定义安装路径
  - 自动创建桌面快捷方式
  - 支持卸载
```

### 方式二：独立 exe（绿色版）
```
分发文件：StudyFlow.exe
优势：
  - 无需安装
  - 直接运行
  - 便携性好
```

## ⏱️ 构建时间

| 首次构建 | 后续构建 |
|----------|----------|
| 10-15 分钟 | 2-5 分钟 |

首次构建时间较长，因为需要：
1. 下载 Rust 依赖
2. 编译 Rust 代码
3. 打包前端资源

## 🔧 构建配置

当前配置在 `src-tauri/tauri.conf.json`：

```json
{
  "bundle": {
    "active": true,
    "targets": ["msi", "nsis"],
    "identifier": "com.studyflow.app",
    "icon": ["icons/icon.ico"],
    "publisher": "芒辰Official",
    "copyright": "Copyright © 2026 芒辰Official",
    "category": "Education",
    "webviewInstallMode": {
      "type": "embedBootstrapper"
    }
  }
}
```

## 📊 构建输出示例

### 成功输出

```
> studyflow@0.1.0 tauri
> tauri "tauri"

   Compiling studyflow v0.1.0 (C:\Users\...\StudyFlow\src-tauri)
    Finished release [optimized] target(s) in 2m 30s
    Bundling StudyFlow_0.1.0_x64_en-US.msi
    Bundling StudyFlow_0.1.0_x64-setup.exe
    Finished 4 bundles at:
    C:\Users\...\StudyFlow\src-tauri\target\release\bundle\msis\StudyFlow_0.1.0_x64_en-US.msi
    C:\Users\...\StudyFlow\src-tauri\target\release\bundle\nsis\StudyFlow_0.1.0_x64-setup.exe
```

## 🚨 常见问题

### 问题：构建失败 - 缺少 Rust
**解决**：
```bash
# 安装 Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### 问题：构建失败 - 缺少 C++ 工具
**解决**：
下载并安装 Visual Studio C++ Build Tools

### 问题：32 位构建失败
**解决**：
```bash
# 确保添加了 32 位目标
rustup target add i686-pc-windows-msvc

# 设置环境变量
set TAURI_TRIPLE=i686-pc-windows-msvc
```

## 📋 构建检查清单

构建前请确认：

- [ ] 已安装 Node.js
- [ ] 已安装 Rust
- [ ] 已安装 C++ Build Tools
- [ ] Windows 7 用户已安装 WebView2
- [ ] package.json 配置正确
- [ ] tauri.conf.json 配置正确

## 🎉 构建完成

构建成功后，您将获得：

1. **StudyFlow_0.1.0_x64-setup.exe** - 64位安装包
2. **StudyFlow_0.1.0_x86-setup.exe** - 32位安装包
3. **StudyFlow.exe** - 独立可执行文件

可以直接分发给用户安装使用！

---

**作者**: 芒辰Official
**QQ社群**: 1078054540
**GitHub**: https://github.com/mangchenofficial/studyflow
