
import { Link,useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState('');
  const [email,setEmail]=useState("")
  const [password, setPassword] = useState('');
  const navigate=useNavigate()

  // const registerUser = async () => {
  //   try {
  //     await axios.post('/api/register', { username, password });
  //     alert('User registered successfully');
  //   } catch (error) {
  //     console.error('Error registering user:', error.message);
  //   }
  // };

  const registerUser = async () => {
    // You need to replace this with your backend URL
    const apiUrl = "http://localhost:5000/register";
   try{
    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username,email, password }),
    }).then(data=>console.log(data.json()))
  
  
    navigate("/login")
   }catch(error){
    console.error('Error registering user:', error.message);

   }
  }

  

  return (
  <>
     <div className="container d-flex justify-content-center m-5 ">
        <form method="POST">
          <h1 className="text-primary">Register</h1>
          <br />
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form3Example1cg">
              User Name
            </label>
            <input
              type="text"
              name="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="form3Example1cg"
              className="form-control form-control-lg"
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form3Example1cg">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="form3Example1cg"
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
              onChange={(e) => setPassword(e.target.value)}
              id="form3Example4cg"
              className="form-control form-control-lg"
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
              onClick={registerUser}
            >
              Register
            </button>
          </div>
          <div className="d-flex justify-content-center">
            Already have an account?{" "}
            <Link to="/login"> Click Here</Link>

          </div>
          </form>

      </div>  
  </>
  )
}
