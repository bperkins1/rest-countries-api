import React, { useState, useEffect } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function Country(props){

	function handleClick(){
		props.onCountryClick(props.name)
	}

  return (

  	
    <div onClick={handleClick}>

          	<div className="col">
	          	<div className="card h-100">
	          		<img src={props.flag} className="card-img-top" alt=""/>
				  <div className="card-body">
				  	<div className="card-title">
				  		{props.name}
				  	</div>
				    <p>Population {props.population}</p>
				    <p>Region {props.region}</p>
				    <p>Capital {props.capital}</p>
				  </div>
				</div>
   
   
        </div>
    </div>
  );
}

export default Country;