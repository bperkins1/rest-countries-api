import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";

function Country(props){

	// useEffect(() => {
	// 	window.scrollTo({
	// 	  top: props.position.pos,
	// 	  left: 0,
	// 	  behavior: 'smooth'
	// 	});
	// })

	function handleClick(){
		props.onCountryClick(props.name)
	}

  return (

	   <div className="col mb-5"  onClick={handleClick}>
	     <div className="card shadow m-3 h-100">
	      	<img src={props.flag} className="card-img-top" alt=""/>
				  <div className="card-body ps-4 pt-4">
				  	<div className="card-title">
				  		{props.name}
				  	</div>
				    <p>Population: <span>{props.population.toLocaleString("en-US")}</span></p>
				    <p>Region: <span>{props.region}</span></p>
				    <p>Capital: <span>{props.capital}</span></p>
				  </div>
				</div>
      </div>
  );
}

export default Country;