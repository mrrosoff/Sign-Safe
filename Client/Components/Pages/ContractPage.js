import React, {useState, useEffect} from "react";

import { useParams } from "react-router-dom";

import { Container, Grid, Typography } from "@material-ui/core";
import {callLambdaFunction} from "../../Hooks/restfulAPI";
import {PrimaryButton} from "../Elements/Buttons";

const ContractPage = props =>
{
	let { contractURL } = useParams();
	let [urlStatus, setUrlStatus] = useState(1);

	return(
		<Container>
			<Grid
				container
				justify={"center"}
				alignItems={"center"}
				alignContent={"center"}
				spacing={2}
				style={{height: "100vh"}}
			>
				<Grid item>
					<Typography align={"center"}>
						This URL ({contractURL}) is at status: {urlStatus}
					</Typography>
				</Grid>
				<Grid item>
					<PrimaryButton
						text={"Update URL State"}
						onClick={() => updateContractState(contractURL, urlStatus, setUrlStatus, 1)}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

const checkURLStatus = (contractURL, urlStatus, setUrlStatus) => {

	callLambdaFunction("getURLStatus", {
		url: contractURL
	}).then(r => {
		let newUrlStatus = r.data[0].urlStatus;
		if (newUrlStatus !== urlStatus) {
			setUrlStatus(newUrlStatus);
		}
	});
};

const updateContractState = async (contractURL, urlStatus, setUrlStatus, change) =>
{
	await checkURLStatus(contractURL, urlStatus, setUrlStatus);
	callLambdaFunction("updateURLStatus", {
		url: contractURL, urlStatus: urlStatus + change
	}).then(r => console.log(r));
	setUrlStatus(urlStatus + change);
};

export default ContractPage;
