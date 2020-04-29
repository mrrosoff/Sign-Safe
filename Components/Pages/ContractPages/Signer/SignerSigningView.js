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
						<SignSection disableButton={disableButton} setDisableButton={setDisableButton} {...props}/>
					</Grid>
					<Grid item>
						<VerifyContractSection disableButton={disableButton} setDisableButton={setDisableButton} {...props}/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} md={7} align="center">
				<img width={"90%"} height={"auto"} src={props.image} alt={"Document"}/> :
			</Grid>
		</Grid>
	);
};

const getDocHash = async (web3, ethAccount, deployedContract)=> {
	console.log(deployedContract);
	try {
		return await deployedContract.methods.getContractHash()
			.call().then(function(documentHash) {
				return documentHash;
			});

	} catch (err) {
		console.log(err);
	}
}

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
					text={"Verify Document Match"}
					accept={".png, .jpg, .pdf"}
					onClick={(e) => {
						var hash;
						let reader = new FileReader();
						reader.onload = function (event) {
							let file = CryptoJS.lib.WordArray.create(event.target.result);
							hash = CryptoJS.SHA256(file);
						};
						reader.readAsArrayBuffer(e.target.files[0]);
						console.log("Uploaded doc hash:");
						console.log(props.fileInformation);

						getDocHash(props.web3, props.ethAccount, props.deployedContract).then(
							function(r){
								console.log("Blockchain doc hash:")
								console.log(r)

								if( r === hash.toString() ){
									console.log("match")
									props.setDisableButton(false);
								}
								else{
									console.log("no match")
									props.setDisableButton(true);
								}
							}
						);
					}}
				/>
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
					disabled={ props.disableButton }
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

export default SignerSigningView;
