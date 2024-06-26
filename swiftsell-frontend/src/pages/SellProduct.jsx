import React, { useState, useEffect } from 'react';
import api from '../api';
import "../styles/forms.css";
import Navigation_bar from '../components/navbar';
import { useNavigate } from "react-router-dom";
import Footer from '../components/footer';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [photo, setPhoto] = useState('');
    const [n, setN] = useState(1); 
    const navigate = useNavigate();
    const [description, setDescription] = useState('');  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('http://localhost:8000/api/products/', {
                name,
                price,
                photo,
                description
            });
            console.log(response.data);
            addtoads(response.data.id);
            navigate("/all");
        } catch (error) {
            console.error(error);
        }
    };

    const addtoads = async (productID) => {
        try {
            const res = await api.post('/api/ads_products/add_to_ads/', { products: productID });
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const get_brands = async () => {
            try {
                const res = await api.get("/api/brand_account/");
                setN(res.data.length);
                console.log(n)
            } catch (error) {
                console.error(error);
            }
        };
        get_brands();
    }, []);

    return (
        <div>
            <Navigation_bar />
            {n !== 0 ? (
                <form onSubmit={handleSubmit} className="form-container">
                    <h2>Product Information</h2>
                    <input className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                    <textarea cols={10} rows={5} placeholder='write the product description' name="postContent" onChange={(e)=>{setDescription(e.target.value)}} />       
                    <input className="form-input" type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="Photo URL" />
                    <p>Price:</p>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    <button className="form-input" type="submit">Sell</button>
                </form>
            ) : (
                <div className='information-needed'>
                <h2>    please send this information to this E-mail: yalla-local@gmail.com : </h2>
                <h3> <p>  </p>   your name</h3>
                <h3>  <p>  </p>   phone number</h3>
                <h3>   <p>  </p>  brand name</h3>
                <h3>   <p>  </p>  social media accounts if available</h3>

                </div>
            )}
            <Footer />
        </div>
    );
};

export default ProductForm;
