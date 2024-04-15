import React, { useState } from 'react';
import { TextField, Button, Typography, Rating, Box, Container } from '@mui/material';
import Styles from "./page.css";
function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!name || !email || !feedback || rating === 0) {
      setError('All fields are required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Feedback:', feedback);
    console.log('Rating:', rating);
    // Here you can send feedback and rating to your backend or handle them as needed
    // Reset form
    window.alert('Feedback submitted successfully!');
    setName('');
    setEmail('');
    setFeedback('');
    setRating(0);
    setError('');
  };
  const validateEmail = (email) => {
    // Simple email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div className="main">
    <div className="navbar1">
      <nav className="navbar">
        <nav className="navbar">
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="./color" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="./color" className="nav-link">
                Shirt
              </a>
            </li>
            <li className="nav-item">
              <a href="./color1" className="nav-link">
                Pant
              </a>
            </li>
            <li className="nav-item">
              <a href="./feedbackForm" className="nav-link">
              Feedback
              </a>
            </li>

            <li className="nav-item">
              <a href="./" className="nav-link">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </nav>
    </div>
  
<div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div style={{ width: 'min(600px, 100%)', border: '1px solid #ccc', padding: '20px', borderRadius: '10px', backgroundColor:'#fcfcfcf0' }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{textAlign:'center'}} gutterBottom>
            Feedback Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Your Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Your Email"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Your Feedback"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" gutterBottom>
                Rate your experience:
              </Typography>
              <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </Box>  
            {error && (
              <Typography variant="body2" color="error" gutterBottom>
                {error}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Container>
      </div>
    </div>
    </div>
    </div>
  );
}

export default FeedbackForm;
