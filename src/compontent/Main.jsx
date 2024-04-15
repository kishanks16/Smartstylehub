import React from "react";
import registerBackground from './assets/bg1.jpg'
import Styles from '../compontent/page.css'

const Main = () => {
  return (
    <>
        <div style={{ backgroundImage: `url(${registerBackground})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>  
        <div  className="navbar1">
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
                  Login
                </a>
              </li>
            </ul>
          </nav>
        </nav>

        </div>
      </div>
    </>
  );
};

export default Main;
