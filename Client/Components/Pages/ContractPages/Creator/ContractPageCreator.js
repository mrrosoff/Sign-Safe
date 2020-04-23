import React, {useEffect, useState} from "react";

import { makeStyles } from '@material-ui/core/styles';
import {Box, Grid, Step, StepButton, Stepper} from "@material-ui/core";

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

			if (r.data[0].signers.length > 0)
			{
				setSigners(r.data[0].signers);
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
				<Grid item>
					{view}
				</Grid>
			</Grid>
			<Box style={{width: "100%"}}>
				<CreatorStepper hash={hash} urlStatus={props.urlStatus} setUrlStatus={props.setUrlStatus}/>
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
