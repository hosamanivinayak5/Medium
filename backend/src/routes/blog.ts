import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode,  sign, verify } from 'hono/jwt'
import { createBlogInput,updateBlogInput } from "@hosamanivinayak5/common"
export const blogrouter=new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_Secret:string,
    },
    Variables:{
        userId:string;
    }
}>()

blogrouter.use("/*",async(c,next)=>{
    const authheader=c.req.header("authorization")||""
    const user= await verify(authheader,c.env.JWT_Secret)
  try{if(user) 
    {  //
        c.set("userId",user.id as string);
       await next()
    }
    else{
       c.status(403)
       return c.json({
           msg:"You are not logged in"
       })
    }} catch(err)
    {
        c.status(403)
        return c.json({
            msg:"ffdsfa"
        })
    }
   
})
blogrouter.post('/',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const body=await c.req.json()
    const {success}=createBlogInput.safeParse(body)
    if(!success)
    {
        c.status(411)
        return c.json({
            msg:"Title or content invalid"
        })
    }
    const authorId=c.get("userId")
    const blog= await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:authorId
        }
     })
    return c.json({
        id:blog.id
    })
})
blogrouter.put('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const body=await c.req.json()
    const {success}=updateBlogInput.safeParse(body)
    const blog=await prisma.post.update({
        where:{
            id:body.id,
        },
        data:{
            title:body.title,
            content:body.content,
        }
    })
    return c.json({
        id:blog.id
    })
})
blogrouter.get('/bulk',async(c)=>{
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate())
        try{
            const blogs=await prisma.post.findMany({
             select:{
                title:true,
                content:true,
                id:true,
                author:{
                    select:{
                        name:true,
                    }
                }
             }
            })
            return c.json({
                blogs,
            })
        }catch(err){
            c.status(411);
            return c.json({
                msg:"blog post nof found"
            })
        }
        
})
blogrouter.get('/:id',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const id=c.req.param("id")
    try{
        const blog=await prisma.post.findUnique({
            where:{
                id:id
            },
            select:{
                title:true,
                content:true,
                id:true,
                author:{
                    select:{
                        name:true,
                    }
                }
             }
            
        })
        return c.json({
            blog,
        })
    }catch(err){
        c.status(411);
        return c.json({
            msg:"blog post nof found"
        })
    }

})
