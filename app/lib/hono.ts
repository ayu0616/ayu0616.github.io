import { hc } from 'hono/client'
import type { ApiApp } from 'server/api'

const PROD = process.env.NODE_ENV !== 'development' || import.meta.env.PROD

const baseUrl = PROD
    ? 'https://portfolio-web-411170282896.asia-northeast1.run.app/api'
    : 'http://localhost:5173/api'

export const honoClient = hc<ApiApp>(baseUrl)
