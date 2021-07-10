import React, { useState } from 'react'

const StatisticLine = (props) => {

  return (
    <tbody>
      <tr>
      <td> {props.teksti}</td> 
      <td>{props.value} </td>
      </tr>
    </tbody>
  )
}
  
const Statistics = (props) => {
  const hyva = props.hyva
  const neutraali = props.neutraali
  const huono = props.huono
  const kaikki = hyva+neutraali+huono
  const ka = ((hyva*1)+(neutraali*0)+(huono*-1))/kaikki
  const positiivi = (hyva/kaikki)*100 + '%'
  
  if (kaikki === 0) {
    return (
      
      <p> No feedback given </p>
    )
  }

  return (
    <table>
  <StatisticLine teksti="good" value ={hyva} />
  <StatisticLine teksti="neutral" value ={neutraali} />
  <StatisticLine teksti="bad" value ={huono} />
  <StatisticLine teksti="all" value ={kaikki} />
  <StatisticLine teksti="average" value ={ka} />
  <StatisticLine teksti="positive" value ={positiivi} />
  </table>

  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.teksti}
  </button>

)

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  
  return (
    <div>
      <h1>
        Give feedback
      </h1>
      <Button handleClick={()=>setGood(good+1)} teksti ='good'/>
      <Button handleClick={()=>setNeutral(neutral+1)} teksti ='neutral'/>
      <Button handleClick={()=>setBad(bad+1)} teksti ='bad'/>
      
      <h1>
        Statistics
      </h1>
      <Statistics hyva={good} neutraali={neutral} huono={bad}/>
     
    </div>
  )
}

export default App;
