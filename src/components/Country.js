import React, { useState, useEffect } from 'react';

function Country(props){

	function handleClick(){
		props.onCountryClick(props.name)
	}

  return (

	   <div className="col"  onClick={handleClick}>
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
  );
}

export default Country;