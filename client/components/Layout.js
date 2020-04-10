import React from "react";

import { Button, Container, Grid, Typography } from "@material-ui/core";

const Layout = props =>
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
					<Typography align={"center"}>An item</Typography>
				</Grid>
				<Grid item>
					<Typography align={"center"}>Another Item</Typography>
				</Grid>
				<Grid item>
					<Button
						variant={"contained"}
						onClick={() => props.produceSnackBar("I am an warning message", "warning")}
					>
						Click Me To Trigger An Warning
					</Button>
				</Grid>
			</Grid>
		</Container>

	);
};

export default Layout;
