# 项目文件夹组织结构

## 📁 文件夹分类

### 🖥️ Interactive Systems
交互系统设计项目，包括用户界面、交互设计、用户体验等相关作品。

### 🎬 Media & Motion Design  
媒体与动态设计项目，包括动画、视频、多媒体作品等。
- **Rube Goldberg Machine** - 鲁布·戈德堡机械装置视频作品

### 🔧 Physical Computing & Prototyping
物理计算与原型制作项目，包括硬件设计、物联网、嵌入式系统等。
- **project1** - 物理计算项目原型

### 🎨 Visual & Fine Art
视觉与美术作品，包括平面设计、插画、艺术创作等。

---

## 🔧 网站重要技术修改记录

### ✅ 完成的主要优化

#### 1. 🎭 **介绍动画优化** (Intro Animation)
- **功能**: 介绍动画现在只在每个浏览器标签会话中显示一次
- **技术**: 使用 `sessionStorage` 控制显示逻辑
- **效果**: 
  - 首次访问显示完整介绍动画
  - 页面内导航不重复显示
  - 点击导航栏Home不重新触发
  - 刷新页面不重复显示
- **文件**: `index.html`

#### 2. 🚫 **防闪烁优化** (Anti-FOUC)
- **功能**: 消除页面导航时的白色/灰色闪烁
- **技术**: 在所有页面 `<head>` 顶部添加内联脚本
- **效果**: 
  - 深色主题立即应用，无延迟
  - 页面切换无背景颜色闪烁
  - 过渡动画在初始加载时禁用
- **文件**: `index.html`, `About ME.html`, `works.html`, `Contact.html`

#### 3. 📐 **布局位移修复** (CLS Fix)
- **功能**: 消除导航时的布局位移问题
- **技术**: 统一设置 `overflow-x: hidden !important`
- **效果**: 
  - 消除"向左闪一下"的视觉问题
  - 所有页面滚动条行为一致
  - 防止累积布局位移(CLS)
- **文件**: 所有HTML页面

#### 4. 📱 **响应式"Z's World"动画** (Responsive Animation)
- **功能**: 主页"Z's World"标题完全响应式设计
- **技术**: 
  - 使用 `clamp()` 函数实现响应式字体大小
  - GSAP动画参数根据视窗尺寸动态计算
  - 防抖动的窗口调整事件处理
- **效果**: 
  - 字体大小: `clamp(1rem, 8vw, 7rem)`
  - 内边距: `clamp(0.5rem, 2vw, 2rem)`
  - 外边距: `clamp(-0.5rem, -1vw, -1rem) auto clamp(1rem, 3vw, 2rem)`
  - 最大宽度: `min(95vw, 1200px)`
  - 最小宽度: `280px`
  - 悬停缩放: `clamp(1.02, 1.08, 1.12)`
- **文件**: `index.html`

#### 5. 🔄 **动画持久性修复** (Animation Persistence)
- **功能**: 窗口调整大小后动画效果保持
- **技术**: 
  - 将动画函数提升到全局作用域
  - 优化的resize事件处理器
  - 动画重启机制
- **效果**: 
  - 调整窗口大小后所有特效继续工作
  - 包括波浪动画、呼吸效果、渐变背景等
  - 100ms防抖延迟优化性能
- **文件**: `index.html`

### 🛠️ 技术栈使用

- **动画**: GSAP (GreenSock Animation Platform)
- **CSS**: 现代CSS技术 (clamp, vw/vh units, flexbox)
- **JavaScript**: 原生ES6+，DOM操作，事件处理
- **存储**: SessionStorage 用于状态管理
- **性能**: RequestAnimationFrame, 防抖技术

### 📝 注意事项

1. **浏览器兼容性**: 主要针对现代浏览器优化
2. **性能**: 所有动画使用GPU加速，优化了重绘性能
3. **可维护性**: 代码结构清晰，注释完整
4. **响应式**: 支持从移动设备到大屏幕的所有尺寸

---

*最后更新: 2024年*  
*技术支持: Claude Sonnet 4 + 用户协作开发*
