# Gemini Markdown Downloader

一个简单而强大的 Chrome 扩展，用于将 Gemini AI 对话内容一键导出为格式化的 Markdown 文件。

## ✨ 功能特性

- 🚀 **一键导出**：点击扩展图标即可快速下载当前 Gemini 对话
- 📝 **完整格式化**：使用 Turndown 库保持代码块、列表、链接等完整格式
- 🎯 **智能命名**：自动基于对话标题生成文件名
- 🔒 **安全可靠**：仅在 Gemini 页面激活，无额外权限要求
- ⚡ **高性能**：轻量级设计，不影响页面加载速度
- 🎨 **结构清晰**：用户查询和 Gemini 回复分别标记，便于阅读

## 📦 安装方法

### 从源码安装（开发者模式）

1. **下载源码**
   ```bash
   git clone https://github.com/your-username/gemini_md.git
   cd gemini_md
   ```

2. **打开 Chrome 扩展管理页面**
   - 在 Chrome 地址栏输入 `chrome://extensions/`
   - 或者通过菜单：更多工具 → 扩展程序

3. **启用开发者模式**
   - 点击页面右上角的"开发者模式"开关

4. **加载扩展**
   - 点击"加载已解压的扩展程序"
   - 选择项目文件夹
   - 扩展安装完成！

## 🚀 使用说明

### 基本使用

1. **访问 Gemini**
   - 打开 [Gemini AI](https://gemini.google.com)
   - 开始或继续一个对话

2. **导出对话**
   - 点击浏览器工具栏中的扩展图标
   - 对话内容将自动下载为 `.md` 文件

3. **查看文件**
   - 文件保存在浏览器默认下载目录
   - 文件名格式：`对话标题.md`

### 输出格式示例

```markdown
# 对话标题

## User

你的问题内容...

---

## Gemini

Gemini 的回复内容，包含：
- 完整的格式化
- **粗体**和*斜体*文本
- `代码片段`
- 链接和列表等

---
```

## 🔧 技术实现

### 核心技术栈

- **Chrome Extension Manifest V3**：现代化的扩展架构
- **Turndown.js**：高质量的 HTML 到 Markdown 转换库
- **Content Scripts**：页面内容提取和处理
- **Background Scripts**：扩展生命周期管理

### 工作原理

1. **页面检测**：Background script 验证当前页面是否为 Gemini 页面
2. **内容提取**：Content script 通过 DOM 选择器提取对话内容
3. **格式转换**：使用 Turndown 将 HTML 内容转换为 Markdown
4. **文件生成**：创建 Blob 对象并触发下载

### 关键特性

- **智能选择器**：适配 Gemini 页面的 DOM 结构
- **文件名清理**：自动处理特殊字符，确保文件名有效
- **错误处理**：完善的日志记录和错误处理机制

## 📁 文件结构

```
gemini_md/
├── manifest.json          # Chrome 扩展配置文件
├── background.js          # 后台服务脚本
├── content.js            # 内容脚本（主要逻辑）
├── turndown.js           # Turndown 库文件
├── icon48.png            # 扩展图标 (48x48)
├── icon128.png           # 扩展图标 (128x128)
├── icon_generator.html   # 图标生成工具
└── README.md            # 项目说明文档
```

### 文件说明

| 文件 | 功能 |
|------|------|
| `manifest.json` | 扩展配置，定义权限、脚本加载等 |
| `background.js` | 处理扩展图标点击事件，验证页面 |
| `content.js` | 核心功能实现，提取和转换对话内容 |
| `turndown.js` | 第三方库，HTML 到 Markdown 转换 |
| `icon*.png` | 扩展在工具栏和商店中的图标 |

## 📋 版本历史

### v1.5 (当前版本)
- ✅ 集成 Turndown 库，提升转换质量
- ✅ 优化 Markdown 格式输出
- ✅ 改进文件命名逻辑
- ✅ 增强错误处理和日志记录
- ✅ 支持更多 HTML 元素的转换

### 主要改进
- **更好的格式保持**：代码块、列表、链接等元素完美转换
- **自定义转换规则**：针对 Gemini 页面的特殊元素优化
- **稳定性提升**：更可靠的内容提取和错误处理

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**享受使用 Gemini Markdown Downloader！** 🎉 