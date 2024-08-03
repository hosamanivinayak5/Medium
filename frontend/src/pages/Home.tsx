import { useNavigate } from "react-router-dom"

export const Home = () => {
    const navigate=useNavigate()
  return (
    <div>
      <div className="flex justify-between bg-amber-100	border-b-full	" >
      <div onClick={()=>{
        navigate("/")
      }} className="ml-7 pt-4 cursor-pointer">
        Medium
      </div>
   
       <div className="flex justify-between mr-56">
       <div onClick={()=>{
         navigate("/signin")
        }} className="pr-20 cursor-pointer pt-5">
            Sign in
        </div>
        <div className="pt-2">
        <button onClick={()=>{
            navigate("/signup")
        }} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 
        ">Get started</button>
 </div>
       </div>
      </div>
      </div>
    
  )
}
