import React from "react";

import {Button, Grid, Typography} from "@material-ui/core";
import {callLambdaFunction} from "../../../../Hooks/getDatabase";

const SignerSigningView = props =>
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
			<Grid item xs={12} md={5} align="center">
				<Grid
					container
					direction={"column"}
					justify={"center"}
					alignItems={"center"}
					alignContent={"center"}
					spacing={4}
				>
					<Grid item>
						<SignSection {...props}/>
					</Grid>
					<Grid item>
						<VerifyContractSection/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} md={7} align="center">
				<img width={"90%"} height={"auto"} src={props.image} alt={"Document"}/> :
			</Grid>
		</Grid>
	);
};

const SignSection = props =>
{
	return (
		<Grid
			container
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
			style={{height: "100%", width: "80%"}}
			spacing={5}
		>
			<Grid item>
				<Typography variant={"h6"}>{props.contractOwner} would like you to sign their contract.</Typography>
			</Grid>
			<Grid item>
				<Button
					variant={"contained"}
					color={"primary"}
					onClick={() =>
					{
						callLambdaFunction("updateSignerSignStatus", {url: props.contractUrl, ethAccount: props.ethAccount, signed: true})
						.then(r => console.log(r));
						props.setUrlStatus(1);
					}}
				>
					Sign Contract
				</Button>
			</Grid>
		</Grid>
	);
};

const VerifyContractSection = props =>
{
	// Tom, add the Verification functionality here.
	return (
		<Grid
			container
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
			style={{height: "100%", width: "80%"}}
			spacing={5}
		>
			<Grid item>
				<Button
					variant={"contained"}
					color={"primary"}
					onClick={() =>
					{

					}}
				>
					Verify Contract Contents
				</Button>
			</Grid>
		</Grid>
	);
};

export default SignerSigningView;
