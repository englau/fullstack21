import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAne } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAne = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = '' 
          dispatch(createAne(content))
        }
    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={addAne}>
            <input name='anecdote'/>
            <button type='submit'>add</button>
        </form>
        </div>
    )
}

export default AnecdoteForm

