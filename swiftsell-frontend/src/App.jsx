import React, { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Cart from "./pages/cart"
import ProductPage from "./pages/ProductPage"
import ProductForm from './pages/SellProduct';
import ProtectedRoute from "./components/PerotectedRoute"
import Ads from './pages/AdsPage'
import Profile from './pages/Profile'
import Landing from './pages/landing'
import Orders from "./pages/orders";
function Logout(){
    return <Navigate to="/login"/>

}
function RegisterAndLogout(){
    localStorage.clear()
    return <Register/>
}



function App(){
    useEffect(()=>{


    })
    return (
        <div>

        <>
        <BrowserRouter>
        <Routes>
            <Route exact path="/login" element={<Login></Login>}></Route>
            <Route exact path="/register" element={<Register></Register>}></Route>
            <Route exact path="/all"  element={<ProtectedRoute> <Home></Home> </ProtectedRoute>}></Route>
            <Route exact path="/cart"  element={<ProtectedRoute> <Cart></Cart> </ProtectedRoute>}></Route>
            <Route exact path='/product/:id' element={<ProtectedRoute><ProductPage></ProductPage> </ProtectedRoute>}/>
            <Route exact path='/sell' element={<ProtectedRoute><ProductForm /> </ProtectedRoute>}/>
            <Route exact path='/ads' element={<ProtectedRoute> <Ads></Ads> </ProtectedRoute>}/>
            <Route exact path='/orders' element={<ProtectedRoute> <Orders></Orders> </ProtectedRoute>}/>

            <Route exact path='/profile' element={<ProtectedRoute> <Profile></Profile> </ProtectedRoute>}/>
            <Route exact path="/" element={<Landing></Landing>}></Route>
        </Routes>
        </BrowserRouter>
        </>
        </div>
        
    )
}
export default App;