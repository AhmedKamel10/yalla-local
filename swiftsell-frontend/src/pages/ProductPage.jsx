import Navigation_bar from '../components/navbar';
import Footer from '../components/footer';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api'
function ProductPage(){
    const {id} = useParams();
    const [data, setData] = useState([]) ;
     useEffect(()=>{

    const fetchdata = () => {
        api
                   .get("/api/products/")
                   .then((res) => res.data.results)
                   .then((data) => {
                       setData(data);
                   })
                   .catch((err) => alert(err));
           
           }

    
           fetchdata();  }, []);

function ProductPageInfo({p}){
    return(
<div className="container">
      
        <img className='img2' src={p.photo}  />
   
      
      <div className="product-details">
        <h1>{p.name}</h1>
        <p className="price">{p.price}</p>
        <p className="availability">In Stock</p>
        <p className="description">{p.description}</p>
        <button  onClick={()=>{addToCart(p.id)

}}> add to cart</button>
        <div className="product-reviews">
          {/* Reviews and ratings can be displayed here */}
        </div>
      </div>
    </div>
  );
}
function addToCart(productID){
    api.post('/api/cart_products/add_to_cart/', {products:productID})
      
    }

    return(
        <div>
                  <Navigation_bar/>


    <div class="container">
        {data.map((p) => {if (p.id == id){ return(<ProductPageInfo p={p}></ProductPageInfo>)}} )}
    
        </div>
        <Footer></Footer>
        </div>
    )}

export default ProductPage;