import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Styles from '../compontent/page.css'
import registerBackground from './assets/bg.jpg'
import axios from 'axios';
import NavBar from '../compontent/NavBar';


function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // const history = useHistory();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const api = 'http://localhost:3002/login'
        const response = await  axios.post(api, { email, password });
        alert('Login Successful');
        // history.push('/dashboard');
        window.location.href = '/color'
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('An unexpected error occurred. Please try again later.');
        }
      }
    };
  

  return (
    <div style={{ backgroundImage: `url(${registerBackground})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>  
        {/* <div  className="navbar1">
        <nav className="navbar">
          <nav className="navbar">
            <ul className="nav-menu">
              <li className="nav-item">
                <a href="./login" className="nav-link">
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a href="./login" className="nav-link">
                  Logout
                </a>
              </li>
            </ul>
          </nav>
        </nav>
        
      </div> */}
    <div className='wrapper'>
      {/* <Navbar /> */}
     
      <NavBar/>
     
    <div className="container login-card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="form-container" style={{ flex: '1', maxWidth: '350px' }}>
        <p className="title">Login</p>
        <form onSubmit={handleLogin} className="form">
          <div className="input-group">
            <label htmlFor="username">Email</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="" required />
            <div className="forgot">
              {/* <a href="#">Forgot Password ?</a> */}
            </div>
          </div>
          <button className="sign" type="submit">Sign in</button>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      
        <p className="signup">Don't have an account?
          <a href="register" className="">Sign up</a>
        </p>
      </div>
      </div>
    </div>
    </div>
  );
}

export default LoginForm;
