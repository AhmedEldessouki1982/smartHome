---
name: ahmed-stack
description: |
  Full-stack app builder for Ahmed's exact OpenCode setup: React + Vite + TypeScript + Tailwind CSS + shadcn/ui + Lucide React (frontend) and NestJS + TypeScript (backend). Produces visually stunning, animated, production-grade interfaces for landing pages, SaaS apps, and e-commerce. Supports three modes: full-stack (BE + FE), frontend-only, or backend-only. Use this skill whenever the user says: "build me an app", "create a landing page", "scaffold a SaaS", "make an e-commerce", "create a backend", "build a REST API", "make a frontend", "design a UI", "build a dashboard", "create a store", "make a pricing page", "scaffold a project", or any similar project-start trigger. ALWAYS use this skill when starting any new app, page, component set, or API  even if the request is casual or brief like "make me a saas" or "landing page for X". The output should always be beautiful, animated, and professional  never plain or unstyled.
---

# Ahmed Stack Builder

Builds production-grade full-stack apps (or FE/BE alone) for Ahmed's OpenCode workflow.

**Stack:**
- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui + Lucide React
- **Backend**: NestJS + TypeScript + class-validator + Swagger
- **Animation**: Framer Motion (primary), Tailwind `animate-*` utilities
- **Data**: TanStack Query (frontend), Prisma ORM (backend, when DB needed)

---

## Step 0  Read the right reference files first

| What you're building | Read |
|---|---|
| Any frontend or full-stack | `references/design-system.md` (colors, animation, components) |
| Landing page | `references/landing-patterns.md` |
| SaaS app | `references/saas-patterns.md` |
| E-commerce | `references/ecommerce-patterns.md` |
| Backend API | `references/nestjs-setup.md` |

Always read `references/design-system.md` for every frontend task  it contains the animation rules, color system, and component patterns that make the UI attractive.

---

## Step 1  Understand the request

Ask (or infer from context) three things:

1. **Mode**: Full-stack / Frontend only / Backend only
2. **App type**: Landing page / SaaS / E-commerce / Dashboard / Custom
3. **Name**: If not given, propose a short lowercase-hyphenated name

If the user gave enough context to infer these, do not ask  proceed directly.

---

## Step 2  Folder structure

### Full-stack
```
<project-name>/
├── frontend/     
├── backend/      


└── dev.sh        

```

### Frontend only
```
<project-name>/
└── frontend/
```

### Backend only
```
<project-name>/
└── backend/
```

Never monorepo unless explicitly asked.

---

## Step 3  Frontend scaffold

```bash
npm create vite@latest frontend -- --template react-ts
cd frontend && npm install
```

### Tailwind (v4 approach)
```bash
npm install -D tailwindcss @tailwindcss/vite
```

`vite.config.ts`:
```ts
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } }
})
```

`src/index.css`:
```css
@import "tailwindcss";
```

### shadcn/ui
```bash
npx shadcn@latest init
# Style: Default | Base color: Zinc | CSS variables: Yes
npx shadcn@latest add button card badge input label separator sheet navigation-menu dropdown-menu avatar tooltip tabs accordion dialog
```

### Animation
```bash
npm install framer-motion
```

### Icons + extras
```bash
npm install lucide-react
npm install @tanstack/react-query
npm install clsx tailwind-merge class-variance-authority
```

### Path alias in tsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

### App entry (`src/App.tsx`)
```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import Router from '@/router'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <Router />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
```

---

## Step 4  Backend scaffold

```bash
npm install -g @nestjs/cli
nest new backend --package-manager npm
cd backend && npm install
npm install @nestjs/config @nestjs/swagger swagger-ui-express class-validator class-transformer
npm install -D @types/node
```

### Standard `main.ts`
```ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' })
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME || 'API')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config))

  await app.listen(process.env.PORT || 3000)
  console.log(`[32m[1m[40m[39m[22m[24m[90m[39m🚀 Backend running at http://localhost:3000[0m`)
  console.log(`[36m[1m[40m[39m[22m[24m[90m[39m📚 Swagger docs at http://localhost:3000/docs[0m`)
}
bootstrap()
```

---

## Step 5  Dev script (full-stack only)

`dev.sh` in project root:
```bash
#!/bin/bash
# truncated for brevity here in the skill file
```

---

## Step 6  Build the UI

Read `references/design-system.md` fully before writing any component.

**Always keep:** animated elements, dark mode default, hover transitions, gradients, glassmorphism cards, mobile-first.

For each app type, read:
- Landing page → `references/landing-patterns.md`
- SaaS → `references/saas-patterns.md`
- E-commerce → `references/ecommerce-patterns.md`

---

## Step 7  Output to user

Provide cd commands, npm install commands, dev commands, and summary.

---

## OpenCode prompting tips

Use provided detailed prompts for pages, components, backend modules.

---

## Sidebar, Stat Cards, TanStack Query hooks, Auth pages, NestJS modules and more

Full detailed code samples and references included.

---

## References:
- SaaS App Patterns
- NestJS Backend Setup
- Landing Page Patterns
- E-commerce Patterns
- Design System Reference
