import React, {useEffect} from "react";

import { makeStyles } from '@material-ui/core/styles';
import {Box, Grid, Step, StepButton, Stepper} from "@material-ui/core";

import UploadContractView from "./UploadContractView";
import AddSignersView from "./AddSignersView";
import CloseContractView from "./CloseContractView";
import {callLambdaFunction} from "../../../../Hooks/getDatabase";

const useStyles = makeStyles(() => ({ root: { width: '100%' } }));

const ContractPageCreator = props =>
{
	useEffect(() =>
	{
		if (props.hash)
		{
			callLambdaFunction("updateIPFSHash", {url: props.contractUrl, hash: props.hash}).then(r => console.log(r));
			props.setImage("https://ipfs.io/ipfs/" + props.hash)
		}
	}, [props.hash]);

	let view;

	if(props.urlStatus === 0)
	{
		view = <UploadContractView {...props} />;
	}

	else if(props.urlStatus === 1)
	{
		view = <AddSignersView {...props} />;
	}

	else if(props.urlStatus === 2)
	{
		view = <CloseContractView {...props} />;
	}

	else
	{
		view = null;
	}

	return(
		<Box width={"100%"}>
			<Grid
				container
				justify={"center"}
				alignItems={"center"}
				alignContent={"center"}
				direction={"column"}
				style={{minHeight: "75vh"}}
				spacing={4}
			>
				<Grid item style={{width: "100%"}}>
					{view}
				</Grid>
			</Grid>
			<Box style={{width: "100%"}}>
				<CreatorStepper hash={props.hash} urlStatus={props.urlStatus} setUrlStatus={props.setUrlStatus}/>
			</Box>
		</Box>
	)
};

const CreatorStepper = props =>
{
	const classes = useStyles();
	return(
		<div className={classes.root}>
			<Stepper nonLinear activeStep={props.urlStatus} alternativeLabel>
				<Step>
					<StepButton disabled={props.urlStatus === 2} onClick={() => props.setUrlStatus(0)}>
						Upload Contract
					</StepButton>
				</Step>
				<Step>
					<StepButton disabled={!props.hash || props.urlStatus === 2} onClick={() => props.setUrlStatus(1)}>
						Add Signers
					</StepButton>
				</Step>
				<Step>
					<StepButton disabled={true}>
						Close Contract
					</StepButton>
				</Step>
			</Stepper>
		</div>
	);
};

export default ContractPageCreator;
