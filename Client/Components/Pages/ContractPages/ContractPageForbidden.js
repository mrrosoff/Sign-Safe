import React from "react";

import { Grid, Paper, Typography } from "@material-ui/core";

const ContractPageForbidden = props =>
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
				<Paper>
					<Typography variant={"h4"} align={"center"}>You are forbidden from accessing this page.</Typography>
				</Paper>
			</Grid>
		</Grid>
	)
};

export default ContractPageForbidden;
