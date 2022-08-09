import React, {useState, useEffect} from 'react';
import ReactDOM from "react-dom";
import Header from './components/Header'
import CountrySelect from './components/Search'
import RegionBox from './components/Filter'
import Country from './components/Country'
import DetailedCountry from './components/DetailedCountry'

function App() {

// states for handling API call
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// states for handling country display
const [countries, setCountries] = useState([]);
const [filter, setFilter] = useState({region: '', specified: ''})

// state for handling detailed display
const [detail, setDetail] = useState({'display': false, 'country': {}});

// state for handling dark mode
const [mode, setMode] = useState("light");

// state for tracking scroll position
const [pos, setPos] = useState({'pos': 0});

const regionlist = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

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


//when either input is changed, update filters and setcountries to show those that meet both filters.
function changeFilter(value, type){

  setFilter(prevValue => {
    if (regionlist.includes(value)) {
      return {
        region: value,
        specified: prevValue.specified
      };
    } else if (!value) {
      // this nested block handles the "X" button on each input. Type just holds which input the change is from.
        if (type == 0) {
          return {
            region: prevValue.region,
            specified: ''
          }
        } else if (type == 1) {
          return {
            region: '',
            specified: prevValue.specified
          }
        }
    } else {
       return {
        region: prevValue.region,
        specified: value
      }
    }
     
  } )

}

// When a country is clicked, set country display to only that one
function displayOne(name){
  setPos({'pos': window.pageYOffset});
  setDetail({'display': true, 'country': data.find(country => country.name.common == name)})
}

// return to all country display
function displayAll(){
  setDetail({'display': false, 'country':{} })
}

// navigate to country through border buttons
function onNavigate(event){
  setDetail({'display': true, 'country': data.find(country => country.name.common == event.target.value)}) 
}

function toggleMode(){
  setMode((current) => (current === "light" ? "dark" : "light"));
}

  return (


    <div className="whole-view" id={mode}>
      <Header toggleMode={toggleMode} mode={mode}/>
    <div className="container-fluid border-top px-5">

      <div className="row d-flex justify-content-evenly py-5 px-0">
        <div className="col my-1 d-flex justify-content-evenly">

      {countries && !detail.display &&
          <CountrySelect onCountryChange={changeFilter} default={filter.specified} countries={data.map(country => country.name.common)}/>
      }
        </div>
 
        <div className="col my-1 d-flex justify-content-evenly px-0">
      {countries && !detail.display && <RegionBox default={filter.region} onRegionChange={changeFilter}/>
      }
        </div>

      {loading && <div>A moment please...</div>}

      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}

      </div>

{/*display detailed country or all of them depending on state of detail*/}

       { detail.display ? <DetailedCountry
          position={pos}
          onBack={displayAll}
          flag={detail.country.flags.png}
          name={detail.country.name.common}
          native={Object.values(detail.country.name.nativeName)[0].official}
          population={detail.country.population}
          region={detail.country.region}
          subregion={detail.country.subregion}
          capital={detail.country.capital}
          domain={detail.country.tld}
          languages={detail.country.languages}
          currencies={detail.country.currencies}
          onNavigate={onNavigate}
          borders={detail.country.borders ? detail.country.borders.map(code => data.find(country => country.cca3 == code).name.common)
            : null
          } 
          // If the country has borders info, borders returns array of bordering countries in cca3 format.
          // Else return string

          />

        :

        <div className="row row-cols-1 row cols-sm-2 row-cols-md-3 row-cols-lg-4 g-5">

          {/*display the country IF: it's (region is selected or no region is selected) AND (its name == selected name OR there is no name selected)*/}
          {countries.map((country, index) => {
            if ((!filter.region || filter.region == country.region) && (filter.specified == country.name.common || !filter.specified)){
              return (
                <Country
                  position={pos}
                  key={index}
                  flag={country.flags.png}
                  name={country.name.common}
                  population={country.population}
                  region={country.region}
                  capital={country.capital}
                  onCountryClick={displayOne}
                />
                )
            }
          })}
        </div>
        }
        </div>
    </div>  
  );
}

export default App;
