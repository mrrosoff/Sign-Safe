import React from "react";

import {Button, Grid, Typography} from "@material-ui/core";
import {callLambdaFunction} from "../../../../Hooks/getDatabase";
import {UploadButton} from "../../../Elements/Buttons";

import CryptoJS from "crypto-js";

const SignerSigningView = props =>
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
					<Grid item>
						<SignSection {...props}/>
					</Grid>
					<Grid item>
						<VerifyContractSection {...props}/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} md={7} align="center">
				<img width={"90%"} height={"auto"} src={props.image} alt={"Document"}/> :
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
			style={{height: "100%", width: "80%"}}
			spacing={5}
		>
			<Grid item>
				<Typography variant={"h6"}>{props.contractOwner} would like you to sign their contract.</Typography>
			</Grid>
			<Grid item>
				<Button
					variant={"contained"}
					color={"primary"}
					onClick={() =>
					{
						callLambdaFunction("updateSignerSignStatus", {url: props.contractUrl, ethAccount: props.ethAccount, signed: true})
						.then(r => console.log(r));
						props.setUrlStatus(1);
					}}
				>
					Sign Contract
				</Button>
			</Grid>
		</Grid>
	);
};

const VerifyContractSection = props =>
{

	return (
		<Grid
			container
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
			style={{height: "100%", width: "80%"}}
			spacing={5}
		>

			<Grid item>
				<UploadButton
					text={"Select Contract"}
					accept={".png, .jpg, .pdf"}
					onClick={(e) =>
					{
						let reader = new FileReader();
						reader.onload = function (event) {
							let file = CryptoJS.lib.WordArray.create(event.target.result);
							let hash = CryptoJS.SHA256(file);
							props.setFileInformation(hash.toString());
						};
						reader.readAsArrayBuffer(e.target.files[0]);
						console.log("Uploaded doc hash:");
						console.log(props.fileInformation);

						getDocHash(props.web3, props.ethAccount, props.deployedContract).then(r => {
								console.log("Blockchain doc hash:")
								console.log(r)

								if( r === props.fileInformation.toString() )
								{
									// check mark
									console.log("match")
								}
								else{
									// red circle with line
									console.log("no match")
								}
							}
						);
					}}
				/>
			</Grid>
		</Grid>
	);
};

const getDocHash = async (web3, ethAccount, deployedContract) => {

	try
	{
		return await deployedContract.methods.getContractHash().call().then(documentHash => documentHash);
	}

	catch (err)
	{
		console.log(err);
	}
};

export default SignerSigningView;
