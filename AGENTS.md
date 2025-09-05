# AGENTS Guidelines

## 项目结构
- `backend/`: Node.js + Express 服务器，入口 `backend/src/index.js`。
- `frontend/`: React 前端应用，入口 `frontend/src/index.js`。
- `project/`: 项目文档与分类说明。
- 根目录包含若干静态 HTML（如 `index.html`, `works.html`）和资源文件（`styles.css`, `js/`, `Sources/`）。

## 修改守则
1. **先读此文件**：任何提交前先阅读 AGENTS.md，确保遵循项目结构和约定。
2. **保持结构清晰**：新增或移动文件时，更新相关路径并在本文件记录要点。
3. **记录重要变更**：若修改影响到目录结构、关键页面或运行方式，请在“变更记录”部分补充说明。
4. **运行检查**：完成修改后运行 `npm test`（若无测试会提示缺失），并在提交信息中引用结果。

## 运行命令
- `npm run server`: 启动后端服务。
- `npm run client`: 启动前端开发服务器。

## 变更记录
- 添加 `.eslintrc` 与 `.prettierrc`，并在 `package.json` 中新增 `lint` 与 `test` 脚本。
