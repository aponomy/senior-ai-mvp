import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  // Add your Cloudflare bindings here (KV, D1, R2, etc.)
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for the client
app.use('/*', cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}))

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API routes
app.get('/api/hello', (c) => {
  return c.json({ 
    message: 'Hello from Cloudflare Pages!',
    environment: c.env 
  })
})

// Example POST endpoint
app.post('/api/echo', async (c) => {
  const body = await c.req.json()
  return c.json({ 
    received: body,
    timestamp: new Date().toISOString() 
  })
})

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not Found', path: c.req.path }, 404)
})

// Error handler
app.onError((err, c) => {
  console.error(`${err}`)
  return c.json({ error: err.message }, 500)
})

export default app
