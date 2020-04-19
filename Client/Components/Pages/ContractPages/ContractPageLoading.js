import React from "react";

import { CircularProgress, Grid, Typography } from "@material-ui/core";

const ContractPageLoading = props =>
{
	return(
		<Grid
			container
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
			style={{width: "100%", height: "100%"}}
			spacing={4}
		>
			<Grid item>
				<Typography variant={"h6"} align={"center"}>We are loading your data. Please wait.</Typography>
			</Grid>
			<Grid item>
				<CircularProgress />
			</Grid>
		</Grid>
	)
};

export default ContractPageLoading;
