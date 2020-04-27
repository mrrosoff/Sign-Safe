import React from "react";

import { Switch, Route } from "react-router-dom";

import LayoutTemplate from "./LayoutTemplate";
import Home from "./Pages/Home";
import ContractPage from "./Pages/ContractPage"

const Router = props =>
{
	return (
		<Switch>
			<Route exact path="/">
				<LayoutTemplate innerComponent={<Home {...props}/>} {...props} />
			</Route>
			<Route path="/:contractUrl">
				<LayoutTemplate innerComponent={<ContractPage {...props}/>} {...props}/>
			</Route>
		</Switch>
	);
};

export default Router;
