import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode,  sign, verify } from 'hono/jwt'
import { userrouter } from './routes/user'
import { blogrouter } from './routes/blog'
import { cors } from 'hono/cors'
const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_Secret:string,
  }
}>()
app.use("/*",cors())
app.route("/api/v1/user",userrouter)
app.route("/api/v1/blog",blogrouter)








export default app
