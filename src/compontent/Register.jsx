import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Assuming you're using React Router for navigation
import axios from 'axios';
import registerBackground from './assets/bg.jpg'
import NavBar from '../compontent/NavBar';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
//   const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    const request = { name, email, password, password2 };
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password2', password2);

    if (name && email && password && password2) {
      const api = 'http://localhost:3002/register';
      try {
        const response = await axios.post(api, request);
        if (response.data && response.data.success) {
          window.location.href = '/login';
        } else {
          console.log(response.data);
          setErrorMessage(response.data.message);
        }
      } catch (err) {
        console.error('HTTP Error:', err);
        if (err.response && err.response.status === 403) {
          setErrorMessage(err.response.data.message); // Display the specific error message from the server
        } else {
          setErrorMessage('An unexpected error occurred. Please try again later.');
        }
      }
    } else {
      setErrorMessage('Please fill out all required fields');
    }
    }
    

  return (
    <div style={{ backgroundImage: `url(${registerBackground})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
    <div className="container login-card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
       <NavBar/>
      <div className="form-container" style={{ flex: '1', maxWidth: '300px' }}>
        <p className="title">Register</p>
        <form onSubmit={handleRegister} className="form">
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="" required />
          </div>
          <div className="input-group">
            <label htmlFor="password2">Confirm Password</label>
            <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="" required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="" required />
          </div>
          <button className="sign1" type="submit">Sign Up</button>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      
        <p className="signup">Already have an account?
          <a href="/login" className="">Login</a>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Register;
