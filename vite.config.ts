import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

function decapAdminMiddleware(): Plugin {
  return {
    name: 'decap-admin-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] ?? ''
        if (url === '/admin') {
          res.statusCode = 302
          res.setHeader('Location', '/admin/')
          res.end()
          return
        }

        if (url !== '/admin/' && url !== '/admin/index.html') {
          return next()
        }

        const adminIndexPath = path.resolve(process.cwd(), 'public/admin/index.html')
        if (!existsSync(adminIndexPath)) {
          res.statusCode = 404
          res.end('Admin interface not found.')
          return
        }

        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(readFileSync(adminIndexPath, 'utf8'))
      })
    }
  }
}

function contactApiMiddleware(): Plugin {
  return {
    name: 'contact-api-middleware',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res, next) => {
        if (req.method !== 'POST') return next()

        let raw = ''
        req.on('data', (chunk) => {
          raw += chunk
        })

        req.on('end', () => {
          try {
            const json = raw ? JSON.parse(raw) : {}
            const botField = String(json.botField ?? '')
            const createdAt = Number(json.createdAt ?? 0)

            // Basic anti-spam gate: honeypot must be empty and submission must not be instantaneous.
            const timeOnPageMs = createdAt ? Date.now() - createdAt : 0
            const isSpam = botField.trim().length > 0 || timeOnPageMs < 1200

            if (isSpam) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: false, error: 'spam' }))
              return
            }

            // Prototype response: in production, connect your email/contact backend here.
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true }))
          } catch {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: 'invalid-json' }))
          }
        })
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    strictPort: true
  },
  preview: {
    port: 3000,
    strictPort: true
  },
  plugins: [decapAdminMiddleware(), react(), contactApiMiddleware()],
})
