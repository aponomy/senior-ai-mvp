# Quick Start Guide

This guide will help you get up and running with the Senior AI MVP project.

## Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)
- A code editor (VS Code recommended)

## Installation

### Step 1: Install Dependencies

Install dependencies for both the client and server:

```bash
# From the root directory
cd apps/client
npm install

cd ../server
npm install
```

## Running the Project

### Option 1: Run Client and Server Separately

**Terminal 1 - Client:**
```bash
cd apps/client
npm run dev
```
The client will start at `http://localhost:5173`

**Terminal 2 - Server:**
```bash
cd apps/server
npm run dev
```
The server will start at `http://localhost:8787`

### Option 2: Use Root Scripts

From the root directory:

```bash
# Start client
npm run dev:client

# Start server (in another terminal)
npm run dev:server
```

## Testing the Setup

1. **Client**: Open `http://localhost:5173` in your browser
   - You should see the counter demo with shadcn/ui buttons
   - Try clicking the buttons to test the UI components

2. **Server**: Test the API endpoints:
   ```bash
   # Health check
   curl http://localhost:8787/health
   
   # Hello endpoint
   curl http://localhost:8787/api/hello
   
   # Echo endpoint
   curl -X POST http://localhost:8787/api/echo \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello, World!"}'
   ```

## Project Structure

```
senior-ai-mvp/
├── apps/
│   ├── client/               # React frontend
│   │   ├── src/
│   │   │   ├── components/   # React components
│   │   │   │   └── ui/       # shadcn/ui components
│   │   │   ├── lib/          # Utility functions
│   │   │   ├── App.tsx       # Main app component
│   │   │   └── index.css     # Global styles
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── package.json
│   │
│   └── server/               # Cloudflare Pages backend
│       ├── src/
│       │   └── index.ts      # Main server file
│       ├── wrangler.toml     # Cloudflare configuration
│       ├── tsconfig.json
│       └── package.json
│
├── package.json              # Root package.json with workspace scripts
└── README.md
```

## Adding Features

### Adding shadcn/ui Components

```bash
cd apps/client
npx shadcn@latest add [component-name]
```

Examples:
```bash
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add form
```

### Adding Server Routes

Edit `apps/server/src/index.ts`:

```typescript
// Add a new GET route
app.get('/api/users', (c) => {
  return c.json({ users: [] })
})

// Add a new POST route
app.post('/api/users', async (c) => {
  const body = await c.req.json()
  // Process the data
  return c.json({ created: true })
})
```

## Building for Production

```bash
# Build everything
npm run build

# Or build individually
npm run build:client
npm run build:server
```

## Next Steps

1. **Set up environment variables**
   - Copy `.env.example` to `.env` in the client directory
   - Copy `.dev.vars.example` to `.dev.vars` in the server directory

2. **Add more components**
   - Explore the shadcn/ui library: https://ui.shadcn.com
   - Add the components you need for your MVP

3. **Connect client to server**
   - Add API calls from your React components
   - Use fetch or a library like axios

4. **Deploy**
   - Client: Deploy to Vercel, Netlify, or similar
   - Server: Deploy to Cloudflare Pages with `npm run deploy`

## Troubleshooting

### Port Already in Use

If port 5173 (client) or 8787 (server) is already in use:

**Client:** Edit `vite.config.ts` and add:
```typescript
export default defineConfig({
  server: {
    port: 3000, // Change to any available port
  },
  // ... rest of config
})
```

**Server:** Add `--port 3001` to the dev script in `package.json`

### Build Errors

1. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Check TypeScript errors:
   ```bash
   npm run typecheck
   ```

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Hono Framework](https://hono.dev/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
