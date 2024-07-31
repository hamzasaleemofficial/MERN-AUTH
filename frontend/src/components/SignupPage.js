import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import { API_URL, handleError, handleSuccess } from '../utils';

const SignupPage = () => {

    const [signupinfo, setSignupInfo] = useState({
        username: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const handleChange = (e) => {
        const {name, value } = e.target;
        const copySignupInfo = {...signupinfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {username, email, password} = signupinfo;
        if(!username || !email || !password){
            return handleError("username, email, password is required")
        }
        try {
            const url = `${API_URL}/auth/signup`;
            const response = await fetch(url,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signupinfo)
            });
            const result = await response.json();
            console.log(result)
            const {success, error, message} = result;
            if(success){
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }
             else if(error){
                const details = error.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message);
            }
            console.log(result);
        } catch (error) {
            handleChange(error);
        }
    }

  return (
    <div className='container'>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>

        <div>
            <label htmlFor='name'>Username</label>
            <input
                type='text'
                name="username"
                autoFocus
                placeholder='Enter your username'
                onChange={handleChange}
                value={signupinfo.username}
            />
        </div>

        <div>
            <label htmlFor='email'>Email</label>
            <input
                type='text'
                name="email"
                autoFocus
                placeholder='Enter your email'
                onChange={handleChange}
                value={signupinfo.email}
            />
        </div>

        <div>
            <label htmlFor='password'>Password</label>
            <input
                type='password'
                name="password"
                autoFocus
                placeholder='Enter your Password'
                onChange={handleChange}
                value={signupinfo.password}
            />

            <button type='submit'>Signup</button>
            <span>Already have an account?
                <Link to="/login">Login</Link>
            </span>
        </div>
        
        </form>
        <ToastContainer/>
    </div>
  )
}

export default SignupPage;