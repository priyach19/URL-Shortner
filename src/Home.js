import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import axios from 'axios';


export default function Home() {
  const [redirectURL, setRedirectURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [token, setToken] = useState('');

  const shortenUrl = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ redirectURL }),
      });
      const data = await response.json();
      setShortURL(data.shortURL);
      console.log(data);
   
    } catch (error) {
      console.error('Error shortening URL:', error.message);
    }
  };

  const handleCopy = () => {
    alert("URL copied!");
  };

  

  return (
    <>
    
      <Navbar expand="lg" className="bg-body-secondary fs-5">
        <Container>
          <Navbar.Brand href="/">Url Shortner</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/register">Sign Up</Nav.Link>
              <Nav.Link href="/login">Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="d-flex justify-content-center">
        <div className="d-flex-inline my-4">
          <form>
            <h1>Make URL short!!</h1>
            <br />
            <input
              type="text"
              id="url"
              name="url"
              value={redirectURL}
              onChange={(e) => setRedirectURL(e.target.value)}
              placeholder="Enter Url...."
              style={{ width: "400px" , height:"40px"}}
              required
            />
            
            <button
              type="button"
              value={shortURL}
              style={{height:"40px", backgroundColor:"green", color:"white"}}
              onClick={shortenUrl}
            >
              Submit
            </button>
  
          </form>
        </div>
      </div>
    <hr />

      <div className="d-flex justify-content-center mb-5">      
           <form>
           <h2>Shorten URL</h2>
           <br/>
           <input
              defaultValue={shortURL}
              style={{ width: "400px", height:"40px"}}
              placeholder="Get short Url here .."
            />
            <CopyToClipboard
              text={shortURL}
              onCopy={handleCopy}
            >
              <button style={{ backgroundColor:"black", color:"white", height:"40px"}} title="Copy">
                Copy
              </button>
            </CopyToClipboard>
           </form>
            
      </div>
    </>
  );
}
