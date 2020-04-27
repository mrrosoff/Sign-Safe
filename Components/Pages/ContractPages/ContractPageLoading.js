import React from "react";

import { CircularProgress, Grid, Typography } from "@material-ui/core";

const ContractPageLoading = props =>
{
	return(
		<Grid
			container
			direction={"column"}
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
			style={{minHeight: "70vh"}}
			spacing={4}
		>
			<Grid item>
				<Typography variant={"h6"} align={"center"}>We are loading your data. Please wait.</Typography>
			</Grid>
			<Grid item>
				<Typography variant={"h6"} align={"center"}>You may also need to log in.</Typography>
			</Grid>
			<Grid item>
				<CircularProgress />
			</Grid>
		</Grid>
	)
};

export default ContractPageLoading;
