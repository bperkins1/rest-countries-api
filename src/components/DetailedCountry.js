import React from "react";


function DetailedCountry(props){

	function backClick(){
		props.onBack()
	}


	function borderClick(event){
		props.onNavigate(event)
	}

	return (
		<div>
			<button onClick={backClick}>Back</button>
			<h1>{props.name}</h1>
			<p>{props.native}</p>
			<p>{props.population}</p>
			<p>{props.region}</p>

			<p>{props.subregion}</p>

			<p>{props.capital}</p>

			<img src={props.flag}/>

		{/*doesn't display borders if there aren't any*/}
			{props.borders && props.borders.map((border, index) => <button key={index} value={border} onClick={borderClick}>{border}</button>)}

		</div>
		)
}

export default DetailedCountry;