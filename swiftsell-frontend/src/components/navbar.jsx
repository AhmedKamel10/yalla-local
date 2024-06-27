import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

function CustomNavbar() {
  const navbarStyle = {
    backgroundColor: 'rgb(0,0,0)',
  };

  return (
    <div>
      <Navbar style={navbarStyle} expand="lg" variant="dark" className="main-navbar">
        <div className="container-fluid px-3 top-navbar">
          <Navbar.Brand href="/" className="brand-name">yalla local</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/all" className="nav-link">All products</Nav.Link>
              <Nav.Link as={Link} to="/ads" className="nav-link">My ads</Nav.Link>
              <Nav.Link as={Link} to="/sell" className="nav-link">Sell</Nav.Link>
              <Nav.Link as={Link} to="/sell" className="nav-link">Register a brand</Nav.Link>
              <Nav.Link as={Link} to="/orders" className="nav-link">orders</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/cart" className="nav-link">
                <i className="fa fa-shopping-cart"></i> <ShoppingCart />
              </Nav.Link>
              <NavDropdown title={<><i className="fa fa-user"></i> Profile</>} id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">
                  <i className="fa fa-user"></i> Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#">
                  <i className="fa fa-sign-out"></i> Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
