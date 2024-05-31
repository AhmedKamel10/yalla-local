import React, { useState } from 'react';
import axios from 'axios';
import api from '../api'
import "../styles/forms.css"
import Navigation_bar from '../components/navbar';
import { useNavigate } from "react-router-dom";
import Footer from '../components/footer';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [photo, setPhoto] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('http://localhost:8000/api/products/', {name,
            price,
            photo
            });
            console.log(response.data)
            addtoads(response.data.id)
            navigate("/all")

        } catch (error) {
            console.error(error);
        }

        
function addtoads(productID){
        const res=api.post('/api/ads_products/add_to_ads/', {products:productID})  
        console.log(res) 
        }

    };


    return (
        <div>
            <Navigation_bar></Navigation_bar>
        
        <form onSubmit={handleSubmit} className="form-container">
            <h2>product information</h2>
            <input className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input className="form-input" type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="Photo URL" />
            <p>price:</p>
            <input  type="number" value={price} onChange={(e) => setPrice(e.target.value)}  required />
            <button className="form-input" type="submit">Sell</button>
        </form>
        <Footer></Footer>
        </div>
    );
};

export default ProductForm;