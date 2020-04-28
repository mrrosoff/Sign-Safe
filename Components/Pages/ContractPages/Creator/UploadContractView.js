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
					setFileInformation={props.setFileInformation}
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
								});

								let reader = new FileReader();
								reader.readAsText(e.target.files[0]);
								reader.onload = (e) => props.setFileInformation(e.target.result);
							}}
						/>
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

export default UploadContractView;
