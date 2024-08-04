import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export const Home = () => {
    const navigate=useNavigate()
  return (
    <div>
      <div className="flex justify-between bg-amber-50	border-b-full	" >
      <div onClick={()=>{
        navigate("/")
      }} className="ml-52 pt-4 cursor-pointer font-serif font-bold text-3xl">
        Medium
      </div>
   
       <div className="flex justify-between mr-44">
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
      <div className="flex justify-center pt-3 text-lg bg-amber-200 box-border h-14 font-serif font-semibold">
      <div>Be part of a better internet.</div>
 <Link to={"/signup"} className="cursor-pointer underline">
Get 20% off membership for a limited time
</Link>
      </div>
       <div className="bg-amber-50 h-svh">
       <div className="flex justify-center pt-32 h-[75vh]  size border  border-b-gray-400">
        <div className="mr-96 ">
        <div className="flex flex-col">
        <div className="text-8xl font-sans">HUMAN</div>
        <div className="text-8xl font-sans">stories & ideas</div>
        <div className="mt-10 text-2xl font-medium">A place to read, write, and deepen your understanding</div>
       
       <button type="button" onClick={()=>navigate("/signup")} className="text-white mt-8 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full
         text-sm px-5 py-2.5 me-2 mb-2 ">
        Start Reading</button>
        </div>
      </div>
        </div>
        <div  >
         <div className="flex justify-center space-x-4 font-thin text-md mt-2">
         <div >Help</div>
          <div>Status</div>
          <div>About</div>
          <div>Careers</div>
          <div>Press</div>
          <div>Blog</div>
          <div>Privacy</div>
          <div>Terms</div>
          <div>Text to speech</div>
          <div>Teams</div>
         </div>
        </div>
       </div>
      </div>
    
  )
}
