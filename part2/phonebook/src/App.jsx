import { useState, useEffect } from 'react'
import PhonebookService from './services/PhonebookService'
import './index.css'

const DeleteButton = (props) => {
  return (
    <form onSubmit={props.remove(props.person)}>
      <button type="submit">Delete</button>
    </form>
  )
}

const Name = (props) => {
  if (props.person.name.toLowerCase().includes(props.filter.toLowerCase())) {
    return (
      <li key={props.person.name}> {props.person.name} {props.person.number} <DeleteButton person={props.person} remove={props.remove} />   </li>
    )
  }
}

const Names = (props) => {
  return (
    <ul>
      {props.persons.map(person => <div key={person.name}> <Name person={person} filter={props.filter} remove={props.remove} />  </div>)}
    </ul>
  )
}

const Input = (props) => {
  return (
    <div>
      {props.text} <input value={props.value} onChange={props.onChange}  />
    </div>
  )
}

const Header = (props) => {
  return (
    <h2>{props.text}</h2>
  )
}

const Button = (props) => {
  return (
    <button type="submit">{props.text}</button>
  )
}

const Form = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <Input text='Name: ' value={props.newName} onChange={props.handleNameTyping}/>
      </div>
      <div>
        <Input text='Number: ' value={props.newNumber} onChange={props.handleNumberTyping}/>
      </div>
      <div>
        <Button text='Add' />
      </div>
    </form>
  )
}

const Notification = ({message, messageClass}) => {
  if (message === null) {
    return null
  } 
  return (
    <div className={messageClass}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {PhonebookService.readAll().then(response => setPersons(response))}, [])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageClass, setmessageClass] = useState(null)

  const handleNameTyping = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberTyping = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFiltering = (e) => {
    setNameFilter(e.target.value)
  }

  const handleDelete = person => e => {
    e.preventDefault()
    if (window.confirm('Delete ' + person.name + '?')) {
      PhonebookService.remove(person.id)
        .then(setPersons(persons.filter(p => p !== person)))
    }
  }

  const addName = (e) => {
    e.preventDefault()
    if (persons.map((person) => person.name).includes(newName)) {
      if (window.confirm(newName + ' is already added to the bookphone. Replace the old number with a new one?')) {
        const person = persons.find(person => person.name == newName)
        const differentNumberPerson = {...person, number: newNumber}
        PhonebookService.update(differentNumberPerson)
          .then(response => {
            setNewName('');
            setNewNumber('');
            setPersons(persons.map(person => person.name !== newName ? person : response.data));
            setmessageClass('message')
            setMessage('Changed number of ' + newName);
            setTimeout(() => { setMessage(null) }, 5000);
          })
          .catch(error => {
            setmessageClass('errorMessage')
            setMessage('Information of ' + newName + ' has already been removed from the server');
            setTimeout(() => { setMessage(null) }, 5000);
          });
         
      }
    } else {
      const newPerson = {name: newName, number: newNumber} 
      PhonebookService.create(newPerson)
        .then(response => {
          setNewName('')
          setNewNumber('')
          setPersons(persons.concat(response))
          setMessage('Added ' + newName)
          setTimeout(() => { setMessage(null)}, 5000)
        })
    }
  }

  return (
    <div>
      <Header text='Phonebook' />
      <Notification message={message} messageClass={messageClass} />
      <Input text='Filter shown with: ' value={nameFilter} onChange={handleFiltering}/>
      <Header text='Add a new' />
      <Form onSubmit={addName} newName={newName} newNumber={newNumber} handleNameTyping={handleNameTyping} handleNumberTyping={handleNumberTyping}/>
      <Header text='Numbers' />
      <Names persons={persons} filter={nameFilter} remove={handleDelete} />
    </div>
  )
}

export default App