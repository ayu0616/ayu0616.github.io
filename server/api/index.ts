import { Hono } from 'hono'
import { blogApp } from './blog'

export const apiApp = new Hono().route('/blog', blogApp)

export type ApiApp = typeof apiApp
