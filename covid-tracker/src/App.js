import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core'
import './App.css';

import InfoBox from './components/InfoBox'
import Map from './components/Map'
import Table from './components/Table'
import LineGraph from './components/LineGraph'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState({})

  useEffect(() => {
    const getCountries = async () => {
      const data = await (await fetch('https://disease.sh/v3/covid-19/countries')).json()
      const countries = data.map(country => (
        {
          name: country.country,
          value: country.countryInfo.iso2
        }
      ))
      setTableData(data)
      setCountries(countries)
      setLoading(false)
    }

    getCountries()
  }, [])

  useEffect(async () => {
    const data = await (await fetch('https://disease.sh/v3/covid-19/all')).json()
    setCountryInfo(data)
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = (countryCode === 'worldwide')
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    const data = await (await fetch(url)).json()
    setCountryInfo(data)
    setCountry(countryCode)
  }


  return (
    <div className="app">
      <div className="app__left">
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
          <InfoBox title="Corona Virus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        <div className="app__map">
          <Map />
        </div>
      </div>

      <Card className="app_right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          {!loading && <Table countries={tableData} />}
          <h3>Worldwide New Cases</h3>
          <LineGraph />
        </CardContent>
      </Card>



    </div>
  );
}

export default App;
