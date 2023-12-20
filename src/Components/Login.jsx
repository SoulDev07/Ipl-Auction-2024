import React,{useState} from "react";
import "../styles/Login.css";
import Typewriter from "typewriter-effect";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from './Config'

export default function Login() {
  const [loginID, setloginID] = useState()
  const [password, setPassword] = useState()
  const [slot,setSlot] = useState()
  const navigate = useNavigate()

  const submit = async() =>{
    const userDetails = {
      name:loginID,
      password:password,
      slot:slot
    }
    const {data} = await axios.post(`${config.serverUrl}/login`,userDetails,{headers:{"Content-Type":"application/json"}})
    if(data.user){
      // alert(data.message)
      localStorage.clear()
      localStorage.setItem("name",data.user.name)
      localStorage.setItem("slot",slot)
      navigate("/dashboard")
    }else{
      alert(data.message)
    }
  }
  return (
    <div className="LandingPage">
      <div className="image-container">
        <img className='image' src="../media/logo.png" alt="" />
      </div>
      <div>
        <span className="Name">
          {" "}
          <Typewriter
            onInit={(typewriter) => {
              typewriter.typeString("IPL AUCTION 2023").pauseFor(1000).deleteAll().typeString("WELCOMES YOU").start().pauseFor(500).deleteAll();
            }} options={{loop:true}}
          />
        </span>
      </div>
      <div className="LoginContainer">
      
        <input type="text" value={loginID} onChange={(e)=>{ setloginID(e.target.value) }} className="input" placeholder="Login ID" />
        <input type="password" value={password} onChange={(e)=>{ setPassword(e.target.value) }}  className="input" placeholder="Password" />
        <input type="text" value={slot} onChange={(e)=>setSlot(Number(e.target.value))} className="input" placeholder="Slot Number"/>
          <button onKeyDown={(e)=>{
            if(e.key==="Enter"){
              submit()
            }
          }} onClick={submit}>Submit</button>
        
      </div>
    </div>
  );
}
