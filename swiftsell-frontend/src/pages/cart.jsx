import { useEffect, useState } from 'react';
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import {jwtDecode} from "jwt-decode"
import axios from 'axios';
import api from '../api'
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import Footer from '../components/footer';

import Navigation_bar from '../components/navbar';

function Cart(){
    const [user, setUser] = useState(0);
    const [cartItem, setCartitem] = useState([]);
    const [product, setProduct] = useState();
    const [data, setData] = useState([])
    const [length, serLength] = useState([])

    useEffect(()=>{
      const fetchCartItems = async () => {
        try {
          const accessToken = localStorage.getItem(ACCESS_TOKEN);
          const decodedToken = jwtDecode(accessToken);
 
          
          const response = await api.get('http://127.0.0.1:8000/api/cart_products/', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
            
          });
          setCartitem(response.data);

        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      };
      
      
        const refreshToken = async ()=>{
            const refreshToken = localStorage.getItem(REFRESH_TOKEN)
            try{
                const res = await api.post("token/refresh/", {
                    refresh: refreshToken,
                });
                //successfull = 200
                if (res.status === 200){
                    localStorage.setItem(ACCESS_TOKEN, res.data.access)

                }
                console.log('good')

            } catch(error){
                console.log(error)

               
            }
            
        }
        const auth = async ()=>{
            const token = localStorage.getItem(ACCESS_TOKEN)
            const decoded = jwtDecode(token)
              
            axios.get(`http://127.0.0.1:8000/api/get-username/${decoded.user_id}/`)

            
            
            .catch(error => {
                console.error('Error:', error);
            });
            const tokenExpiration = decoded.exp
            const now = Date.now() / 1000
            if (tokenExpiration < now){
                await refreshToken()
            }
            
          }


          const fetchdata = () => {
            api
                      .get("/api/products/")
                      .then((res) => res.data)
                      .then((data) => {
                      setData(data);
                       })
                       .catch((err) => alert(err));
               
               }
               fetchCartItems();
               fetchdata();
               auth();
               
        
    }, []); 
    function delete_from_cart(productID){
      api.post('/api/cart_products/delete_from_cart/', {'products':productID})
    }

    function CartItemInfo({ p }) {
      if (!p.products) {
        return <div>Loading...</div>; // Or some other placeholder for when products is None
      }
    
      return (
        <div>      

          
          <div>
          <div> <Link to={`/product/${p.products.id}`}> <img className='img1' src={p.products.photo} ></img></Link></div>
          </div>
          <div>{p.products.name}</div>
          <div>{p.products.price}EGP</div>
          <button onClick={()=>{delete_from_cart(p.products.id)
        
          window.location.reload()
          }}> delete from cart</button>
          <button>Buy now</button>
        </div>
      );
    }

return <div>
  <Navigation_bar></Navigation_bar>

    <div>
      <h1 className='cart_header'>Your cart</h1>
      
      <div className='grid-container'>
        {cartItem.map((item) => (
           <div className='grid-item'><CartItemInfo p={item}></CartItemInfo></div>
  
        ))}
      
    </div>
    </div>
    <Footer></Footer>

   
</div>
  
  }
export default Cart; 