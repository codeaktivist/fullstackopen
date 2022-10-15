import { useState, useEffect } from 'react'
import axios from 'axios'

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
                console.log(err.message)})
    },[])

    const results = countries.filter((a) => a.name.common.search(RegExp(search, 'i')) > -1)

    function renderResults () {
        if (results.length === 1)
        {
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
                </>
            )
        }
        if (results.length > 10)
        {
            return <p>Too many matches ({results.length}) ... type more</p>
        }
        else
        {
            return <ul>{results.map((a)=> <li key={a.cca3}>{a.name.common}</li>)}</ul>
        }
    }
    
    return (
    <div>
        <h1>Countries</h1>
        <div>Find countries:</div>
        <input onChange={onChangeHandler} value={search} />
        {renderResults()}
    </div>
    )
}

export default App