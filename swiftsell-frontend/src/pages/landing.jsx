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
            <h1>Buy and Sell local brands all in one place </h1>
            <h1> YALLA LOCAL</h1>
          </div>
          <button onClick={() => navigate("all/")} className='shop_button'>shop now</button>        </div>
        <div className="small-images">
          <img src="https://static.pullandbear.net/2/photos//2024/I/0/2/p/7242/540/800/7242540800_2_6_8.jpg?t=1684416407382&imwidth=1024" alt="Small Image 1" className="small-image" />
          <img src="https://static.pullandbear.net/2/photos//2024/V/0/2/p/3241/771/250/3241771250_2_6_0.jpg?imwidth=1024&ts=1710511202032" alt="Small Image 2" className="small-image" />
          <button onClick={()=> {navigate("/all")}} className='mid-button'>exploar</button>
        </div>
        <div className="horizontal-list" ref={listRef}>
          <img src="https://static.pullandbear.net/2/photos//2024/V/0/2/p/3679/702/711/3679702711_4_1_0.jpg?imwidth=750&ts=1707812615387" alt="Horizontal Image 1" className="horizontal-image" />
          <img src="https://static.pullandbear.net/2/photos//2024/V/0/2/p/3243/503/251/3243503251_2_6_8.jpg?t=1710511311878&imwidth=750" alt="Horizontal Image 2" className="horizontal-image" />
          <img src="https://static.pullandbear.net/2/photos//2024/V/0/2/p/8596/516/800/8596516800_2_6_8.jpg?t=1695631766959&imwidth=750" alt="Horizontal Image 3" className="horizontal-image" />
          <img src="https://static.pullandbear.net/2/photos//2024/V/0/2/p/3243/503/251/3243503251_2_6_8.jpg?t=1710511311878&imwidth=750" alt="Horizontal Image 3" className="horizontal-image" />
          <img src="https://static.pullandbear.net/2/photos//2024/V/0/2/p/3241/579/800/3241579800_2_6_8.jpg?t=1712139643978&imwidth=750" alt="Horizontal Image 3" className="horizontal-image" />
          <img src="https://static.pullandbear.net/2/photos//2024/V/0/2/p/3243/502/819/3243502819_2_6_8.jpg?t=1712062786344&imwidth=750" alt="Horizontal Image 3" className="horizontal-image" />

         
        </div>
        <button className="scroll-button left" onClick={() => scroll(-1000)}>
          &lt;
        </button>
        <button className="scroll-button right" onClick={() => scroll(1000)}>
          &gt;
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
