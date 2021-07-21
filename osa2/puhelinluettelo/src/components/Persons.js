import React from 'react'



const Hlo = ({person, handleDelete}) => {
    return (
      <li>
        {person.name} {person.number} 
        <button onClick={()=> handleDelete(person.id)}>
          Delete
        </button>
      </li>
    )
  }


const Persons = ({filter, persons, filteredPersons, handleDelete}) => {
    if (filter === '') {
      return (
        <div>
          {persons.map(person => <Hlo key ={person.name} person={person} handleDelete={ handleDelete}/>)}
        </div>
      )
    }
    return (
      <div>
      {filteredPersons.map(person => <Hlo key={person.name} person={person} handleDelete={ handleDelete}/>)}
      </div>
  
    )
  }

  export default Persons