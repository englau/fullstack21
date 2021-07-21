import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }

  if (color === true) {
    return (
      <div className="errorGreen">
      {message}
    </div>
    )
  } else {

  return (
    <div className="errorRed">
      {message}
    </div>
  )
}
}


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [errorMessage, setErrorMessage] = useState(null)
  const [color, setColor] = useState(true)

  const hook = () => {
    console.log('effect')
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
     
  }
  
  useEffect(hook, [])
  

  const addHlo = (event) => {
    event.preventDefault()
    const personList = persons.map(n => n.name.toLowerCase())
    const uusiHlo = {
      name: newName,
      number: newNumber
    }

    if (personList.includes(newName.toLowerCase()) === false) {
      personService
      .create(uusiHlo)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setFilter('')
        setFilteredPersons(persons)
        })
        setColor(true)
        setErrorMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      } else {
        const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number to new one? `)


        if (confirmUpdate) {
          const person = persons.find((p) => p.name.toLowerCase()=== newName.toLowerCase())
          const updatedPerson = { ...person, number: newNumber }
          const {id} = person

          personService
          .update(id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson)
            )
            setNewName('')
            setNewNumber('')
            setFilter('')
          })
          .catch(error => {
            setColor(false)
            setErrorMessage(`Person ${newName} was already deleted`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)})
          setColor(true)
          setErrorMessage(
            `Updated ${newName}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

            setNewName('')
            setNewNumber('')
            setFilter('')

      
        } 
  }
}


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilter = (event) => {
    setFilter(event.target.value)
    setFilteredPersons(persons.filter((person) =>
    (person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !==-1)))
  }

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id)
    const confirmDelete = window.confirm(`Are you sure you want to delete ${person.name}?`)
    if (confirmDelete) {
      personService.deletePerson(id).then(() => {
        const delPersons = persons.filter((person) => person.id !== id)
        setPersons(delPersons)

        setFilter("")
      })
      .catch(error => {
        setColor(false)
        setErrorMessage(`Person ${newName} was already deleted`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)})
    }
    setColor(true)
    setErrorMessage(
      `Deleted ${person.name}`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} color ={color} />
      <Filter filter = {filter} handleFilter = {handleFilter} />
      <h3>Add a new</h3>
      <PersonForm personform addHlo = {addHlo} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons filteredPersons = {filteredPersons} persons ={persons} filter={filter} handleDelete={ handleDelete} />
    </div>
  )

}

export default App
