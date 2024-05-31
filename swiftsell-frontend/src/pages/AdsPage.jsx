import { useEffect, useState } from 'react';
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import {jwtDecode} from "jwt-decode"

import api from '../api'
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import Navigation_bar from '../components/navbar';

function Ads(){
  const [data, setData] = useState([])
    useEffect(()=>{
        
        const fetchAdsItems = async () => {
            try {
              const accessToken = localStorage.getItem(ACCESS_TOKEN);
              const decodedToken = jwtDecode(accessToken);
     
              
              const response = await api.get('http://127.0.0.1:8000/api/ads_products/', {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
                
              });
              console.log(response.data)
              setData(response.data)
    
            } catch (error) {
              console.error('Error fetching cart items:', error);
            }
          };
          
               
        fetchAdsItems()
        
    }, []); 

function delete_from_ads(productID){
  api.post('/api/ads_products/delete_from_ads/', {'products':productID})

}
function AdstItemInfo({p}){
  return (
    <div>      

      
      <div>
      <div> <Link to={`/product/${p.products.id}`}> <img className='img1' src={p.products.photo} ></img></Link></div>
      </div>
      <div>{p.products.name}</div>
      <div>{p.products.price}EGP</div>
      <button onClick={()=>{delete_from_ads(p.products.id)
    
      window.location.reload()
      }}> delete ad</button>
    </div>
  );

}
    return(
      <div>
      <Navigation_bar></Navigation_bar>
      <div className='grid-container'>
      {data.map((item) => (
           <div className='grid-item'><AdstItemInfo p={item}></AdstItemInfo></div>
  
        ))}
      </div>
      <Footer></Footer>
</div>
    )

    }
export default Ads;