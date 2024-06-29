import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import NavigationBar from '../components/navbar';
import Footer from '../components/footer';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Checkmark } from 'react-checkmark'
import ReactLoading from 'react-loading';


function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [activeButton, setActiveButton] = useState('');
  const [brandactiveButton, setBrandactiveButton] = useState('');
  const [brand, setBrand] = useState([]);
  const [searchBrand, setSearchBrand] = useState('');
  const [darkMode, setDarkMode] = useState(false); 
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {

    const fetchData = async () => {
      try {
        
        const res = await api.get("/api/products/");
        const products = res.data.filter(product => 
          product.seller.toLowerCase().includes(searchBrand.toLowerCase()) &&
          (product.name.toLowerCase().includes(search.toLowerCase()) ||
           product.description.toLowerCase().includes(search.toLowerCase()))
          
        );
        const res2 = await api.get("api/get_brands/");
        setBrand(res2.data);
        setData(products);
      } catch (err) {
        alert(err);
      }
    };
    fetchData();
  }, [search, searchBrand]);

  const ProductInfo = ({ p }) => (
    <div>
      <p>{p.seller}</p>
      <div>
        <Link to={`/product/${p.id}`}>
          <img className='img1' loading="lazy" src={p.photo} alt={p.name} />
        </Link>
      </div>
      <div>{p.name}</div>
      <div>{p.price} EGP</div>
      <button onClick={() => addToCart(p.id)}>Add to Cart</button>
    </div>
  );

  const addToCart = (productId) => {
    try{
      api.post('/api/cart_products/add_to_cart/', { products: productId });
      setShowPopup(true)}
    catch{
      setShowPopup(false)
    }
  };

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  const handleClick = (e) => {
    setActiveButton(e.target.value);
    setSearch(e.target.value);
  };

  const handleBrandClick = (e) => {
    setSearchBrand(e.target.value);
    setBrandactiveButton(e.target.value);
  };
  const closePopup = () => {
    setShowPopup(false);

  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}> {/* Apply dark mode class */}
      <NavigationBar />
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <h1>Brands</h1>
                <li>
                      <button 
                      className={`brand_button ${brandactiveButton === "" ? 'active' : ''}`} 
                      value={""} 
                      onClick={handleBrandClick}
                    >
                      all brands
                    </button>
                </li>
                {brand.map((p, i) => (
                  <li key={i}>
                    <button 
                      className={`brand_button ${brandactiveButton === p.username ? 'active' : ''}`} 
                      value={p.username} 
                      onClick={handleBrandClick}
                    >
                      {p.brand_name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div>
              <input
                type="text"
                className="input-search"
                placeholder="Search any product here"
                onChange={(e) => setSearch(e.target.value)}
                onKeyUp={handleKeypress}
              />
              <button value={""} onClick={handleClick} className={`filter ${activeButton === "" ? 'active' : ''}`}>all</button>
              <button value={"one piece"} onClick={handleClick} className={`filter ${activeButton === "one piece" ? 'active' : ''}`}>one piece</button>
              <button value={"white"} onClick={handleClick} className={`filter ${activeButton === "white" ? 'active' : ''}`}>white</button>
              <button value={"black"} onClick={handleClick} className={`filter ${activeButton === "black" ? 'active' : ''}`}>black</button>
              <button value={"ford"} onClick={handleClick} className={`filter ${activeButton === "ford" ? 'active' : ''}`}>ford</button>
              <button value={"song"} onClick={handleClick} className={`filter ${activeButton === "song" ? 'active' : ''}`}>songs</button>
              <button value={"shows"} onClick={handleClick} className={`filter ${activeButton === "shows" ? 'active' : ''}`}>shows</button>

            </div>

            <div className='grid-container'>
              {data.sort((a, b) => b.id - a.id).map((p, i) => (
                <div className='grid-item' key={i}>
                  <ProductInfo p={p} />
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
      <Footer />
      {showPopup && (
        
        <Popup open={true} position="right center" onClose={closePopup}>
          <div className="popup-content">
            added
            <Checkmark size='128px' />
          </div>
        </Popup>
      )}
    </div>
  );
}

export default Home;
