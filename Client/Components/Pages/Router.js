import React from "react";


import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import Test from "./Test";
import NotFound from "./NotFound";
const Router = () =>
{
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route path="/test">
				<Test />
			</Route>
			<Route path="*">
				<NotFound />
			</Route>
		</Switch>
	);
};

export default Router;
