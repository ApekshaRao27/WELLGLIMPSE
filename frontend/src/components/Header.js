import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../main";
function Header(){
  const navigate = useNavigate();

 const handleLogout = async () => {
  try {
     const user = auth.currentUser;
    if (user) {
      // If Firebase user is logged in
      await signOut(auth);
      console.log("Signed out from Firebase.");
    } else {
      console.log("Manual login session ended.");
    }
    // Clear all local/session storage
    localStorage.clear();
    // Redirect to login or home
    navigate('/', { replace: true });
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

    return(
    <Navbar bg="dark" variant="dark" expand="md" className="px-4" sticky="top">
  <Navbar.Brand href="#home">WellGlimpse</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="/Home">Home</Nav.Link>
      <Nav.Link href="#link">Contact Us</Nav.Link>
      <Nav.Link href="/Home#footer">Report An Issue</Nav.Link>
    </Nav>
    <Nav className="ms-auto d-flex align-items-center">
      <button
        onClick={handleLogout}
        style={{
          padding: '8px 16px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </Nav>
  </Navbar.Collapse>
</Navbar>

    )
}

export default Header;