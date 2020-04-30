import React, {useState} from "react";

import {Box, Button, CircularProgress, Grid, Typography} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";

import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import {UploadButton} from "../../../Elements/Buttons";

import CryptoJS from 'crypto-js';

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
					IPFS={props.IPFS}
					contractUrl={props.contractUrl}
					setUrlStatus={props.setUrlStatus}
					ipfsHash={props.ipfsHash}
					setipfsHash={props.setipfsHash}
					setContractHash={props.setContractHash}
					loading={loading}
					setLoading={setLoading}
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
									props.setipfsHash(fileHash);
									props.setLoading(false);
								});

								let reader = new FileReader();
								reader.onload = (event) =>
								{
									let file = CryptoJS.lib.WordArray.create(event.target.result);
									let hash = CryptoJS.SHA256(file);
									props.setContractHash(hash.toString());
								};

								reader.readAsArrayBuffer(e.target.files[0]);
							}}
						/>
					</Grid>
					{props.loading ? <Grid item><CircularProgress/></Grid> : null}
					{props.ipfsHash ? <Grid item>
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

export default UploadContractView;
