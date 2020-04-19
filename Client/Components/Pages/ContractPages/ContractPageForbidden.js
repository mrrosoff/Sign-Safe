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
			style={{width: "100%", height: "100%"}}
			spacing={2}
		>
			<Grid item>
				<Paper>
					<Typography variant={"h6"} align={"center"}>You are forbidden from accessing this page.</Typography>
				</Paper>
			</Grid>
		</Grid>
	)
};

export default ContractPageForbidden;
