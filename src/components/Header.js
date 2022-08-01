import React from "react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function Header(props) {


	function handleClick(){
		props.toggleMode()
	}
	return (
	<div className="row p-4 header-bg border-bottom shadow-lg">

		<div className="col-10">
			<h1>Where in the world?</h1>
		</div>

			<div onClick={handleClick} className="col-1 d-flex justify-content-end">
				{props.dark ? <DarkModeIcon /> : <LightModeIcon />}
			</div>
			<div onClick={handleClick} className="col-1">
				<p>Dark Mode</p>
			</div>
	</div>
	)
};

export default Header;