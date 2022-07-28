import React, {useState, useEffect} from 'react';
import Header from './components/Header'
import CountrySelect from './components/Search'
import RegionBox from './components/Filter'
import Country from './components/Country'
import CountyContainer from './components/CountryContainer'
import DetailedCountry from './components/DetailedCountry'

function App() {

// states for handling API call
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// states for handling country display
const [countries, setCountries] = useState(null);
const [region, setRegion] =useState('');

// state for handling detailed display
const [detail, setDetail] = useState(false);

  // the API call
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => {
        if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setCountries(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


// When a region is selected, take region from Filter.js and set display to countries in that region. 
// If none display all countries
function changeRegion(value) {
  if (value){
    setCountries(data.filter(country => country.region == value)
    )
  }
  else {
    setCountries(data)
  }
}

// When a country is selected, display that country. When unselected, display default
function changeCountry(value){
  if (value){
    setCountries(data.filter(country => country.name.common == value))
  }
  else{
    setCountries(data)
  }
}

// When a country is clicked, set country display to only that one
function displayOne(name){
  setDetail(true)
  setCountries(countries.filter(country => country.name.common == name))
}

// return to default display states
function displayAll(){
  setDetail(false)
  setCountries(data)
}

// navigate to country through border buttons
function onNavigate(event){
  setCountries(data.filter(country => country.name.common == event.target.value)) 
  console.log(countries)
}

  return (


    <div className="container-fluid p-0">
      <Header />

      {countries && !detail &&
              <CountrySelect onCountryChange={changeCountry}  countries={data.map(country => country.name.common)}/>
      }

      {!detail && <RegionBox onRegionChange={changeRegion}/>
      }
      {loading && <div>A moment please...</div>}

      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}

        <div className="row row-cols-1 row-cols-md-4 g-3">

{/*if no countries, dont display. if the length of countries == 1 then display a detailed version. 
else display all of them*/}

       { !countries ? null
        : detail ? <DetailedCountry
          onBack={displayAll}
          flag={countries[0].flags.png}
          name={countries[0].name.common}
          native={countries[0].name.native}
          population={countries[0].population}
          region={countries[0].region}
          subregion={countries[0].subregion}
          capital={countries[0].capital}
          onNavigate={onNavigate}
          borders={countries[0].borders ? countries[0].borders.map(code => data.find(country => country.cca3 == code).name.common)
            : null
          } 
          // If the country has borders info, borders returns array of bordering countries in cca3 format.
          // Else return string

          />

        : countries.map((country, index) => {
          return (
            <Country
              key={index}
              flag={country.flags.png}
              name={country.name.common}
              population={country.population}
              region={country.region}
              capital={country.capital}
              onCountryClick={displayOne}
            />
            )
        })

      }

        </div>

    </div>  
  );
}

export default App;
