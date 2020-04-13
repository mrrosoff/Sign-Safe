import React from "react";

import { Container, Grid, Typography } from "@material-ui/core";

const Test = props =>
{
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
					<Typography align={"center"}>Test!</Typography>
				</Grid>
			</Grid>
		</Container>

	);
};

export default Test;
