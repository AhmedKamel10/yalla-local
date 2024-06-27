import { useEffect, useState } from 'react';
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import api from '../api';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import Navigation_bar from '../components/navbar';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Checkmark } from 'react-checkmark'

function Cart() {
  const [cartItem, setCartitem] = useState([]);
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [number, setNumber] = useState('');
  const [isSubmitted, setIsSubmited] = useState(false);
  const [price, setPrice] = useState();
  useEffect(() => {
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
        console.log(response.data);

      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

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

  }, []);

  function delete_from_cart(productID) {
    api.post('/api/cart_products/delete_from_cart/', { 'products': productID });
  }

  const handleclick = (e) => {
    setShowPopup(true);
    setSelectedProduct(e.target.value);
  };

  const closePopup = () => {
    setShowPopup(false);
    setName('');
    setAddress('');
    setNumber('');
  };

  const handleSubmit = () => {
    console.log("Input 1:", name);
    console.log("Input 2:", address);
    api.post('/api/orders/add_to_orders/', { 'product': selectedProduct, 'name': name, 'address': address, 'number': number }).then(
      response=>{
          setIsSubmited(true)
          setShowPopup(true)
         
            
          
      }
    )
  };

  function CartItemInfo({ p }) {
    if (!p.products) {
      return null;
    }
    
    return (
      <div className="cart-item">
        <div>
          <Link to={`/product/${p.products.id}`}>
            <img className='img3' src={p.products.photo} alt={p.products.name} />
          </Link>
        </div>
        <div className="cart-details">
          <div>{p.products.name}</div>
          <div className="price">{p.products.price} EGP</div>
          <p className='description'>{p.products.description}</p>
          <button className='cart-button' onClick={() => {
            delete_from_cart(p.products.id);
            window.location.reload();
          }}>Delete from cart</button>
          <button className='cart-button' value={p.products.id} onClick={()=>{    setShowPopup(true);
    setSelectedProduct(p.products.id); setPrice(p.products.price)}}>Buy now</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation_bar />

      <div>
        <h3 className='cart_header'>Shoping Cart</h3>

        <div className='cart-container'>
          {
            cartItem.map((item) => (
              <div key={item.id}>
                <CartItemInfo p={item} />
              </div>
            ))
          }
        </div>
      </div>
      <Footer />
      {showPopup && (
        <Popup open={true} position="right center" onClose={closePopup}>
          <div className="popup">
          {isSubmitted ?
          
          <div><Checkmark size='128px' />
          <h3>Name: {name}</h3>         
          <h3>address: {address}</h3>
          <h3>price: {price} EGP</h3>
          <h3>quantity: {number}</h3>

          
          
          </div>:   <div className="popup-content">
            <div>
          
              <label>
                Username:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="popup-input"
                />
              </label>
            </div>
            <div>
              <label>
                Number of items:
                <input
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="popup-input"
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="popup-input"
                />
              </label>
            </div>
            <button onClick={handleSubmit} className="popup-button">Submit</button>
            <button onClick={closePopup} className="popup-button-close">Close</button>
          </div>}
        </div>
        
        </Popup>
      )}
    </div>
  );
}

export default Cart;
