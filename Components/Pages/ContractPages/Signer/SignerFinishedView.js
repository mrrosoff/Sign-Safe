import React from "react";

import {Grid, Typography} from "@material-ui/core";

import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

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
					<Grid item>
						<Typography>Thanks for signing! You will be notified when the contract is completed by all parties.</Typography>
					</Grid>
					<Grid item>
						<SentimentVerySatisfiedIcon />
					</Grid>
				</Grid>
			</Grid>
		</Grid>

	);
};

export default SignerFinishedView;
