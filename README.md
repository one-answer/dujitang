# 毒鸡汤网站

一个基于 React + TypeScript + Vite 构建的现代化网站，提供毒鸡汤、安慰文案和肯德基疯狂星期四文案，满足不同场景下的文案需求。

## 功能特点

- **多种文案类型**：
  - 毒鸡汤：有毒但有道理的鸡汤文案
  - 安慰文案：温暖人心的安慰话语
  - 肯德基疯狂星期四文案：搞笑的肯德基疯狂星期四文案

- **现代化设计**：
  - 响应式布局，适配各种设备尺寸（PC、平板、手机）
  - 优雅的动画和过渡效果
  - 玻璃态设计风格
  - 柔和的紫色主题

- **用户友好功能**：
  - 一键切换不同类型的文案
  - 一键分享功能
  - 一键刷新获取新文案
  - 加载状态和错误处理

## 技术栈

- **前端框架**：React 18
- **开发语言**：TypeScript
- **构建工具**：Vite
- **样式解决方案**：Styled Components
- **API 调用**：Fetch API

## API 接口

网站使用了以下三个 API 接口：

1. **毒鸡汤接口**：
   - URL: `https://kaiwu.xxlb.org/api/jitang`
   - 返回示例：
   ```json
   {
     "data": {
       "content": {
         "id": 2595,
         "content": "总是情不自禁的忧伤，于是慢慢学会了掩藏，因为不想被人再刺伤，所以渐渐学会了伪装。",
         "created_at": "2025-04-10 07:27:25",
         "updated_at": "2025-04-10 07:27:25"
       }
     },
     "status": 1,
     "msg": "毒鸡汤数据获取成功！"
   }
   ```

2. **安慰文案接口**：
   - URL: `https://v.api.aa1.cn/api/api-wenan-anwei/index.php?type=json`
   - 返回示例（需要从返回的 HTML 中提取 JSON）：
   ```json
   {"anwei":"你什么时候放下，什么时候就没有烦恼。"}
   ```

3. **肯德基疯狂星期四文案接口**：
   - URL: `https://tools.mgtv100.com/external/v1/pear/kfc`
   - 返回示例：
   ```json
   {
     "status": "success",
     "code": 200,
     "data": "你好，我是高中生侦探工藤新一，我刚在游乐场被打晕，被黑衣组织强迫灌下了APTX-4869，现在身体竟然变成了小孩子，目前我吃了灰原哀开发的解药试作品JUFD-866、TAMA-028、STAR-907、VGD-193、PX-177、IPX-192、SSNI-290都起不到作用，现在听说肯德基疯狂星期四29.9元的吮指原味鸡有特殊作用，希望大家能够帮我一忙，事成后我让怪盗基德给你搞几个宝石。"
   }
   ```

## 如何运行

1. 克隆仓库：
   ```bash
   git clone https://github.com/yourusername/dujitang.git
   cd dujitang
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 启动开发服务器：
   ```bash
   npm run dev
   ```

4. 构建生产版本：
   ```bash
   npm run build
   ```

## 项目结构

```
dujitang/
├── public/
│   └── soup.svg
├── src/
│   ├── components/
│   │   ├── Quote.tsx
│   │   └── styled/
│   │       └── index.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── quoteService.ts
│   │   ├── comfortQuoteService.ts
│   │   └── kfcQuoteService.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
└── tsconfig.json
```
