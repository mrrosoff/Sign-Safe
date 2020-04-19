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
			spacing={2}
		>
			<Grid item xs={6}>
				<Typography variant={"h4"} align={"center"}>We are loading your data</Typography>
			</Grid>
			<Grid item xs={6}>
				<CircularProgress />
			</Grid>
		</Grid>
	)
};

export default ContractPageLoading;
