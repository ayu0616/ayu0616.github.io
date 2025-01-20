import { Hono } from 'hono'
import { blogImageApp } from './blog-image'

const app = new Hono()

app.use(async (c, next) => {
    await next()
    c.header('X-Powered-By', 'Remix and Hono')
})

app.get('/api', (c) => {
    return c.json({
        message: 'Hello',
    })
})

app.route('/blog-image', blogImageApp)

export default app
