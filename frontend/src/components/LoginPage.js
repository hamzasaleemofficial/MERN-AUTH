import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {  handleError, handleSuccess,  } from "../utils";
import { API_URL } from "../utils";


const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    console.log(copyLoginInfo[name]);
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    console.log(email,password);
    if (!email || !password) {
      return handleError("email and passord is required");
    }

    try {
      const url = `${API_URL}/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();

      const { success, error, message, token,name } = result;
      if (success) {
        handleSuccess(message); 
        localStorage.setItem('token',token);
        localStorage.setItem('longedInUser',name);
        setTimeout(() =>{
            navigate("/home");
        }, 1000)
      }else if(error){
        const details = error.details[0].message;
        handleError(details);
      }else if(!success){
        handleError(message);
      }

      console.log(result);
    } catch (error) {
        handleError(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            autoFocus
            placeholder="Enter your email"
            onChange={handleChange}
            value={loginInfo.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            autoFocus
            placeholder="Enter your Password"
            onChange={handleChange}
            value={loginInfo.password}
          />

          <button type="submit">Login</button>
          <span>
            Don't have an account?
            <Link to="/signup">Signup</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
