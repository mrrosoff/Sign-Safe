import React from "react";

import {Button, Card, Grid, Typography} from "@material-ui/core";

import DoneIcon from '@material-ui/icons/Done';
import LoopIcon from '@material-ui/icons/Loop';

const ContractStatus = props =>
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
					<ContractStatusSignerStateView signers={props.signers}/>
				</Grid>
			</Grid>
			<Grid item xs={12} md={7} align="center">
				<img width={"90%"} height={"auto"} src={props.image} alt={"Document"}/> :
			</Grid>
		</Grid>
	);
};

const ContractStatusSignerStateView = props =>
{
	let signersTable = [];

	for (let i = 0; i < props.signers.length; i++)
	{
		signersTable.push(
			<Grid item align={"center"} key={props.signers[i].ethAccount}>
				<Card>
					<SignerView signer={props.signers[i]}/>
				</Card>
			</Grid>
		);
	}

	return signersTable;
};

const SignerView = props =>
{
	return(
		<Grid
			container
			justify={"center"}
			alignContent={"center"}
			alignItems={"center"}
			style={{padding: '10px'}}
			spacing={2}
		>
			<Grid item>
				<Typography variant={"h6"}>{props.signer.name}</Typography>
			</Grid>
			<Grid item>
				{props.signer.signed ? <DoneIcon /> : <LoopIcon />}
			</Grid>
			<Grid item>
				<Typography variant={"subtitle1"}>{props.signer.ethAccount}</Typography>
			</Grid>
		</Grid>
	)
};



export default ContractStatus;
