import React from "react";

import { Grid, Typography } from "@material-ui/core";

const ContractPageForbidden = props =>
{
	return(
		<Grid
			container
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
			style={{minHeight: "70vh"}}
			spacing={4}
		>
			<Grid item>
				<Typography variant={"h6"} align={"center"}>You are forbidden from accessing this page.</Typography>
			</Grid>
		</Grid>
	)
};

export default ContractPageForbidden;
