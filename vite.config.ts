import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { getClientIpFromRequest, processContactSubmission, readJsonBody } from './server/contact-handler.js'

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
      server.middlewares.use('/api/contact', async (req, res, next) => {
        if (req.method !== 'POST') return next()

        try {
          const body = await readJsonBody(req)
          const result = await processContactSubmission({
            body,
            env: process.env,
            clientIp: getClientIpFromRequest(req)
          })

          res.statusCode = result.status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result.body))
        } catch (error) {
          console.error('Local contact API error', error)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: false, error: 'Internal server error.' }))
        }
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
