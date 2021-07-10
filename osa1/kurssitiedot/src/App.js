import React from 'react'

const Header = (props) => {
  return (
    <div>
    <h1>
      {props.kurssi}
    </h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part osa= {props.osa[0]}/>
      <Part osa= {props.osa[1]}/>
      <Part osa= {props.osa[2]}/>

    </div>
  )
}
const Part = (props) => {
  return (
    <div>
      <p>
        {props.osa.name} {props.osa.exercises}
      </p>
    </div>
  )
}

const Total = (props) => {

  let a1 = props.summa[0].exercises
  let a2 = props.summa[1].exercises
  let a3 = props.summa[2].exercises

  let yht = a1+a2+a3

  return (
    <div>
    <p>
      Number of exercises {yht}
    </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
    {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }
]
  }

  return (
    <div>
      <Header kurssi={course.name}/>
      <Content osa={course.parts}/>
      <Total summa={course.parts}/>
      
      
    </div>
  )
}

export default App