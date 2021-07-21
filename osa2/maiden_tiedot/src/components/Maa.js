import axios from 'axios'
import React, { useState, useEffect } from 'react'



const Maa =({country})=>{

  
  const [saa,setSaa]=useState({})
  const kaupunki= country.name
  
  
  
  const hook3 = () => {
      
      const api_key=process.env.REACT_APP_API_KEY

      axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${kaupunki}`)
      .then(response => {

          setSaa(response.data.current)

                      
        })
    }
    
    useEffect(hook3, [kaupunki])

  return(
  

  <div>
      <h2>{country.name} </h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Spoken languages </h2>
          
      {country.languages.map(language => (
          <li key={language.name}> {language.name} </li> ))}
      <img  src={country.flag} height="150" width="150" alt=""/>
      <h2> weather at {kaupunki} </h2>
      <p>temperature: {saa.temperature} Celsius </p>
      <img src={saa.weather_icons} alt='saa icon'></img>
      <p>wind: {saa.wind_speed} mph direction {saa.wind_dir}</p>
  </div>
  )     
}

export default Maa