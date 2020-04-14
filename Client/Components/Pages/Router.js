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
			<Route exact path="/not-found">
				<NotFound />
			</Route>
			<Route path="/:contractURL">
				<ContractPage {...props}/>
			</Route>

		</Switch>
	);
};

export default Router;
