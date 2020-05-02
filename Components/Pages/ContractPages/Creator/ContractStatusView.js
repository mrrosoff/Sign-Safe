import React from "react";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Grid, Typography} from "@material-ui/core";

import DoneIcon from '@material-ui/icons/Done';
import LoopIcon from '@material-ui/icons/Loop';
import {callLambdaFunction} from "../../../../Hooks/getDatabase";

const ContractStatus = props =>
{
	props.contract.events.signature()
	.on('data', event =>
	{
		console.log("Someone Signed", event);

		setTimeout(() =>
		{
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
		}, 3000);
	});

	const small = useMediaQuery(theme => theme.breakpoints.down('md'));

	return(
		<Grid
			container
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
			style={{height: "100%"}}
			spacing={2}
		>
			<Grid item xs={12} md={6} align="center" style={{paddingLeft: small ? "0px" : "35px"}}>
				<Grid
					container
					direction={"column"}
					justify={"center"}
					alignItems={"center"}
					alignContent={"center"}
					spacing={6}
				>
					<Grid item align={"center"}>
						<Typography variant={"h6"}>
							Your contract has been created. It is located at {small ? getAddressFormat(props.contractAddress) : props.contractAddress} on the Ethereum Blockchain.
						</Typography>
					</Grid>
					<Grid item align={"center"}>
						<Typography variant={"h5"}>
							Signer Status
						</Typography>
					</Grid>
					<ContractStatusSignerStateView signers={props.signers}/>
				</Grid>
			</Grid>
			<Grid item xs={12} md={6} align="center">
				{props.fileType === "pdf" ?
					<div style={{width: '90%', height: '70vh', padding: '0px', overflow: 'hidden'}}>
						<iframe style={{width: '100%', height: '100%', border: 0}} src={props.image}/>
					</div> :
					<img width={"90%"} height={"auto"} src={props.image} alt={"Document"}/>
				}
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
				<Typography variant={"subtitle2"}>{getAddressFormat(props.signer.ethAccount)}</Typography>
			</Grid>
			<Grid item>
				{props.signer.signed ? <DoneIcon /> : <LoopIcon />}
			</Grid>
		</Grid>
	)
};

const getAddressFormat = (address) =>
{
	return address.substring(0, 6) + "..." + address.substring(address.length - 4, address.length);
};

export default ContractStatus;
