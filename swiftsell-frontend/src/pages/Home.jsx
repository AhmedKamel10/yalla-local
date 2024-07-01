import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import NavigationBar from '../components/navbar';
import Footer from '../components/footer';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Checkmark } from 'react-checkmark';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [activeButton, setActiveButton] = useState('');
  const [brandactiveButton, setBrandactiveButton] = useState('');
  const [brand, setBrand] = useState([]);
  const [searchBrand, setSearchBrand] = useState('');
  const [darkMode, setDarkMode] = useState(false); 
  const [showPopup, setShowPopup] = useState(false);
  const [cover, setCover] = useState('');
  const [resultNumber, setResultNumber] = useState(2);
  const [ nextpage, setNextpage] = useState()
  const [ prevpage, setPrevpage] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/api/products/");
        const products = res.data.results.filter(product => 
          product.seller.toLowerCase().includes(searchBrand.toLowerCase()) &&
          (product.name.toLowerCase().includes(search.toLowerCase()) ||
           product.description.toLowerCase().includes(search.toLowerCase())));
        const res2 = await api.get("/api/get_brands/");
        setBrand(res2.data.results);
        setData(products);
        console.log(res.data.previous)
        if (res.data.next){
          setNextpage(res.data.next)
        }
        if (res.data.previous){
          setPrevpage(res.data.previous)
        }
      } catch (err) {
        alert(err);
      }
    };
    fetchData();
  }, [search, searchBrand]);
  
  const handle_pagination = async (url)=>{
    try{

    const res = await api.get(url);
    const products = res.data.results.filter(product => 
      product.seller.toLowerCase().includes(searchBrand.toLowerCase()) &&
      (product.name.toLowerCase().includes(search.toLowerCase()) ||
       product.description.toLowerCase().includes(search.toLowerCase())));
    setNextpage(res.data.next)
    setPrevpage(res.data.previous)
    setData(products);

  }
catch{
  console.log('end')
}}

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

  const addToCart = async (productId) => {
    try {
      await api.post('/api/cart_products/add_to_cart/', { products: productId });
      setShowPopup(true);
    } catch {
      setShowPopup(false);
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



  const BannerCarousel = () => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      autoplay: true,
      autoplaySpeed: 3000,
    };

    return (
      <>
        {brandactiveButton === "" ? (
          <div className="banner-carousel">
            <Slider {...settings}>
              <div>
                <img
                  className="banner-img"
                  src='https://yt3.googleusercontent.com/AXSp5GvfxtEVWXfK8H5wtrmwI0k4tV1kiy9eniq70fSJ6i4WLAPk-QNV7ScYYuYZUa23VztZ2Ps=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj'
                  alt="banner 1"
                />
              </div>
              <div>
                <img
                  className="banner-img"
                  src="https://yt3.googleusercontent.com/vtHU2tm7VSt6M3sRCUd7cKLqDhYz07WtJCK3gX-pQbI--_lebY67L2gREBF1ueZ-ZfEnPW48=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
                  alt="banner 2"
                />
              </div>
              <div>
                <img
                  className="banner-img"
                  src="https://yt3.googleusercontent.com/UKFjOurn2i33cyI4BLTWW8PRGan_TPDuBBoCmzFnOmCYlfSE_qDqt66xy3qfWDihIwquhKwwGw=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
                  alt="banner 3"
                />
              </div>
            </Slider>
          </div>
        ) : (
          <div className="banner-carousel">
            <Slider>
              <div>
                <img
                  className="banner-img"
                  src={cover}
                  alt="banner 1"
                />
              </div>
              <div>
                <img
                  className="banner-img"
                  src={cover}
                  alt="banner 2"
                />
              </div>
              <div>
                <img
                  className="banner-img"
                  src={cover}
                  alt="banner 3"
                />
              </div>
            </Slider>
          </div>
        )}
      </>
    );
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
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
                      onClick={() => { setSearchBrand(p.username); setBrandactiveButton(p.username); setCover(p.cover_image_url); }}  
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
              <button value={"سكرو"} onClick={handleClick} className={`filter ${activeButton === "سكرو" ? 'active' : ''}`}>سكرو</button>
              <button value={"black"} onClick={handleClick} className={`filter ${activeButton === "black" ? 'active' : ''}`}>black</button>
              <button value={"ford"} onClick={handleClick} className={`filter ${activeButton === "ford" ? 'active' : ''}`}>ford</button>
              <button value={"song"} onClick={handleClick} className={`filter ${activeButton === "song" ? 'active' : ''}`}>songs</button>
              <button value={"shows"} onClick={handleClick} className={`filter ${activeButton === "shows" ? 'active' : ''}`}>shows</button>
            </div>
            <BannerCarousel />
            <div className='grid-container'>
              {Array.isArray(data) && data.map((p, i) => (
                <div className='grid-item' key={i}>
                  <ProductInfo p={p} />
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
      
      <Popup open={showPopup} closeOnDocumentClick onClose={closePopup}>
        <div className="modal">
          <a className="close" onClick={closePopup}>
            &times;
          </a>
          <div className="content">
            <Checkmark size='xxLarge' color='#4BB543' />
            <div className='check-div'>
              <h4>Item added to cart</h4>
            </div>
          </div>
        </div>
      </Popup>
      <div className='page_buttons'>
      <button onClick={()=> handle_pagination(prevpage)} className='more'>previouse</button>
      <button onClick={()=> handle_pagination(nextpage)} className='more'>next</button>
      </div>
      <Footer />
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
}

export default Home;
