import React from "react";

import { useLocation } from "react-router-dom";

import { Container, Grid, Typography } from "@material-ui/core";

const NotFound = props =>
{
	let location = useLocation();

	return(
		<Container>
			<Grid
				container
				justify={"center"}
				alignItems={"center"}
				alignContent={"center"}
				spacing={2}
				style={{height: "100vh"}}
			>
				<Grid item>
					<Typography align={"center"}>Not Found: {location.pathname}</Typography>
				</Grid>
			</Grid>
		</Container>

	);
};

export default NotFound;
