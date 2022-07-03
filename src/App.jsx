import { useState, useEffect } from 'react'
import axios from "axios";
import './App.css'
import Boxclima from './components/Boxclima'

function App() {
  /*c489fbe971c75f18bc47361364b4ffc1 --> Api Key
  pi --> https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  url para icono de clima --> http://openweathermap.org/img/wn/10d@2x.png*/
  const [clim, setClim] = useState({});
  const idIcon = clim.data?.weather[0].icon;
  const iconPng = `http://openweathermap.org/img/wn/${idIcon}@2x.png`;
  
  //1.- operacion para pasar de kelvin a Fahrenheit

  const kelvin = clim.data?.main.temp;
  const FahrenheitGrade = ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
  
  //2.- agregar el useState con Fahrenheit
  const [fahrenheit, setFahrenheit] = useState(0);
  const [isFahrenheit, setIsFahrenheit] = useState(true);

  const convertCelsius = ()=>{
    //formula a celsius = (88.11 °F − 32) × 5/9
    
    if(isFahrenheit){
      setFahrenheit((FahrenheitGrade - 32) * 5/9);
      setIsFahrenheit(false);
    }else{
      setFahrenheit((FahrenheitGrade * 9/5) + 32);
      setIsFahrenheit(true);
    }
  }
  


  useEffect(() =>{
    const success = pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;      
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c489fbe971c75f18bc47361364b4ffc1`)
      .then( res => setClim(res))
      setFahrenheit(FahrenheitGrade);
    }
    
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  console.log(clim)

  return (
    <div className="App">
      <Boxclima city={clim.data?.name} country={clim.data?.sys.country} img={iconPng} temp={fahrenheit} pres={clim.data?.main.pressure} condition={clim.data?.weather[0].description} convert={convertCelsius} celsius={setIsFahrenheit}/>
    </div>
  )
}

export default App
