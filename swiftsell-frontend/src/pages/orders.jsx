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
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => console.log(error.response ? error.response.data : error.message));
            
    }, []);

    const handleclick = () => {
        
        api.post('/api/orders/delete_from_orders/' , {'product': product, 'name':name} )
      };
    function OrderInfo({p}){
        return(
        <div>
      <p>{p.product.seller}</p>
      <div>
        <Link to={`/product/${p.product.id}`}>
          <img className='img1' loading="lazy" src={p.product.photo} alt={p.product.name} />
        </Link>
      </div>
      <div>{p.name}</div>
      <div>{p.product.price} EGP</div>
      <div>{p.address} </div>
      <div>{p.quantity} </div>
      
      <button onClick={()=> { api.post('/api/orders/delete_from_orders/' , {'product': p.product.id, 'name':p.name} ) ; window.location.reload();} }>delivered</button>
        </div>
    )}

    return (
        <div>
            <Navigation_bar />
            <h1>this is what you sold. </h1>
            <div className='grid-container'>
                {data.map((order, index) => (
                    <div className='grid-item' key={index}>
                        <OrderInfo p={order}></OrderInfo>

                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default Orders;