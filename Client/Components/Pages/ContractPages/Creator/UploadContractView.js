import React, {useState} from "react";

import {Box, Button, CircularProgress, Grid, Typography} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import {UploadButton} from "../../../Elements/Buttons";

const UploadContractView = props =>
{
	let [loading, setLoading] = useState(false);

	return(
		<Grid
			container
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
			style={{height: "100%"}}
			spacing={2}
		>
			<Grid item xs={12} md={5} align={"center"}>
				<ButtonsSection
					web3={props.web3}
					loading={loading}
					setLoading={setLoading}
					hash={props.hash}
					setHash={props.setHash}
					IPFS={props.IPFS}
					setUrlStatus={props.setUrlStatus}
				/>
			</Grid>
			<Grid item xs={12} md={7} align="center">
				{props.image ?
					<img width={"90%"} height={"auto"} src={props.image} alt={"Document"}/> :
					<Box width={"90%"}>
						<Skeleton height={"70vh"} variant="rect"/>
					</Box>
				}
			</Grid>
		</Grid>
	);
};

const ButtonsSection = props =>
{
	return(
		<Grid
			container
			direction={"column"}
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
			spacing={4}
		>
			<Grid item>
				<Typography variant={"h6"} align={"center"}>
					To Begin, Upload A Contract
				</Typography>
			</Grid>
			<Grid item>
				<Grid
					container
					justify={"center"}
					alignItems={"center"}
					alignContent={"center"}
					spacing={4}
				>
					<Grid item>
						<UploadButton
							text={"Select Contract"}
							accept={".png, .jpg"}
							onClick={(e) =>
							{
								props.setLoading(true);
								sendToIPFS(props.IPFS, e.target.files[0]).then(fileHash =>
								{
									props.setHash(fileHash);
									props.setLoading(false);
								})
							}}
						/>
						<Button
							onClick={ ()=> deployContract(props.web3)}
							variant={"contained"}
							color={"primary"}
						>
							Deploy to Blockchain
						</Button>
					</Grid>
					{props.loading ? <Grid item><CircularProgress/></Grid> : null}
					{props.hash ? <Grid item>
						<Button
							variant={"contained"}
							color={"primary"}
							onClick={() => props.setUrlStatus(1)}
							endIcon={<NavigateNextIcon />}
						>
							Next
						</Button>
					</Grid> : null
					}
				</Grid>
			</Grid>
		</Grid>
	);
};

const sendToIPFS = async (IPFS, file) =>
{
	try
	{
		return (await IPFS.add(file).next()).value.path;
	}

	catch (error)
	{
		return null;
	}
};

const deployContract = async (x) => {
	console.log("we are here");
	console.log(x);
	const accounts = await x.eth.getAccounts();
	console.log(accounts);
	console.log((accounts[0]));
	const MPContract = require('../../../../contract_ABI/MultiplePartyContract.json');
	const deployable = new web3.eth.Contract(MPContract.abi);


	const gas = await deployable.deploy({
		data: MPContract.bytecode
	}).estimateGas() + 500000;

	console.log("est gas is: ", gas);

	deployable.deploy({
		data: MPContract.bytecode
	}).send({
		from: accounts[0],
		gas: gas,
	})
		.on('error', (error) => {
			console.log('we have an error')
			console.log(error)
		})
		.on('transactionHash', (transactionHash) => {
			console.log('Transaction Hash:')
			console.log(transactionHash)
		})
		.on('receipt', (receipt) => {
			// receipt will contain deployed contract address
			console.log('Receipt')
			console.log(receipt)
		})
		.on('confirmation', (confirmationNumber, receipt) => {
			console.log('Confirmation')
			console.log(receipt)
		})

};

export default UploadContractView;
