import axios from 'axios'

const key = import.meta.env.VITE_SOME_KEY;
const url = 'http://api.weatherapi.com/v1/current.json?key=' + key 

const read = countryName => {
    return axios.get(url + '&q=' + countryName + '&aqi=no').then(response => response.data)
}

export default {
    read
}