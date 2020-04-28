import React from "react";

import {Grid, Typography} from "@material-ui/core";

const SignerFinishedView = props =>
{
	return(

		<Grid
			container
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
			style={{height: "100%"}}
			spacing={2}
		>
			<Grid item>
				<Grid
					container
					direction={"column"}
					justify={"center"}
					alignItems={"center"}
					alignContent={"center"}
					spacing={4}
				>
					You are done!
				</Grid>
			</Grid>
		</Grid>

	);
};

export default SignerFinishedView;
