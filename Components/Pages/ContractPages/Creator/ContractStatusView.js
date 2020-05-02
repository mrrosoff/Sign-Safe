import React from "react";

import {Grid, Typography} from "@material-ui/core";

import DoneIcon from '@material-ui/icons/Done';
import LoopIcon from '@material-ui/icons/Loop';
import {callLambdaFunction} from "../../../../Hooks/getDatabase";

const ContractStatus = props =>
{
	props.contract.events.signature()
	.on('data', event =>
	{
		console.log(event);
		callLambdaFunction("getURLStatus", { url: props.contractUrl })
		.then(r =>
		{
			console.log(r);

			if(r.data[0])
			{
				if(r.data[0].signers.length > 0)
				{
					props.setSigners(r.data[0].signers);
				}
			}
		});
	});

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
						<Typography>
							Your contract has been created. It is located at {props.contractAddress} on the Ethereum Blockchain.
						</Typography>
					</Grid>
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
				<SignerView signer={props.signers[i]}/>
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
				<Typography variant={"subtitle1"}>{props.signer.name}</Typography>
			</Grid>
			<Grid item>
				<Typography variant={"subtitle2"}>{props.signer.ethAccount}</Typography>
			</Grid>
			<Grid item>
				{props.signer.signed ? <DoneIcon /> : <LoopIcon />}
			</Grid>
		</Grid>
	)
};


export default ContractStatus;
