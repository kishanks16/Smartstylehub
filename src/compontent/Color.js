import React, { useState, useEffect } from "react";
import { ColorExtractor } from "react-color-extractor";
import Styles from "./page.css";
import img from "./assets/pngwing.com2.png";
import axios from 'axios';
import colorName from 'color-name';
import Webcam from "react-webcam";
import WeatherWidget from "./Weather";
import { Checkbox, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Rating } from '@mui/material';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const Color = () => {
  const [climate, setClimate] = useState("normal");
  const [imagePath, setImagePath] = useState("");
  const [colors, setColors] = useState([]);
  const [weatherData1, setWeatherData1] = useState();
  const [error, setError] = useState(null);
  // const [ratings, setRatings] = useState({});
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [showWebcam, setShowWebcam] = useState(false);
  const [isDay, setIsDay] = useState(true); // State to track day/night
  const [isClimateChecked, setIsClimateChecked] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [isChecked, setIsChecked] = useState('');
  const [colorNames, setColorNames] = useState([]);
  const [hoverColor, setHoverColor] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  
   const [ratings, setRatings] = useState(Array(colors.length).fill(null));
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const [isRatingPopupOpen, setIsRatingPopupOpen] = useState(false);
const [color1, setColor1] = useState('');
const [selectedRating, setSelectedRating] = useState(0);
  useEffect(() => {
    const fetchLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        setLocation('New Delhi, IN'); // Default to New Delhi
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setError(`Error getting geolocation data: ${error.message}`);
          setLocation('New Delhi, IN'); // Default to New Delhi
        }
      );
    };

    fetchLocation();
  }, []);
 

  useEffect(() => {
    // Convert hexadecimal color codes to color names
    
    const names = colors.map(colors => convertHexToColorName(colors));
    setColorNames(names);
  }, [colors]);

  useEffect(() => {
    const fetchData = async () => {
      if (latitude !== null && longitude !== null) {
        const apiKey = '0b75431e1bb6c7a7c47f74fd2c6a66b8';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        try {
          const response = await axios.get(apiUrl);
          setWeatherData1(response.data.weather[0].main);
          console.log(colors);
          setWeatherData(response.data);
          setLocation(response.data.name ? `${response.data.name}, ${response.data.sys.country}` : 'New Delhi, IN'); // Set location
        } catch (error) {
          setError('Error fetching weather data');
        }
      }
    };
    fetchData();
  }, [latitude, longitude]);

 
  const handleCheckboxChange = (event) => {
    setIsClimateChecked(event.target.checked);
    console.log(isClimateChecked);
    if(weatherData1 == 'Clouds' || 'Haze'){
      setIsChecked("summer")
      console.log(isChecked,'cf');
    }else if (weatherData1 == 'Rain' || 'Snow '){
      setIsChecked("winter")
    }

    setSelectedSeason('');
  };

  // const handleColorBoxClick = (id) => {
  //   setSelectedColorIndex(id);
  //   setIsRatingPopupOpen(true);
  // };

 
   const handleColorBoxClick = (id) => {
     setSelectedColorIndex(id);
     setIsRatingPopupOpen(true);
     console.log('pop');
    };
    const fetchRatings = async () => {
      const api = 'http://localhost:3002/getColorRating';
      try {
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error('Failed to fetch ratings data');
        }
        const data = await response.json();
        console.log(data.data);
        const colorRatings =data.data;
        setColor1(colorRatings);
        console.log(ratings,'rrr');
        // Assuming data is an array of objects conforming to the colorSchema
       
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };
 
   
useEffect(() => {
 
    fetchRatings(); // Fetch ratings data every 3 seconds

}, []);
  const handleRatingSubmit = (color, rating) => {
    // Prepare data to send to the backend
    console.log(rating);
    const data = {
      color: color,
      rating: rating
    };
    const api = 'http://localhost:3002/colorRating'
    
    // Send a POST request to the backend
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit rating to the server');
      }
      // Handle successful response if needed
      alert('Rating submitted successfully');
    })
    .catch(error => {
      // Handle error
      console.error('Error submitting rating:', error);
    });
    // Close the rating popup
    setIsRatingPopupOpen(false);
  };
  const renderSwatches = (type, colors, weatherType, clothType) => {
    
    return colors.map((color, id) => {
        const normalizeColorValue = Array.isArray(color) && type === "rgb"
          ? `rgb(${color[0]}, ${color[1]}, ${color[2]})`
          : color;
    
        // Get color name if available
        const colorNameValue = colorName[color.toLowerCase()];
        const summerType = ["Cotton", "Linen", "Silk", "Lyocell", "Seersucker", "Nylon"];
        const winterType = ["Fleece", "Wool", "Cashmere", "Thermal Fabrics", "Cotton", "Faux fur"];

        return (
          <div key={id}style={{ color: "white"}} >
            <div className="swatch-container"  onClick={() => handleColorBoxClick(id)} style={{ backgroundImage: `url(${img})`, backgroundColor: color, cursor: 'pointer'  }}>
              <div className="swatch"   style={{ backgroundColor: normalizeColorValue, color: normalizeColorValue }} />
            </div>
 {isRatingPopupOpen && selectedColorIndex === id && (
        <Dialog open={isRatingPopupOpen} onClose={() => setIsRatingPopupOpen(false)}>
          <DialogTitle>Rate This Color</DialogTitle>
          <DialogContent>
            <p>Please rate your opinion of the color "{color}"</p>
            <Rating
              name="rating"
              defaultValue={0}
              precision={1}
             IconProps={{ fontSize: 'medium' }}
             onChange={(event, newValue) => setSelectedRating(newValue)}
            />
          </DialogContent>
          <DialogActions>
          <Button onClick={() => setIsRatingPopupOpen(false)}>Cancel</Button>
          {selectedRating > 0 && ( // Render submit button only if a rating is selected
            <Button onClick={() => handleRatingSubmit(color, selectedRating)}>Submit</Button>
          )}
          </DialogActions>
        </Dialog>
      )} 
            <div className="center-content">
            {renderColorRatings(color)} 
              <div>Color Name: {colorNameValue ? `${''} ${color}` : color}</div>
              {(selectedSeason === "winter" || isChecked === "winter" || (selectedSeason === "summer" || isChecked === "summer")) && (
                <>
                  <div>Type of Weather: {selectedSeason === "winter" || isChecked === "winter" ? "Winter" : "Summer"}</div>
                  <div>Type of Cloth: {(selectedSeason === "winter" || isChecked === "winter") ? summerType[id] : winterType[id]}</div>
                </>
              )}
             <div>
             {color1.map((ratingData, index) => (
    <div key={index}>
  
      {renderColorRatings(ratingData.color)}
    
      {color === ratingData.color && (
        
        <div>
          <Rating
              name="rating"
              value={ratingData.rating}
              precision={1}
              IconProps={{
                fontSize: 'medium',
                style: {
                  color: 'gold', // Change the outer color of the stars directly
                }
              }}
              emptyIcon={<StarBorderIcon style={{ color: 'gray' }} />}
              readOnly={true}
              // onChange={(event, newValue) => handleRatingSubmit(color, newValue)}
            /></div>
      )}
    </div>
  ))}
    </div>
  
           
            </div>
          </div>
        );
      });
    };

    // Function to render color ratings
const renderColorRatings = (color) => {
  if (color1[color]) {
    return (
      <div key={color}>
        <h2>Ratings for {color}</h2>
        <ul>
          {color1[color].map((rating, index) => (
            <li key={index}>Rating: {rating.rating}</li>
          ))}
        </ul>
      </div>
    );
  } 
};
  const getColors = (colors) => {
    setColors(colors);
  };

  const sendDataToFlaskAPI = async () => {
    try {
      const response = await axios.post('YOUR_FLASK_API_ENDPOINT', {
        colors: colors,
        weather: weatherData1
      });
      console.log('Response from Flask API:', response.data);
    } catch (error) {
      console.error('Error sending data to Flask API:', error);
    }
  };

  console.log(colors,weatherData1);
 

  const onError = (error) => {
    setError(error);
  };

  const uploadFiles = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      
      setImagePath(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      
    }

  };
  const handleCapture = () => {
    setShowWebcam(true);
  };
  const convertHexToColorName = (hexCode) => {
    let cleanHex = hexCode;
  
    // Check if hexCode is a string and remove '#' if present
    if (typeof hexCode === 'string') {
      cleanHex = hexCode.replace('#', '');
    } else {
      // If not a string, return an empty string or handle as needed
      return '';
    }
  
    // Ensure the cleaned hex code is exactly 6 characters long
    if (cleanHex.length !== 6) {
      // If not, return an empty string or handle as needed
      return '';
    }
  
    // Convert hex to RGB
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
  
    // Find closest color name
    let closestColorName = '';
    let minDistance = Infinity;
  
    for (const [name, rgb] of Object.entries(colorName)) {
      const [nr, ng, nb] = rgb;
      const distance = Math.sqrt((r - nr) ** 2 + (g - ng) ** 2 + (b - nb) ** 2);
      if (distance < minDistance) {
        minDistance = distance;
        closestColorName = name;
      }
    }
  
    return closestColorName;
  };
  
  // Example hexadecimal color codes array
  const hexCodes = colors
  
  // Loop through each hexadecimal color code
  hexCodes.forEach(hexCode => {
    // Convert hex color code to color name
    const colorNameValue = convertHexToColorName(hexCode);
  
    // Log the color name along with the original hexadecimal color code
    // console.log(`The color name for ${hexCode} is ${colorNameValue}`);
  });
  const handleWebcamCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setShowWebcam(false); // Hide the webcam after capturing
  };

  const webcamRef = React.useRef(null);


  const handleRadioChange = (event) => {
    setSelectedSeason(event.target.value);
    console.log("Selected season:", event.target.value);
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
      <div className="main1">
        <div className="upload">
          <h2 style={{ color: "white" }}>Upload Shirt</h2>
    
<div>
<input style={{ transform: 'scale(1.5)', marginRight:'10px'}} type="checkbox" checked={isClimateChecked} onChange={handleCheckboxChange} />
      <span style={{ color: isClimateChecked ? 'black' : 'white', fontSize: '18px' }}>Climate </span>
</div>

<div>
      <FormControl  disabled={isClimateChecked}>
        {/* <FormControlLabel
          control={<Checkbox checked={isClimateChecked} onChange={handleCheckboxChange} />}
          label="Climate"
          style={{ color: isClimateChecked ? 'green' : 'white', fontSize: '18px', }}
        /> */}
       
          <RadioGroup
            aria-label="season"
            name="season"
            sx={{display:'flex' , flexDirection:'row'}}
            value={selectedSeason}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="summer" control={<Radio />} label="Summer" />
            <FormControlLabel value="winter" control={<Radio />} label="Winter" />
          </RadioGroup>
      
      </FormControl>
    </div>
<div className="container12">
      <div className="button-container">
        <input
          id="uploader"
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={uploadFiles}
        />

      
        {showWebcam ? (
          <div className="webcam-section">
            <Webcam 
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={550}
              height={450}
            />
            <button className="text" onClick={handleWebcamCapture}>
              Capture
            </button>
          </div>
        ) : (
          <button className="text" onClick={handleCapture}>
            Capture Image
          </button>
        )}

        {!showWebcam && (
          <button
            className="cssbuttons-io-button"
            id="file-upload"
            onClick={() => document.getElementById('uploader').click()}
          >
            <svg viewBox="0 0 640 512" fill="white" height="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
            </svg>
            <span>Upload</span>
          </button>
)}
                  
          </div>
          <div className="weather-section">
          <div className="card">
    <div className="container1">
      <div className="cloud front">
        <span className="left-front"></span>
        <span className="right-front"></span>
      </div>
      <span className="sun sunshine"></span>
      <span className="sun"></span>
      <div className="cloud back">
        <span className="left-back"></span>
        <span className="right-back"></span>
      </div>
    </div>

    <div className="card-header">
      <span>{location || 'Chennai'}</span>
      {weatherData && <span>{weatherData.weather[0]?.description || 'Unknown'}</span>}
    </div>

    <span className="temp">{Math.round(weatherData?.main?.temp) || '24'} °</span>

    <div className="temp-scale">
      <span>Celsius</span>
    </div>
  </div>
          </div>
         
              
            <div className="image-container">
              <ColorExtractor getColors={getColors} onError={onError}>
                {imagePath || capturedImage ? (
                  <img  style={{ height: '450px'}}src={imagePath || capturedImage} alt="Selected" />
                  ) : (
                  <img
                  style={{ display: "none" , height: '450px'}}
                  src={imagePath || capturedImage}
                  alt="Selected"
                  />
                  )}
              </ColorExtractor>
            </div>
         
          <h2 style={{ color: "white" }}>Suggestion For Pants</h2>
          <div  className="display-swatches" style={{ marginTop: 20 }}>
          {/* {(selectedSeason || isClimateChecked) && renderSwatches("hex", colorNames, selectedSeason)} */}
          {renderSwatches("hex", colorNames,selectedSeason)}
  {/* {!selectedSeason && !isClimateChecked && <p>Please select a season or check the climate option to view colors</p>} */}
</div>
        </div>
      </div>
    </div>
    </div>

    
  );
};

export default Color;
     
{/*
{/* Conditional rendering based on selected option */}
// {option === "Climate" && (
// <div className="display-swatches" style={{ marginTop: 20 }}>
// {renderSwatches1("hex", colors)}
// </div>
// )}