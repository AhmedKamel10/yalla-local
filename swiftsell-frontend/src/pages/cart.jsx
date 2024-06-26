import { useEffect, useState } from 'react';
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import api from '../api';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import Navigation_bar from '../components/navbar';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
function Cart() {
  const [cartItem, setCartitem] = useState([]);
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [number, setNumber] = useState(false);



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
        console.log(response.data)

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
    api.post('/api/cart_products/delete_from_cart/', { 'products': productID })
  }
  const handleclick = (e) => {
    setShowPopup(true);
    setSelectedProduct(e.target.value)


  };
  const closePopup = () => {
    setShowPopup(false);
    setName('');
    setAddress('');
  };
  const handleSubmit = () => {
    console.log("Input 1:", name);
    console.log("Input 2:", address);
    api.post('/api/orders/add_to_orders/' , {'product':selectedProduct ,'name': name, 'address': address, 'number': number})


  };

  function CartItemInfo({ p }) {
    if (!p.products) {
      return null;
    }
    else{
    return (
      <div>
        <div>
          <Link to={`/product/${p.products.id}`}>
            <img className='img1' src={p.products.photo} />
          </Link>
        </div>
        <div>{p.products.name}</div>
        <div>{p.products.price}EGP</div>
        
        <button onClick={() => {
          delete_from_cart(p.products.id);
          window.location.reload();
        }}>delete from cart</button>
        <button value={p.products.id} onClick={handleclick} >Buy now</button>
      </div>
    );
  }}

  return (
    <div>
      <Navigation_bar />

      <div>
        <h1 className='cart_header'>Your cart</h1>

        <div className='grid-container'>
          {
            cartItem.map((item) => (
              cartItem ?(
              <div key={item.id} className='grid-item'>
                <CartItemInfo p={item} />
              </div>
            ):(<div>sdfsdf</div>)))
          }
        </div>
      </div>
      <Footer />
      {showPopup && (
        <Popup open={true} position="right center" onClose={closePopup}>
          <div className="popup-content">
            <div>
              <label>
                username:
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
                number of items
                <input
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="popup-input"
                />
                </label>
                <label>
                address:
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
          </div>
        </Popup>
      )}
    </div>
  );
}

export default Cart;
