import React from "react";

import {Grid} from "@material-ui/core";

const CloseContractView = props =>
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
				{props.image}
			</Grid>
			<Grid item>
				{props.signers.map(signer => signer.name)}
			</Grid>
		</Grid>
	);
};

export default CloseContractView;
