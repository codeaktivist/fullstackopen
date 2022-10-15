import { useState, useEffect } from 'react'
import axios from 'axios'

const Selected = ({ results, setSearch }) => {
    const [weather, setWeather] = useState({
        temperature: '0',
        windspeed: '0'
    })

    useEffect(() => {
        const latitude = results[0].latlng[0]
        const longitude = results[0].latlng[1]
        axios
            .get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
            .then((res) => {
                console.log(res.data)
                setWeather(res.data.current_weather)
            })
            .catch((err) => {
                console.log(err)
            })
    },[])

    return (
        <>
            <h2>{results[0].name.common}</h2>
            <div>Capital: {results[0].capital}</div>
            <div>Area: {results[0].area}</div>
            <h3>Languages</h3>
            <ul>
                {Object.values(results[0].languages).map((a) => <li key={a}>{a}</li>)}
            </ul>
            <img alt={results[0].name.common} src={results[0].flags.png}/>
            <h2>Weather in {results[0].capital}</h2>
            <div>Temperature: {weather.temperature} °C</div>
            <div>Windspeed: {weather.windspeed} m/s</div>
            <a href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
        </>
    )
}

const Output = ({ results, setSearch, weather }) => {
    if (results.length === 1)
        return <Selected setSearch={setSearch} results={results} weather={weather}/>
    if (results.length > 10)
        return <p>Too many matches ({results.length}) ... type more</p>
    else
        return <ul>{results.map((a)=> <li key={a.cca3}>{a.name.common}&nbsp;<button onClick={() => setSearch(a.name.common)}>show</button></li>)}</ul>
}

const App = () => {
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])

    const onChangeHandler = (event) => setSearch(event.target.value)

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then((res) => {
                setCountries(res.data)
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err)})
    },[])

    const results = countries.filter((a) => a.name.common.search(RegExp(search, 'i')) > -1)
    
    return (
    <div>
        <h1>Countries</h1>
        <div>Find countries:</div>
        <input onChange={onChangeHandler} value={search} />
        <Output setSearch={setSearch} results={results} />
    </div>
    )
}

export default App