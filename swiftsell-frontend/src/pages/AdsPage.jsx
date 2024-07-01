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
              setData(response.data.results)
    
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
    <div className='cart-item'>      

      
      <div>
      <div> <Link to={`/product/${p.products.id}`}> <img className='img3' src={`http://localhost:8000${p.products.photo}`} ></img></Link></div>
      </div>
      <div>
      <div>{p.products.name}</div>
      <div className="price">{p.products.price}EGP</div>
      <p className='description'>{p.products.description}</p>
      <button onClick={()=>{delete_from_ads(p.products.id)
    
      window.location.reload()
      }}> delete ad</button>
      </div>

    </div>
  );

}
    return(
      <div>
        
      <Navigation_bar></Navigation_bar>
      <h1 className='cart_header'>Your ads </h1>

      <div className='cart-container'>
      {data.map((item) => (
           <div><AdstItemInfo p={item}></AdstItemInfo></div>
  
        ))}
      </div>
      <Footer></Footer>
</div>
    )

    }
export default Ads;