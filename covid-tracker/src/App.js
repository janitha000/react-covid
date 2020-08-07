import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core'
import './App.css';

import InfoBox from './components/InfoBox'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide')

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

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode)
  }


  return (
    <div className="app">
      <div className="app__header">
        <h1> COVID-19 Tracker</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value={country} onClick={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox title="Corona Virus Cases" cases="1000" total="20000" />
        <InfoBox title="Recovered" cases="1000" total="20000" />
        <InfoBox title="Deaths" cases="1000" total="20000" />
      </div>


    </div>
  );
}

export default App;
