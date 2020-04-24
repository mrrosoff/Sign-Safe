import React from "react";

import {Button, Grid} from "@material-ui/core";

const ContractPageSigner = props =>
{
	return(
		<Grid
			container
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
			style={{height: "100%"}}
			spacing={4}
		>
			You are a signer!
		</Grid>
	)
};

export default ContractPageSigner;
