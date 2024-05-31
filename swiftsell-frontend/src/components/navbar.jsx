import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import api from '../api'
function Navigation_bar(){

  const [count, setCount] = useState(0)
  useEffect(() => {
    api.get('api/cart_products/').then(res => {
      console.log(res.data.length)
      setCount(res.data.length); // Assuming the data is in res.data
    });
  }, []);
    return(
      <div>
        <Navbar bg="black" expand="lg" variant="dark" className="main-navbar">
        <div className="container-fluid px-3 top-navbar">
          <Navbar.Brand href="/all" className="brand-name">yalla local</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/all" className="nav-link">Home</Nav.Link>
              <Nav.Link as={Link} to="/all" className="nav-link">All Categories</Nav.Link>
              <Nav.Link as={Link} to="/new-collection" className="nav-link">New collection</Nav.Link>
              <Nav.Link as={Link} to="/featured-products" className="nav-link">Featured Products</Nav.Link>
              <Nav.Link as={Link} to="/accessories" className="nav-link">Accessories</Nav.Link>
            </Nav>
            <Form className="d-flex ms-auto">
              <FormControl
                type="search"
                placeholder="Search your product"
                className="me-2"
                aria-label="Search"
                style={{ width: '300px' }}
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Nav>
              <Nav.Link as={Link} to="/cart" className="nav-link"><i className="fa fa-shopping-cart"></i> Cart ({count})</Nav.Link>
              <NavDropdown title={<><i className="fa fa-user"></i> profile </>} id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile"><i className="fa fa-user"></i> Profile</NavDropdown.Item>
                <NavDropdown.Item href="/cart"><i className="fa fa-shopping-cart"></i> My Cart</NavDropdown.Item>
                <NavDropdown.Item href='/ads' className="fa fa-sign-out"> My ads</NavDropdown.Item>
                <NavDropdown.Item href="#"><i className="fa fa-list"></i> My Orders</NavDropdown.Item>
                <NavDropdown.Item href="/sell"><i className="fa fa-heart"></i> sell a product</NavDropdown.Item>
                <NavDropdown.Item href="#"><i className="fa fa-sign-out"></i> Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      </div>
    )
}
export default Navigation_bar;
