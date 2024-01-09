import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { CopyToClipboard } from "react-copy-to-clipboard";
export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [token, setToken] = useState("");

  const createShortLink = async (e) => {
    e.preventDefault();
    // You need to replace this with your backend URL
    const apiUrl = "http://localhost:5000/api/short";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ originalUrl }),
    });

    const data = await response.json();
    // setShortUrl(data);
    console.log(data);
    setShortUrl(data.shortenLink)

    // Fetch updated analytics after creating a short link
    fetchAnalytics();
  };

  const fetchAnalytics = async () => {
    if (token) {
      // You need to replace this with your backend URL
      const apiUrl = "http://localhost:5000/analytics";

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setUrls(data);
    }
  };

  //   const logout = () => {
  //     setToken("");
  //     setOriginalUrl("");
  //     setShortUrl("");
  //     setUrls([]);
  //   };
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
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter url...."
              style={{ width: "400px" }}
              required
            />

            <button
              type="submit"
              className="btn btn-success"
              onClick={createShortLink}
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <hr />
      <div className="d-flex justify-content-center mb-5">
        {shortUrl && (
          <>
            <h2>Short Url&nbsp;&nbsp;</h2>
            <input
              value={shortUrl}
              style={{ width: "400px" }}
            />
            <CopyToClipboard
              text={shortUrl}
              onCopy={handleCopy}
            >
              <button style={{ width: "5vw" }} title="Copy">
                Copy
              </button>
            </CopyToClipboard>
          </>
        )}
      </div>
    </>
  );
}
