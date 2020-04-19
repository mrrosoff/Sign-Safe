import React, { useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import {Grid, Step, StepButton, Stepper} from "@material-ui/core";

import {UploadButton} from "../../Elements/Buttons";

const useStyles = makeStyles((theme) => ({ root: { width: '100%' } }));

const ContractPageCreator = props =>
{
	let [contractUploaded, setContractUploaded] = useState(false);
	let [image, setImage] = useState();

	return(
		<Grid
			container
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
			direction={"column"}
			style={{width: "100%", height: "100%"}}
			spacing={4}
		>
			<Grid item xs={9}>
				<Grid
					container
					justify={"center"}
					alignItems={"center"}
					alignContent={"center"}
					style={{height: "100%"}}
					spacing={2}
				>
					<Grid item xs={6}>
						<UploadButton text={"Upload Contract"} accept={".png, .csv, .jpg"} onClick={(e) => {
							setImage(URL.createObjectURL(e.target.files[0]));
							setContractUploaded(true);
						}}/>
					</Grid>
					<Grid item xs={6} style={{width: "100%"}}>
						<img width={"100%"} height={"auto"} src={image} alt={"temp"}/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item style={{width: "100%"}}>
				<CreatorStepper contractUploaded={contractUploaded} {...props}/>
			</Grid>
		</Grid>
	)
};

const CreatorStepper = props =>
{
	const classes = useStyles();
	let steps = ['Upload Contract', 'Add Signers', 'Close Contract'];
	return(
		<div className={classes.root}>
			<Stepper nonLinear activeStep={props.urlStatus} alternativeLabel>
				{steps.map((label, index) => (
					<Step key={label}>
						<StepButton disabled={index !== 0 && !props.contractUploaded} onClick={() => props.setUrlStatus(index)} >
							{label}
						</StepButton>
					</Step>
				))}
			</Stepper>
		</div>
	);
};

export default ContractPageCreator;
