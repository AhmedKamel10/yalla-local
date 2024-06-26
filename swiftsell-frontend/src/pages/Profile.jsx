import { useEffect, useState } from 'react';
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import {jwtDecode} from "jwt-decode"
import api from '../api'
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import Navigation_bar from '../components/navbar';
function Profile(){
  const [user, setUser] = useState('')
  useEffect(()=>{
    api
    .get("http://127.0.0.1:8000/api/get-username/")
    .then((res) => res.data) 
    .then((user) => {
      setUser(user);
      
  })
    .catch((err) => alert(err));
  }, [])
  

    return(
        <div>
        <Navigation_bar></Navigation_bar>
        <div className="profile-container">
      <div className="profile-header">
        <h1>Welcome, {user.username} !</h1>
        
      </div>
      <div className="profile-links">
        <Link to="/cart" className="profile-link">Cart</Link>
        <Link to="/orders" className="profile-link">Orders</Link>
        <Link to="/ads" className="profile-link">Your Ads</Link>
        <Link to="/sell" className="profile-link">Sell</Link>
        <Link to="/logout" className="profile-link">Logout</Link>
      </div>

    </div>
        <Footer></Footer>
        </div>

            
    )


}
export default Profile;