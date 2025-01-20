import { Hono } from 'hono'
import { apiApp } from './api'
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

app.route('/api', apiApp)
app.route('/blog-image', blogImageApp)

export default app
