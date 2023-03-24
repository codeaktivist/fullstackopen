import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    if (!name) {
      return;
    }
    async function fetch() {
      try {
        const result = await axios.get(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );
        const country = {
          found: true,
          data: {
            name: result.data[0].name[0],
            capital: result.data[0].capital[0],
            population: result.data[0].population,
            flag: result.data[0].flags.png,
          },
        };
        setCountry(country);
      } catch (error) {
        const country = {
          found: false,
        };
        setCountry(country);
      }
    }
    fetch();
  }, [name]);
  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App