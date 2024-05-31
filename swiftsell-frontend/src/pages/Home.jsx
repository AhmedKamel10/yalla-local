import { useEffect, useState } from 'react'
import api from "../api";
import Navigation_bar from '../components/navbar';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
function Home(){
  const [data, setData] = useState([])
  const [user, setUser] = useState(0)
  useEffect(()=>{

const fetchdata = () => {
 api
            .get("/api/products/")
            .then((res) => res.data) 
            .then((data) => {
                setData(data);
            })
            .catch((err) => alert(err));
    
    }
    fetchdata();  }, []);
  function Productinfo ({p}){
    return(
      <div>
        <p>{p.seller}</p>
        <div> <Link to={`/product/${p.id}`}> <img className='img1' loading="lazy" src={p.photo} ></img></Link></div>
        <div> {p.name} </div>
        <div>{p.price} EGP</div>
        <button onClick={()=>{addToCart(p.id)
        }}> add to cart</button>
        </div>
    )
  }
  function addToCart(productID){
    api.post('/api/cart_products/add_to_cart/', {products:productID})   
    }
  return (
    <div>
      <Navigation_bar/>


        <div className='grid-container'>{
          data.map((p, i) =>(
            
            <div className='grid-item' key={i}> <Productinfo p={p}></Productinfo>
            </div>
            
          )).sort((a, b) => (b.id > a.id) ? 1:-1)
          
          }
       
        </div>
        <Footer></Footer>
    </div>
  )


}
export default Home;