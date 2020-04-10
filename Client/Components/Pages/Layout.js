import React from "react";

import { Button, Container, Grid, Typography } from "@material-ui/core";

import PrimaryButton from "../Elements/PrimaryButton";

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
					<PrimaryButton
						text={"Click Me To Trigger An Warning"}
						onClick={() => props.produceSnackBar("I am an warning message", "warning")}
					/>
					</Grid>
			</Grid>
		</Container>

	);
};

export default Layout;
