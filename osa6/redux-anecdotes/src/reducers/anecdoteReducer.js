const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const createAne = (content) => {
  const newane= {
    type: 'CREATE',
    data: content
  }
  return newane
}

export const createVote = (id) => {
  const newvote= {
    type: 'VOTE',
    data: { id }
  }
  return newvote
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE': {
      const id = action.data.id
      const selectAne = state.find(anecdote => anecdote.id === id)
      const changeAne = {
        ...selectAne,
        votes: selectAne.votes +1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changeAne)
      }
      default:
        return state
    case 'CREATE': 
      return [...state, asObject(action.data)]
      }

    
    }



export default reducer