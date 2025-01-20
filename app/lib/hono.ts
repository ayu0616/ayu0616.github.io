import { hc } from 'hono/client'
import type { ApiApp } from 'server/api'

export const honoClient = hc<ApiApp>('http://localhost:5173/api')
