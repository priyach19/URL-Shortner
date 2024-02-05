import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

  const [email,setEmail]=useState("")
  const [password, setPassword] = useState('');
  const [token,setToken]=useState("")
 
  const navigate = useNavigate();

  // const loginUser = async () => {
  //   try {
  //     const response = await axios.post('/api/login', { username, password });
  //     setToken(response.data.token);
  //   } catch (error) {
  //     console.error('Error logging in:', error.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
       await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({email,password}), 
    }).then(data=>{
     
    setToken(data.token)
  })
    navigate("/")
    }catch(error){
      console.error("try again")
    }
    
  }

  return (
    <>
      <div className="container d-flex justify-content-center m-5 ">
        <form onSubmit={handleSubmit}>
          <h1 className="text-primary">Login Form</h1>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form3Example3cg">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
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
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              id="form3Example4cg"
              className="form-control form-control-lg"
            />
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="submit"
             
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
