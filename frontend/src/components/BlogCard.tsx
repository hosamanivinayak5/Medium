
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


export interface BlogCardProp{
    authorName:string,
    title:string,
    content:string,
    publishedDate:string,
    id:number
}
export const BlogCard = ({authorName,title,content,publishedDate,id}:BlogCardProp) => {
  return (<Link to={`/blog/${id}`}>
    <div className=" p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointerr"  >
      <div className="flex">
        <div className="flex ">
        <Avatar name={authorName}/>  
        </div>
      
      <div className="font-thin pl-2 text-sm flex justify-center flex-col">{authorName}</div>
      <div className="flex justify-center flex-col pl-2">
        <Circle/>
      </div>
      <div className="pl-2 font-thin text-slate-400 text-sm flex justify-center flex-col">
       {publishedDate}
      </div>
      
      </div>
      <div className="text-xl font-bold pt-2">
        {title}
      </div>
      <div className="text-md font-thin pt-2">
        {content.slice(0,100) +"..."}
      </div>
      <div className="text-slate-400 pt-4">
        {`${Math.ceil(content.length/100)} minutes read`}
      </div>
    </div>
    </Link>
  )
}
export function Circle()
{
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}
export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
  const navigate=useNavigate()
  const [open,setopen]=useState<boolean>(false)
  const handledropdow=(state:boolean)=>{
     setopen(!state)
  }
    return <div onClick={()=>handledropdow(open)} className={` relative inline-flex items-center justify-center overflow-hidden bg-gray-100  dark:bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name[0]}
    </span>
    <div>
    {open&&(
      <div className="">
        <button className="" onClick={()=>{
        localStorage.removeItem("token")
        navigate("/")
      }}>
        Signout
      </button>
      </div>
      
    )}
    </div>
    
</div>
}
