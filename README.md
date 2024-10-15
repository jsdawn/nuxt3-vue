# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
# pnpm
pnpm install
# yarn
yarn install
# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
# pnpm
pnpm run dev
# yarn
yarn dev
# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
# pnpm
pnpm run build
# yarn
yarn build
# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview
# pnpm
pnpm run preview
# yarn
yarn preview
# bun
bun run preview
```

## Deployment ssr

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

```bash
# Build the application for production
pnpm build

# Node.js Server
node .output/server/index.mjs

# host,port
HOST=0.0.0.0 PORT=3008 node .output/server/index.mjs
```

## 部署静态主机

```bash
# Build the application for production
pnpm generate

# 静态文件在 .output/public
# 使用serve包预览页面
cd .output/public && serve
```

## Directory Structure

address：https://nuxt.com/docs/guide/directory-structure/app

```bash
├── api
│   └── index.js
├── app.config.ts
├── app.vue
├── assets
├── components
│   └── Button.vue
├── middleware
│   ├── auth.global.js
│   └── posts-auth.js
├── nuxt.config.ts
├── package.json
├── pages
│   ├── about
│   │   └── index.vue
│   ├── index.vue
│   └── posts
│       └── [id].vue
├── pnpm-lock.yaml
├── public
│   └── favicon.ico
├── server
│   └── tsconfig.json
├── store
│   └── useCounterStore.js
├── tsconfig.json
└── utils
    └── request.js
```

## 响应式布局

技巧：Tailwind 使用移动设备优先的断点系统，先布局小屏幕，再适应大屏幕
