import React from "react";

import {Box, Button, Grid} from "@material-ui/core";
import {callLambdaFunction} from "../../../../Hooks/getDatabase";

const ContractPageSigner = props =>
{
	return(
		<Box width={"100%"}>
			<Grid
				container
				justify={"center"}
				alignItems={"center"}
				alignContent={"center"}
				direction={"column"}
				style={{minHeight: "70vh"}}
				spacing={4}
			>
				<Grid item style={{width: "100%"}}>
					<Grid
						container
						justify={"center"}
						alignItems={"center"}
						alignContent={"center"}
						style={{height: "100%"}}
						spacing={2}
					>
						<Grid item xs={12} md={5} align="center">
							<Grid
								container
								direction={"column"}
								justify={"center"}
								alignItems={"center"}
								alignContent={"center"}
								spacing={4}
							>
								<SignContractView {...props}/>
							</Grid>
						</Grid>
						<Grid item xs={12} md={7} align="center">
							<img width={"90%"} height={"auto"} src={props.image} alt={"Document"}/> :
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	)
};

const SignContractView = props =>
{
	return (
		<Button
			variant={"contained"}
			color={"primary"}
			onClick={() =>
			{
				callLambdaFunction("updateSignerSignStatus",
					{url: props.contractUrl, ethAccount: props.ethAccount, signed: true})
					.then(r => console.log(r));
			}}
		>
			Sign Contract
		</Button>
	);
};

export default ContractPageSigner;
