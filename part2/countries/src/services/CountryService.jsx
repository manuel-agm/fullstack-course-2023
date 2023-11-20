import axios from 'axios'

const countryURL = 'https://studies.cs.helsinki.fi/restcountries/api/all/'

const readAll = () => {
    return axios.get(countryURL).then(response => response.data)
}

export default {
    readAll
}