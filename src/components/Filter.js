import * as React from 'react';
import ReactDOM from "react-dom";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


function RegionBox(props) {

  function handleChange(event, value) {
    props.onRegionChange(value, 1)  
  } 



  return (
    <Autocomplete
      onChange={handleChange}
      defaultValue={props.default}
      disablePortal
      id="combo-box-demo"
      options={regions}
      sx={{ width: 300 }}

      renderInput={(params) => <TextField {...params} label="Filter by region"/>}
    />
  );
}

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']


export default RegionBox
