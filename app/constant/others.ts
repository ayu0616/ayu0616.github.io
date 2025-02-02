export const PROD =
    process.env.NODE_ENV !== 'development' || import.meta.env.PROD

export const BASE_URL = PROD
    ? 'https://www.hassaku0616.com'
    : 'http://localhost:5173'
export const GCS_URL = 'https://storage.googleapis.com/hassaku-blog-contents'
