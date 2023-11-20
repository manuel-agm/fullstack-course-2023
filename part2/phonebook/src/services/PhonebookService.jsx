import axios from 'axios'

const personsURL = 'http://localhost:3001/persons'

const readAll = () => {
    const request = axios.get(personsURL)
    return (
        request.then(response => response.data)
    )
}

const read = (id) => {
    const request = axios.get(personsURL + '/' + id)
    return request.then(response => response.data)
}

const create = (personToPost) => {
    const request = axios.post(personsURL, personToPost)
    return (
        request.then(response => response.data)
    )
}

const remove = (id) => {
    const request = axios.delete(personsURL + '/' + id)
    return request
}

const update = changedPerson => {
    const request = axios.put(personsURL + '/' + changedPerson.id, changedPerson)
    return request
} 

export default {
    readAll,
    read,
    create,
    remove,
    update
}