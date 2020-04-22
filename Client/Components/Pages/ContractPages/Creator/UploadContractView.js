import React from "react";

import {Grid} from "@material-ui/core";

import {UploadButton} from "../../../Elements/Buttons";

const UploadContractView = props =>
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
			<Grid item xs={6}>
				<UploadButton
					text={"Upload Contract"}
					accept={".png, .jpg"}
					onClick={(e) => sendToIPFS(props.IPFS, e.target.files[0]).then(fileHash => props.setHash(fileHash))}
				/>
			</Grid>
			<Grid item xs={6} style={{width: "100%"}}>
				<img width={"100%"} height={"auto"} src={props.image} alt={"temp"}/>
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
