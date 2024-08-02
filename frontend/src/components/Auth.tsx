import { SigninInput, SignupInput } from "@hosamanivinayak5/common"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  axios from "axios"
import { BACKEND_URL } from "../config"
export const Auth=({type}:{type:"signup" |"signin"})=>{
    const navigate=useNavigate()
    const [postinputs,setpostinputs]=useState<SignupInput>({
        name:"",
        username:"",
        password:""
    }) 
    const [postinputs1,setpostinputs1]=useState<SigninInput>({
        username:"",
        password:""
    })
  async   function sendRequest()
    {
        try{
        const response=await  axios.post(`${BACKEND_URL}/api/v1/user/${type==='signup'?"signup":"signin"}`, type==='signup'?postinputs:postinputs1)
        const jwt=response.data.jwt;
        localStorage.setItem("token",jwt)
        navigate("/blogs")
    }catch(err){
     alert("error while signing up")
    }
      
    }
    return<div className="h-screen flex justify-center flex-col">
    <div className="flex justify-center">
        <div className="px-10">
    <div>
       <div className="text-3xl font-extrabold">
       Create your account
        </div>
        <div className=" text-slate-400">
           {
            type==="signup"?" Already have an account ? ":" Don't have an account ? "
           }<Link className="pt-2 underline" to={type==="signup"? "/signin":"/signup"}>
            { 
            type==="signup"? "Sign in":"Sign up"
            }</Link>
        </div>
    </div>
    <div className="pt-4">
  {type==="signup"?  <LabelledInput label="Name" placeholder="Vinayak " onchange={(e)=>{
        setpostinputs({
            ...postinputs,
            name:e.target.value,})
    }}/> :null}
    <LabelledInput label="Username" placeholder="Vinayak@gsdafds.com" onchange={(e)=>{
       type==='signup'? setpostinputs({
            ...postinputs,
            username:e.target.value,
        }):setpostinputs1({
            ...postinputs1,
            username:e.target.value,
        })
    }}/>
    <LabelledInput label="Password" type={"password"} placeholder="absfads@1231434" onchange={(e)=>{
     type==="signup"?   setpostinputs({
            ...postinputs,
            password:e.target.value,
        }):setpostinputs1({
            ...postinputs1,
            password:e.target.value,
        })
    }}/>
    <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
     dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700
      dark:border-gray-700">{type==="signup" ? "Sign up" :"Sign in"}</button>
    </div>
    </div>
    </div>
 </div>
}
interface labbledinput{
    label:string,
    placeholder:string,
    onchange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?:string

}
function LabelledInput({label,placeholder,onchange,type}:labbledinput){
    return <div className="mb-6">
        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        <input type={type||"text"} onChange={onchange}  id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
         placeholder={placeholder} required />
    </div> 
    
   
}