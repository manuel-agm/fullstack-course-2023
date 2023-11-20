import { useEffect, useState } from 'react'
import './App.css'
import CountryService from './services/CountryService'
import WeatherService from './services/WeatherService'

const CountryFinder = (props) => {
  return (
    <div>
      Find countries:  <input type="text" onChange={props.onChange} />
    </div>
  )
}

const Country = props => {
  return (
    <tr>
      <td>
        {props.country.name.common} 
      </td>
      <td>
        <button type="submit" onClick={() => props.showDetail(props.country)}> Show </button>    
      </td>
    </tr>
  )
}

const Language = props => {
  return(<p>{props.text} </p>)
}

const CountryDetail = props => {
  console.log(props.country.languages)
  return (
    <div>
      <h2>{props.country.name.common}</h2>
      <p>Capital: {props.country.capital[0]} </p>
      <p>Area: {props.country.area} </p>
      <h3> Languages </h3>
      <div> {Object.values(props.country.languages).map(language => <Language key={language} text={language} />)} </div>
      <img src={props.country.flags.png}></img>
      <h3> Weather in {props.country.name.common}</h3>
      <p>Temperature: {props.weatherData.temperature} ºC </p>
      <img src={props.weatherData.icon}></img>
      <p>Wind: {props.weatherData.wind} Mph</p>
    </div>
  )
}

const CountryList = props => {
  if (props.countries.length < 11 && props.countries.length > 1) {
    return (
      <table> 
        <tbody>
          {props.countries.map(country => <Country key={country.name.common} country={country} showDetail={props.showDetail} />)}
        </tbody>
      </table>
    )
  } else if (props.countries.length >= 11) {
      return (
        <p>
          Too many matches, specify another filter
        </p>
      )
  } else if (props.countries.length == 1) {
      return (<CountryDetail country={props.countries[0]} weatherData={props.weatherData}  /> )
  }
}

function App() {
  const [listOfCountries, setListOfCountries] = useState([])
  const [weatherData, setWeatherData] = useState({})

  const updateWeatherData = countryName => {
    WeatherService.read(countryName).then( response => {
      setWeatherData({'temperature': response.current.feelslike_c, 'icon': response.current.condition.icon, 'wind': response.current.wind_mph})
    })
  }
  
  const handleCountryTyping = e => {
    const countryName = e.target.value;
    if (countryName !== '') {
      CountryService.readAll().then(countries => {
        setListOfCountries(countries.filter(country => country.name.common.toLowerCase().includes(countryName.toLowerCase())))
      })
      if (listOfCountries.length === 1) {
        updateWeatherData(listOfCountries[0].name.common)
      }
    } else {
      setListOfCountries([]);
    }
  }

  const handleDetailDisplay = country => {
    setListOfCountries([country])
    updateWeatherData(country.name.common)
  }



  return (
    <div>
      <CountryFinder onChange={handleCountryTyping} />
      <CountryList countries={listOfCountries} weatherData={weatherData} showDetail={handleDetailDisplay}  />
    </div>
  )
}

export default App
