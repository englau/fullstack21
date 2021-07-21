import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Maa from './components/Maa'
 
const Content= ({value, handleCountryChange})=>{

  if (value.length === 1){
      return( <Maa country= { value[0] } />)
  }else if (value.length > 1 && value.length < 11){
      return( <div> {value.map(c => <div key={c.name} > {c.name} <button onClick={()=> handleCountryChange(c)}> show </button></div>)} </div>)

  }else{
      return(<div>Too many matches, specify another filter</div>)
      
  }
}

const App =()=> {

  const [haku, setHaku ] = useState([])
  const [maat, setMaat]= useState([])
  

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setMaat(response.data)
      })
  }
  
  useEffect(hook, [])

  const handleNameChange = (event) => {
    setHaku(event.target.value)
    setValue(maat.filter((c) => (c.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !==-1)))

  }

  const handleCountryChange = (c) => {
    setValue(maat.filter((c1) => (c1.name.toLowerCase().indexOf(c.name.toLowerCase()) !==-1))) 

  }

    const [value, setValue]= useState([])
  
    return (
    <div>
        <form> Find countries: <input value={haku} onChange={handleNameChange}/> </form>
        < Content value={value} handleCountryChange={handleCountryChange}  />
    </div>
  )
}


export default App
