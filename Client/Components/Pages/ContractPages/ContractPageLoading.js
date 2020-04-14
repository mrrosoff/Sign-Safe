import React from "react";

import { CircularProgress, Grid } from "@material-ui/core";

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
			<Grid item>
				<CircularProgress />
			</Grid>
		</Grid>
	)
};

export default ContractPageLoading;
