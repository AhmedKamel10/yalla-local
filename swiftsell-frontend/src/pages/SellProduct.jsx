import React, { useState, useEffect } from 'react';
import api from '../api';
import "../styles/forms.css";
import Navigation_bar from '../components/navbar';
import { useNavigate } from "react-router-dom";
import Footer from '../components/footer';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [photo, setPhoto] = useState(null); // Use null instead of an empty string for file
    const [description, setDescription] = useState('');
    const [n, setN] = useState(1);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // FormData to send files
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('photo', photo); // Append the file object
            formData.append('description', description);

            const response = await api.post('http://localhost:8000/api/products/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set content type for FormData
                }
            });
            addtoads(response.data.id);
            navigate("/all");
        } catch (error) {
            console.error(error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file); // Store the selected file object
    };

    const addtoads = async (productID) => {
        try {
            const res = await api.post('/api/ads_products/add_to_ads/', { products: productID });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const get_brands = async () => {
            try {
                const res = await api.get("/api/brand_account/");
                setN(res.data.results.length);
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
                    <textarea cols={10} rows={5} placeholder='Write the product description' value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <input className="form-input" type="file" onChange={handleFileChange} accept="image/*" required /> {/* File input for photo */}
                    <p>Price:</p>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    <button className="form-input" type="submit">Sell</button>
                </form>
            ) : (
                <div className='information-needed'>
                    <h2>Please send this information to this E-mail: yalla-local@gmail.com:</h2>
                    <h3>Your name</h3>
                    <h3>Phone number</h3>
                    <h3>Brand name</h3>
                    <h3>Social media accounts if available</h3>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default ProductForm;
