import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core'
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      const data = await (await fetch('https://disease.sh/v3/covid-19/countries')).json()
      const countries = data.map(country => (
        {
          name: country.country,
          value: country.countryInfo.iso2
        }
      ))
      setCountries(countries)
    }

    getCountries()
  }, [])

  return (
    <div className="app">
      <div className="app__header">
        <h1> COVID-19 Tracker</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value="worldwide">
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}


          </Select>
        </FormControl>
      </div>


    </div>
  );
}

export default App;
