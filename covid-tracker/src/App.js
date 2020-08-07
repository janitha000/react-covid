import React from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core'
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <h1> COVID-19 Tracker</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value="abc">
            <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
            <MenuItem value="US">US</MenuItem>

          </Select>
        </FormControl>
      </div>


    </div>
  );
}

export default App;
