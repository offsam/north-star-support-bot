# North Star Support Bot

Customer support chatbot for an outdoor and camping gear e-commerce store. Built with Next.js and TypeScript, it helps North American shoppers track orders, learn about returns, get gear recommendations, and reach a live agent when needed.

## Features

- **Order Tracking** — look up order status by order number
- **Returns & Exchanges** — 30-day return policy and exchange guidance
- **Product Recommendations** — camping and hiking gear suggestions based on group size and weather
- **Human Handoff** — connect to a live agent at any point in the conversation
- **Fallback Responses** — helpful guidance when the bot does not understand a question

## Test Order Numbers

| Order # | Status |
|---------|--------|
| `111` | Shipped. Arriving tomorrow. |
| `222` | Processing. Ships in 24 hours. |
| `333` | Delivered. |

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the chatbot.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
