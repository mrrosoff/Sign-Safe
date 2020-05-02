import React, {useState} from "react";

import {Button, Grid, Typography} from "@material-ui/core";

import {callLambdaFunction} from "../../../../Hooks/getDatabase";
import {UploadButton} from "../../../Elements/Buttons";

import CryptoJS from "crypto-js";

const SignerSigningView = props =>
{
	let [disableButton, setDisableButton] = useState(true);

	return(
		<Grid
			container
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
			style={{height: "100%"}}
			spacing={2}
		>
			<Grid item xs={12} md={6} align="center">
				<Grid
					container
					direction={"column"}
					justify={"center"}
					alignItems={"center"}
					alignContent={"center"}
					spacing={4}
				>
					<Grid item align={"center"}>
						<SignSection disableButton={disableButton} setDisableButton={setDisableButton} {...props}/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} md={6} align="center">
				{props.fileType === "pdf" ?
					<div style={{width: '90%', height: '70vh', padding: '0px', overflow: 'hidden'}}>
						<iframe style={{width: '100%', height: '100%', border: 0}} src={props.image} />
					</div> :
					<img width={"90%"} height={"auto"} src={props.image} alt={"Document"}/>
				}
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
			style={{height: "90%", width: "80%"}}
			spacing={5}
		>
			<Grid item xs={12}>
				<Typography variant={"subtitle1"}>{props.contractOwner} would like you to sign their contract.</Typography>
			</Grid>
			<Grid item>
				<UploadButton
					text={"Verify Document Match"}
					accept={".png, .jpg, .jpeg, .pdf"}
					onClick={(e) =>
					{
						var hash;
						let reader = new FileReader();
						reader.onload = (event) =>
						{
							let file = CryptoJS.lib.WordArray.create(event.target.result);
							hash = CryptoJS.SHA256(file);
						};

						reader.readAsArrayBuffer(e.target.files[0]);

						getDocHash(props.contract)
						.then(r =>
						{
							if (r === hash.toString())
							{
								props.produceSnackBar("Document Hashes Match!", "success");
								props.setDisableButton(false);
							}

							else
							{
								props.produceSnackBar("Document Hashes DO NOT match!");
								props.setDisableButton(true);
							}
						});
					}}
				/>
			</Grid>
			<Grid item>
				<Button
					disabled={props.disableButton}
					variant={"contained"}
					color={"primary"}
					onClick={() =>
					{
						signContract(props.ethAccount, props.contract, props.notify)
						.then(r =>
						{
							console.log(r);

							callLambdaFunction("updateSignerSignStatus", {url: props.contractUrl, ethAccount: props.ethAccount, signed: true})
							.then(r => console.log(r));

							props.setUrlStatus(1);
						});
					}}
				>
					Sign Contract
				</Button>
			</Grid>
		</Grid>
	);
};

const getDocHash = async (contract) =>
{
	try
	{
		return await contract.methods.getContractHash().call();
	}

	catch (err)
	{
		console.log(err);
	}
};

const signContract = async (ethAccount, contract, notify, produceSnackBar) =>
{
	try
	{
		return await contract.methods.sign()
		.send({ from: ethAccount, gas: 5000000 })
		.on('error', error => { console.error("Signing Failed", error); produceSnackBar("Something Went Wrong...") })
		.on('transactionHash', transactionHash => { console.log('Transaction Hash:', transactionHash); notify.hash(transactionHash); })
		.on('receipt', receipt => console.log('Receipt', receipt));
	}

	catch (err)
	{
		console.error(err);
	}
};

export default SignerSigningView;
