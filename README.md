# PLDT Home Smart Search

PLDT 官网及智能搜索前端交互原型，供研发参考与接入。

## 本地运行

环境要求：Node.js 20.19+ 或 22.12+，npm。

```bash
npm ci
npm run dev
```

打开终端输出的本地地址。指定演示端口可使用 `npm run dev -- --port 5175`。

## 构建与预览

```bash
npm run build
npm run preview
```

## 研发接入说明

- 技术栈：React、Vite、Arco Design。
- 首页导航点击搜索按钮展开搜索框；输入关键词或点击推荐词查看结果。
- 搜索支持历史记录、分页、可选 AI 摘要和浏览器语音输入。
- 特定关键词 `Fiber Unli Plans`、`Fiber Prepaid`、`Cameras`、`Door Lock` 优先展示对应推荐卡片。
- `src/App.jsx`：页面入口与搜索交互；`src/searchContent.js`、`src/searchProducts.js`：搜索及产品演示数据。
- `src/SearchProductFeature.jsx`：推荐卡片；`src/PrepaidSearchOffer.jsx`：预付费套餐轮播。
- `src/pages/`：产品页面；`public/assets/`：本地静态素材。

当前搜索数据、产品信息和 AI 摘要均为前端演示内容，尚未接入真实搜索、商品或 AI 服务；流式摘要是演示效果。语音输入依赖浏览器支持与用户授权。正式上线前需接入后端服务并核对套餐、价格及跳转链接。

项目使用本地保存的 PLDT 官网素材，仅用于本项目的设计演示和研发沟通。
