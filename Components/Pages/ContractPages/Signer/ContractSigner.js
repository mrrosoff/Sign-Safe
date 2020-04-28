import React from "react";

import {makeStyles} from "@material-ui/core/styles";
import {Box, Grid, Step, StepButton, Stepper} from "@material-ui/core";

import SignerSigningView from "./SignerSigningView";
import SignerFinishedView from "./SignerFinishedView";

const useStyles = makeStyles(() => ({ root: { width: '100%' } }));

const ContractSigner = props =>
{
	let view;

	if (props.urlStatus === 0)
	{
		view = <SignerSigningView {...props}/>
	}

	else if (props.urlStatus === 1)
	{
		view = <SignerFinishedView {...props}/>
	}

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
					{view}
				</Grid>
			</Grid>
			<Box style={{width: "100%"}}>
				<SignerStepper urlStatus={props.urlStatus}/>
			</Box>
		</Box>
	);
};


const SignerStepper = props =>
{
	const classes = useStyles();
	return(
		<div className={classes.root}>
			<Stepper nonLinear activeStep={props.urlStatus} alternativeLabel>
				<Step>
					<StepButton disabled={true}>
						Sign Contract
					</StepButton>
				</Step>
				<Step>
					<StepButton disabled={true}>
						Finished
					</StepButton>
				</Step>
			</Stepper>
		</div>
	);
};

export default ContractSigner;
