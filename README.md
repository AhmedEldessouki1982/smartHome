# AL-Mashareq (المشارق)

E-commerce platform for a home automation and office security business in Egypt. Customers browse products and submit quote requests; pricing is handled off-site.

**Stack**: NestJS 11 + Prisma 4 + PostgreSQL (backend) / React 19 + Vite 8 + Tailwind v4 + Zustand + TanStack Query + shadcn/ui (frontend)

**Contact**: Ahmed Eldessouki — Automation Specialist — +20 128 569 6767 — ahmed@almashareq.com

## Getting Started

### Prerequisites

- Node.js 20+
- Docker (for PostgreSQL)
- npm

### Database

```bash
docker run -d \
  --name 2oo3-postgres \
  -e POSTGRES_USER=eldessouki \
  -e POSTGRES_PASSWORD=root \
  -e POSTGRES_DB=ecommerce \
  -p 5432:5432 \
  postgres:16
```

### Backend

```bash
cd foxware/backend
npm install
npx prisma generate
npx prisma migrate dev
npm run seed
npm run start:dev
```

Runs on `http://localhost:3000`. Swagger docs at `/docs`. All routes prefixed with `/api`.

### Frontend

```bash
cd foxware/frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`.

### Seed Credentials

| Email              | Password  | Role |
|--------------------|-----------|------|
| admin@almashareq.com | admin123  | ADMIN |
| user@almashareq.com  | user123   | USER |

## Architecture

```
foxware/
├── backend/
│   ├── src/
│   │   ├── auth/          # JWT authentication (register, login, roles)
│   │   ├── users/         # User CRUD (admin)
│   │   ├── categories/    # Product categories (admin CRUD)
│   │   ├── products/      # Product catalog (public read, admin CRUD)
│   │   ├── orders/        # Order management (admin CRUD)
│   │   ├── quotes/        # Quote request submissions (public submit, admin manage)
│   │   ├── dashboard/     # Admin dashboard stats
│   │   ├── upload/        # Image upload
│   │   └── prisma/        # Prisma service + schema
│   └── prisma/
│       ├── schema.prisma  # Database schema (9 models)
│       └── seed.ts        # Seed data (5 categories, 15 products, 2 users)
└── frontend/
    └── src/
        ├── pages/         # 16 routes
        ├── sections/      # Hero, Features
        ├── components/    # Layout, UI (shadcn), admin
        ├── store/         # Zustand stores (auth, cart, theme)
        └── lib/           # API client
```

### Backend Modules

| Module    | Public Endpoints          | Admin Endpoints                     |
|-----------|--------------------------|-------------------------------------|
| Auth      | `POST /api/auth/register`, `POST /api/auth/login` | — |
| Products  | `GET /api/products`, `GET /api/products/:id` | `POST`, `PATCH`, `DELETE` |
| Categories| `GET /api/categories`     | `POST`, `PATCH`, `DELETE`           |
| Orders    | —                        | `GET`, `PATCH`, `DELETE`            |
| Quotes    | `POST /api/quotes`       | `GET`, `PATCH /:id/status`, `DELETE`|
| Users     | —                        | `GET`, `DELETE`                     |
| Dashboard | —                        | `GET` (stats)                       |
| Upload    | —                        | `POST /api/upload`                  |

### Frontend Routes

| Route                  | Page              | Access |
|------------------------|-------------------|--------|
| `/`                    | Home              | Public |
| `/shop`                | Product catalog   | Public |
| `/shop/:id`            | Product detail    | Public |
| `/cart`                | Quote request     | Public |
| `/checkout`            | Submit quote      | Public |
| `/quote-confirmation`  | Success page      | Public |
| `/networking`          | Networking products| Public |
| `/servers`             | Server products   | Public |
| `/contact`             | Contact / About   | Public |
| `/login`               | Login             | Public |
| `/register`            | Register          | Public |
| `/orders`              | Order history     | User |
| `/admin`               | Dashboard         | Admin |
| `/admin/products`      | Manage products   | Admin |
| `/admin/categories`    | Manage categories | Admin |
| `/admin/orders`        | Manage orders     | Admin |
| `/admin/users`         | Manage users      | Admin |

### Brand Identity

- **Bilingual title**: Homepage hero shows **المشارق** in Cairo font (Arabic); all other pages use **AL-Mashareq** in English
- **Arabic font**: Cairo (Google Fonts, weights 500/700/900) — geometric Kufi, wide counters, award-winning, free
- **English fonts**: DM Sans (headings), Inter (body), JetBrains Mono (data/prices)
- **Light mode**: Warm off-white `#FAFAF8` background, gold `#D4A853` accent
- **Dark mode**: Charcoal `#1A1A1A` background, brighter gold `#E0B860` accent
- **Theme**: Light / Dark / System toggle with Zustand persistence (key: `almashareq-theme`)
- **Pricing**: Not shown to customers. "Request Quote" flow submits to `/api/quotes` instead of checkout. Admin pages retain prices internally.

### Data Model

Core Prisma models: `User`, `Category`, `Product`, `Order`, `OrderItem`, `Quote`, `QuoteItem` (enum: `QuoteStatus`), `CartItem`

## API Examples

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123","name":"Test User"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@almashareq.com","password":"admin123"}'

# Get products
curl http://localhost:3000/api/products

# Submit quote request
curl -X POST http://localhost:3000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmed",
    "email": "ahmed@example.com",
    "phone": "+201285696767",
    "message": "Need pricing for 3 smart locks",
    "items": [{"productId":"...","name":"Smart Lock Pro","image":"...","quantity":3}]
  }'

# Admin: get all quotes (requires Bearer token)
curl http://localhost:3000/api/quotes \
  -H "Authorization: Bearer <token>"
```

## AI Features

The admin dashboard includes AI-powered tools via OpenRouter (single API for multiple LLM providers).

### Setup

1. Get an API key at [openrouter.ai/keys](https://openrouter.ai/keys)
2. Go to **Admin → Settings** and paste your key
3. The footer shows connection status and token usage

### Quote Lead Scoring

In **Admin → Quotes**, click **Score** on any quote. AI analyzes the request (customer info, items, message) and returns:
- **Score** (1-10) — color-coded: green (8+), amber (5-7), gray (1-4)
- **Priority** — High / Medium / Low
- **Reason** — short explanation

Helps the team prioritize which quotes to respond to first.

### Product Description Generator

In **Admin → Products**, when adding or editing a product, click the **Sparkles** button next to the Description field. AI generates a 2-3 paragraph description based on the product name and category. Edit freely before saving.

### Token Tracking

Token usage is tracked per admin session (in-memory, resets on server restart):
- **Footer**: live token count + estimated cost
- **Settings page**: detailed breakdown (tokens, cost, model)

### Model

Default model: `google/gemini-2.0-flash-lite-001` (fast, cheap for classification + generation). Changeable in `backend/src/ai/ai.service.ts`.

## License

UNLICENSED
