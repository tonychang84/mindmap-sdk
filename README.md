```markdown
# 🧠 寻简思维导图 SDK · 示例项目

> 一行代码，为你的产品注入 AI 思维导图能力

这个仓库包含了**寻简思维导图 SDK** 的完整集成示例，包括原生 JavaScript 和 React 两种框架的实现。

---

## ✨ 效果预览

![思维导图示例](./screenshot.png)

中心节点展示「SDK介绍 · 寻简思维导图」，四个分支分别覆盖 **快速集成、数据结构、样式定制、导出与交互**，子节点进一步细化了每个分支的核心能力。

---

## 🚀 快速开始

### 1️⃣ 获取 API Key

访问 [寻简思维导图开放平台](https://www.mindyushu.com/api.html)，登录后创建 API Key。

> ⚠️ **注意**：API Key 仅在创建时显示一次，请妥善保存。

### 2️⃣ 选择示例

- **原生 JavaScript**：直接运行 `examples/vanilla-js/index.html`（无需任何依赖）
- **React**：`cd examples/react && npm install && npm run dev`

### 3️⃣ 替换 API Key

在对应的示例文件中替换 `API_KEY` 变量，刷新页面即可看到思维导图渲染效果。

---

## 📁 项目结构

```
mindmap-sdk/
├── README.md
├── LICENSE
├── .gitignore
├── screenshot.png
└── examples/
    ├── vanilla-js/          # 原生 JavaScript 示例
    │   ├── index.html
    │   └── README.md
    └── react/               # React 框架示例
        ├── README.md
        ├── package.json
        ├── vite.config.js
        ├── index.html
        └── src/
            ├── main.jsx
            ├── App.jsx
            └── App.css
```

---

## 🧩 核心通信流程

```javascript
// 1. 嵌入 SDK
<iframe id="mindmap-sdk" src="https://web.mindyushu.com/sdk"></iframe>

// 2. 监听 READY 事件
window.addEventListener('message', function(event) {
    if (event.data.type === 'READY' && event.data.value === 'OK') {
        // 3. 发送思维导图数据（⚠️ 必须 JSON.stringify）
        iframe.contentWindow.postMessage({
            type: 'MINDMAP',
            data: JSON.stringify(sdkData)
        }, 'https://web.mindyushu.com');
    }
});
```

> 💡 **关键点**：`data` 字段必须使用 `JSON.stringify()` 序列化，否则 SDK 会解析失败。

---

## 📊 数据结构

```javascript
const sdkData = {
    ApiKey: 'your_api_key',      // 必填
    rootNode: {                   // 必填
        value: { text: '中心主题' },
        children: [ ... ]
    },
    styleIndex: 5,               // 配色方案 (0~29)
    frameworkIndex: 0,           // 布局骨架 (0~33)
    lineWidth: 2.5,
    lineLayout: 1,
    layout: 19,
    mindType: 1,
    mindBGColor: 0xffffff,
    showSaveImageButton: true,
    lineColors: [ ... ]          // 可选，自定义线条颜色
};
```

## 🎨 内置配色 & 布局

| 特性 | 数量 | 说明 |
|------|------|------|
| **骨架布局** | 30+ 种 | 思维导图、流程图、组织结构图、时间线等 |
| **配色方案** | 30 套 | 开箱即用，也支持自定义 |

## 📚 相关链接

| 链接 | 说明 |
|------|------|
| [开放平台](https://www.mindyushu.com/api.html) | 申请 API Key |
| [SDK 文档](https://www.mindyushu.com/api.html) | 完整 API 文档 |
| [商业说明](https://www.mindyushu.com/buy.html) | 定价与套餐 |

## 📄 许可证

MIT License © 2026 上海玉数科技有限公司

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！如有问题，请联系客服微信：`yushu_mindmap`

---

**寻简思维导图 SDK —— 让思维可视化变得简单。**
```