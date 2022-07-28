import React from "react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



function Header() {
	return (
	<div className="row">

		<div className="col-6">
			<h1>Where in the world?</h1>
		</div>

		<div className="col-6 justify-content-end">
			<DarkModeIcon />
			<p>Dark Mode</p>
		</div>
		
	</div>
	)
};

export default Header;