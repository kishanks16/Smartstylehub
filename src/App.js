import React, { useState } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
 import  Detecter from "../src/compontent/Color"
 import  Detecter1 from "../src/compontent/Color1"
import LoginForm from './compontent/Login'
import Register from './compontent/Register'
import WeatherWidget from './compontent/Weather';
import style from './index.css'
import Main from './compontent/Main';
import LandingPage from './compontent/LandingPage';
import FeedbackForm from './compontent/FeedbackForm';





function App() {
  return (
    
    <div>

<Routes>
{/* <Route path="/" element={<Home />} /> */}
<Route path="/" element={<LandingPage />} />
			{/* {<Route path="/" exact element={<LoginForm />} />} */}
			{<Route path="/register" exact element={<Register />} />}
			{<Route path="/login" exact element={<LoginForm />} />}
			{<Route path="/color" exact element={<Detecter />} />}
			{<Route path="/color1" exact element={<Detecter1 />} />}
			{<Route path="/WeatherWidget" exact element={<WeatherWidget />} />}
			{<Route path="/main" exact element={<Main />} />}
			{<Route path="/feedbackForm" exact element={<FeedbackForm />} />}


      </Routes>
    <div
       
      >
    

       
      </div>
   </div>
  )
}

export default App