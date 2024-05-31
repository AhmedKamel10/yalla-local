import { useEffect, useState } from 'react';
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import {jwtDecode} from "jwt-decode"
import { useNavigate } from "react-router-dom";

import api from '../api'
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import Navigation_bar from '../components/navbar';
function Landing(){
    const navigate = useNavigate();
    const [imageIndex, setImageIndex] = useState(0);
    const images = ['https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1503342331296-c8ca3b8dd0a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1503341338985-c0477be52513?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'];
  
    useEffect(() => {
      const interval = setInterval(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Change image every 5 seconds
  
      return () => clearInterval(interval);
    }, []);
    return(
      <div>
        <Navigation_bar></Navigation_bar>
      <div className="landing-page" style={{ backgroundImage: `url(${images[imageIndex]})` }}>
        <div className="content">
          <h1>somones Merches</h1>
          <div className="buttons">
          <button  className='login' onClick={()=>{navigate("/register")}}>view merche </button>
          </div>
        </div>
      </div>
      <div className="landing-page" style={{ backgroundImage: `url(https://wallpaperaccess.com/full/5496492.jpg)` }}>
        <div className="content">
          <h1>Abusif merches</h1>
          <div className="buttons">
          <button  className='login' onClick={()=>{navigate("/register")}}>view merche </button>
          </div>
        </div>
      </div>
      <div className="landing-page" style={{ backgroundImage: `url(https://cdn.platinumlist.net/upload/artist/afroto_1350-orig1657718554.png` }}>
        <div className="content">
          <h1>Marawan Mousa merches</h1>
          <div className="buttons">
          <button  className='login' onClick={()=>{navigate("/register")}}>view merche </button>
          </div>
        </div>
      </div>
 
 
      
    </div>
       
    )
}
export default Landing