import React from "react";
import ReactDOM from "react-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';


function Header(props) {


	function handleClick(){
		props.toggleMode()
	}
	return (
	<div className="d-flex flex-wrap p-4 align-items-center justify-content-between header-bg border-bottom shadow-lg">

			<h1 className="d-flex">Where in the world?</h1>
		

			<span onClick={handleClick} className="">
				{props.mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
				<span className="mode-text mx-4">Dark Mode</span>
			</span>
			
				
			
	</div>
	)
};

export default Header;