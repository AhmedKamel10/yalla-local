import { useEffect, useState } from 'react';
import api from '../api'
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import Navigation_bar from '../components/navbar';


function Orders() {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get('/api/orders/')
            .then(response => {
                setData(response.data.results);
            })
            .catch(error => console.log(error.response ? error.response.data : error.message));
            
    }, []);

    const handleclick = () => {
        
        api.post('/api/orders/delete_from_orders/' , {'product': product, 'name':name} )
      };
    function OrderInfo({p}){
        return(
        <div className='cart-item'>
      <p>{p.product.seller}</p>
      <div>
        <Link to={`/product/${p.product.id}`}>
          <img className='img3' loading="lazy" src={p.product.photo} alt={p.product.name} />
        </Link>
      </div>
      <div className='cart-details'> 
      <div className='price'>{p.product.price} EGP</div>

      <div className='price'> buyer name: {p.name}</div>
      <p className='description'>{p.product.description}</p>

      <div className='address'> address: {p.address} </div>
      <div> quantity: {p.quantity} </div>
      
      <button className='cart-button' onClick={()=> { api.post('/api/orders/delete_from_orders/' , {'product': p.product.id, 'name':p.name} ) ; window.location.reload();} }>delivered</button>
        </div>
    </div>
    )}

    return (
        <div>
            <Navigation_bar />
            <h3 className='cart_header'>this is what you sold. </h3>
            <div className='cart-container'>
                {data.map((order, index) => (
                    <div key={index}>
                        <OrderInfo p={order}></OrderInfo>

                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default Orders;