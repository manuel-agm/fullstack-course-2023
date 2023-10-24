import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const AnecdoteButton = (props) => {
  return (
    <button onClick={props.handleClick} >Next Anecdote</button>
  )
}

const Anecdote = (props) => {
  return (
    <p>{props.text}</p>
  )
}

const VotesInfo = (props) => {
  return (
    <p> {props.votes} votes </p>
  )
}

const VotingButton = (props) => {
  return (
    <button onClick={props.handleVoting}>Vote</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState(Array.apply(null, Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  const [selected, setSelected] = useState(0)
  const getRandomAnecdote = () => {
    return setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const vote = () => {
    const array = [...votes]
    array[selected]++
    return setVotes(array)
  }
  return (
    <div>
      <Header text='Anecdote of the day'/>
      <Anecdote text={anecdotes[selected]} />
      <VotesInfo votes={votes[selected]} />
      <AnecdoteButton handleClick={() => getRandomAnecdote()} />
      <VotingButton handleVoting={() => vote()} />
      <Header text='Anecdote with most votes'/>
      <Anecdote text={anecdotes[votes.indexOf(Math.max(...votes))]} />
    </div>
  )
}

export default App