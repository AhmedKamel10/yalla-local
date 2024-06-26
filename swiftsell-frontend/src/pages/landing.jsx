import React, { useRef } from 'react';
import '../styles/LandingPage.css';
import NavigationBar from '../components/navbar';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
  const listRef = useRef(null);
  const navigate = useNavigate();
  const scroll = (scrollOffset) => {
    if (listRef.current) {
      listRef.current.scrollTo({
        left: listRef.current.scrollLeft + scrollOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="gallery">
        <div className="big-image">
          <img src="https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Big Image" />
          <div className="centered">
            <h1> Egypt's biggest local brands hub </h1>
            <h1> YALLA LOCAL</h1>
          </div>
          <button onClick={() => navigate("all/")} className='shop_button'>shop now</button>        </div>
        
      
       
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
