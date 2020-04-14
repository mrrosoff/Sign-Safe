import React from "react";

import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import ContractPage from "./ContractPage"
import NotFound from "./NotFound";

const Router = props =>
{
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route path="/:contractURL">
				<ContractPage {...props}/>
			</Route>
			<Route path="*">
				<NotFound />
			</Route>
		</Switch>
	);
};

export default Router;
