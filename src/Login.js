import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status===422 || !data) {
      alert("Please Enter valid credentials");
    }
    else{
        alert("login suceessful")
      navigate("/");
    }
  };
  const onChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="container d-flex justify-content-center m-5 ">
        <form>
          <h1 className="text-primary">Login Form</h1>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form3Example3cg">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={onChange}
              id="form3Example3cg"
              className="form-control form-control-lg"
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form3Example4cg">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={onChange}
              id="form3Example4cg"
              className="form-control form-control-lg"
            />
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
            >
              Login
            </button>
          </div>
          <Link to="/register">New User?</Link>
        </form>
      </div>
    </>
  );
}
