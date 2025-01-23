import { hc } from 'hono/client'
import type { ApiApp } from 'server/api'

const PROD = process.env.NODE_ENV !== 'development' || import.meta.env.PROD

const baseUrl = import.meta.env.VITE_APP_URL || 'http://localhost:5173'

export const honoClient = hc<ApiApp>(new URL('/api', baseUrl).toString())
