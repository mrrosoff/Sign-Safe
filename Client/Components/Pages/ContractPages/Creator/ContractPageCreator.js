import React, {useEffect, useState} from "react";

import { makeStyles } from '@material-ui/core/styles';
import {Grid, Step, StepButton, Stepper} from "@material-ui/core";

import UploadContractView from "./UploadContractView";
import AddSignersView from "./AddSignersView";
import CloseContractView from "./CloseContractView";
import {callLambdaFunction} from "../../../../Hooks/getDatabase";

const useStyles = makeStyles(() => ({ root: { width: '100%' } }));

const ContractPageCreator = props =>
{
	let [hash, setHash] = useState(null);
	let [image, setImage] = useState(null);
	let [signers, setSigners] = useState([{name: "", email: "", ethAddr: ""}]);
	let [finishedAddingSigners, setFinishedAddingSigners] = useState(false);

	useEffect(() =>
	{
		if (hash)
		{
			callLambdaFunction("updateIPFSHash", {url: props.contractUrl, hash: hash}).then(r => console.log(r));
			setImage("https://ipfs.io/ipfs/" + hash)
		}
	}, [hash]);

	useEffect(() =>
	{
		callLambdaFunction("getURLStatus", {url: props.contractUrl}).then(r =>
		{
			if(r.data[0].ipfsHash)
			{
				setHash(r.data[0].ipfsHash);
			}
		})
	}, []);

	let view;

	if(props.urlStatus === 0)
	{
		view =
			<UploadContractView
				hash={hash}
				setHash={setHash}
				image={image}
				setImage={setImage}
				{...props}
			/>;
	}

	else if(props.urlStatus === 1)
	{
		view =
			<AddSignersView
				image={image}
				signers={signers}
				setSigners={setSigners}
				setFinishedAddingSigners={setFinishedAddingSigners}
				{...props}
			/>;
	}

	else if(props.urlStatus === 2)
	{
		view =
			<CloseContractView
				image={image}
				signers={signers}
				{...props}
			/>;
	}

	else
	{
		view = null;
	}

	return(
		<Grid
			container
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
			direction={"column"}
			style={{height: "100%"}}
			spacing={4}
		>
			<Grid item xs={9}>
				{view}
			</Grid>
			<Grid item style={{width: "100%"}}>
				<CreatorStepper hash={hash} finishedAddingSigners={finishedAddingSigners} {...props}/>
			</Grid>
		</Grid>
	)
};

const CreatorStepper = props =>
{
	const classes = useStyles();
	return(
		<div className={classes.root}>
			<Stepper nonLinear activeStep={props.urlStatus} alternativeLabel>
				<Step>
					<StepButton onClick={() => props.setUrlStatus(0)}>
						Upload Contract
					</StepButton>
				</Step>
				<Step>
					<StepButton disabled={!props.hash} onClick={() => props.setUrlStatus(1)}>
						Add Signers
					</StepButton>
				</Step>
				<Step>
					<StepButton
						disabled={!props.hash || !props.finishedAddingSigners}
						onClick={() => props.setUrlStatus(2)}
					>
						Close Contract
					</StepButton>
				</Step>
			</Stepper>
		</div>
	);
};

export default ContractPageCreator;
