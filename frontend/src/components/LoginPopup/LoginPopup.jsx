import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {
    
    const{url,token,setToken} = useContext(StoreContext)

    const[currState, setCurrState] = useState("Sign Up")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false); // State to control password visibility

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data,[name]:value}))
    }

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            return "Password must be at least 8 characters long.";
        }
        if (!hasUpperCase) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!hasSpecialChar) {
            return "Password must contain at least one special character.";
        }
        return null; // Password is valid
    };

    const onLogin = async (event) => {
        event.preventDefault();

        // Validate password if user is trying to sign up or log in
        const passwordError = validatePassword(data.password);
        if (passwordError) {
            alert(passwordError); // Notify the user about the error
            return; // Stop the form submission
        }

        let newurl = url;
        if(currState === "Login"){ //login condition h and we hit login api
            newurl += "/api/user/login";
        }
        else{ //signup condition h and we hit register api
            newurl += "/api/user/register";
        }

        const response = await axios.post(newurl, data);
        console.log(response);

        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            setShowLogin(false)
        }
        else{
            alert(response.data.message)
        }
    }

    // useEffect(() => {
    //     console.log(data);
    // },[data])

  return (
    <div className='login-popup'>
        <form className='login-popup-container' onSubmit={onLogin}>
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState === "Login" ? <></> : <input type="text" onChange={onChangeHandler} name='name' value={data.name} placeholder='Your Name' required />}               
                <input type="text" onChange={onChangeHandler} name='email' value={data.email} placeholder='Your Email' required />
                    <div className="password-input-container">
                        <input type={showPassword ? "text" : "password"} onChange={onChangeHandler} name='password' value={data.password} placeholder='Your Password' required />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)} // Toggle the password visibility
                            className="toggle-password"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
            </div>
            <button type='submit' >{currState === "Sign Up"? "Create Account" : "Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By contuining, I agree to the terms of use and privacy policy.</p>
            </div>
            {currState === "Login"? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>: 
            <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>}
        </form>
    </div>
  )
}

export default LoginPopup