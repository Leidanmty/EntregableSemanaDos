import React from 'react';

const Boxclima = ({city, country, img, temp, pres, condition, convert, celsius}) => {



    return (
        <div className='box'>
            <h1>Wheather App</h1>
            <h2>{city}, {country}</h2>
            <div className='clim'>
                <div className='icon'>
                    <img src={img} alt="" />
                </div>
                <div className='information'>
                    <h2>Clim Information</h2>
                    <p>Temperature: {temp} {celsius ? "°F" : "°C"}</p>
                    <p>Pressure: {pres} ATM</p>
                    <p>Condition: {condition}</p>
                </div>
            </div>
            <br />
            <br />
            <button onClick={convert}> Change Fahrenheit </button>
            
        </div>
    );
};

export default Boxclima;