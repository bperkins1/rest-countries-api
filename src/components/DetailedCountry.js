import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


function DetailedCountry(props){

	useEffect(() => {
		return function cleanup() {
					window.scrollTo({
		  top: props.position.pos,
		  left: 0,
		  behavior: 'smooth'
		})}
	})

	function backClick(){
		props.onBack()
	}


	function borderClick(event){
		props.onNavigate(event)
	}

	return (
		<div className="container">
			<div className="row justify-content-start mb-5">
				<div className="col">
					<button className="btn btn-light shadow px-4 py-2" onClick={backClick}><KeyboardBackspaceIcon /><span className="ps-2">Back</span></button>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-6 d-flex">
					<img className="img-fluid pe-5" src={props.flag}/>
				</div>

				<div className="col-sm-6">

					<div className="row my-3">
						<h1>{props.name}</h1>
					</div>

					<div className="row">
						<div className="col-sm-6 mt-3">

							<p>Native name: <span>{props.native}</span></p>
							<p>Population: <span>{props.population.toLocaleString("en-US")}</span></p>
							<p>Region: <span>{props.region}</span></p>
							<p>Sub Region: <span>{props.subregion}</span></p>
							<p>Capital: <span>{props.capital}</span></p>
						
						</div>
						<div className="col-sm-6 mt-3">



						<p>Top Level Domain: <span>{props.domain}</span></p>

					{/*extract languages/currencies as a string. The conditional is to prevent a comma at the end*/}
						<p>Languages: <span>
						{Object.values(props.languages).map((language, index, array) => {
							if (index + 1 === array.length) {
								return language
							  } else {
							    return language + ", "
							  } })}
						</span>
						</p>

						<p>Currencies: <span>
						{Object.values(props.currencies).map((currency, index, array) => {
							if (index + 1 === array.length) {
								return currency.name
							  } else {
							    return currency.name + ", "
							  } })}
						</span>
						</p>
					</div>
					</div>



					<p className="mt-3">Border countries:
					<span>
				{/*doesn't display borders if there aren't any*/}
					{props.borders && props.borders.map((border, index) => <button key={index} value={border} onClick={borderClick} className="btn btn-light shadow-sm px-4 py-1 mx-2 mt-1">{border}</button>)}
					</span>
					</p>
				</div>
			
			</div>
		</div>
		)
}

export default DetailedCountry;