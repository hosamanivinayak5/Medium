import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signinInput, signupInput } from "@hosamanivinayak5/common";
export const userrouter = new Hono();
userrouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            msg: "Inputss not correct",
        });
    }
    try {
        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
                name: body.name,
            }
        });
        const token = await sign({ id: user.id }, c.env.JWT_Secret);
        return c.json({
            msg: `User with username:${user.username} created succesfully`,
            jwt: token,
        });
    }
    catch (err) {
        c.status(403);
        console.log(err);
        return c.json({ error: "error while signing up" });
    }
});
userrouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            msg: "Inputss not correct",
        });
    }
    const user = await prisma.user.findUnique({
        where: {
            username: body.username,
            password: body.password
        }
    });
    if (!user) {
        c.status(403);
        return c.json({ msg: "Invalid credentials" });
    }
    const jwt = await sign({ id: user?.id }, c.env.JWT_Secret);
    return c.json({ jwt:jwt, });
});
