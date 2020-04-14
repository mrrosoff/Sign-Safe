import React, {useEffect, useLayoutEffect, useRef, useState} from "react";

import {useParams} from "react-router-dom";

import {Container, Grid, Typography} from "@material-ui/core";
import {callLambdaFunction} from "../../Hooks/restfulAPI";
import {PrimaryButton} from "../Elements/Buttons";

const ContractPage = props =>
{
	let { contractURL } = useParams();
	let [urlStatus, setUrlStatus] = useState(null);

	const firstUpdate = useRef(true);

	useLayoutEffect(() => {
		checkURLStatus(contractURL).then(r => setUrlStatus(r));
	}, []);

	useEffect(() => {
		if (!firstUpdate.current)
		{
			callLambdaFunction("updateURLStatus", {
				url: contractURL, urlStatus: urlStatus
			}).then(r => console.log("Update Database to", urlStatus, ". Log:", r));
		}

		else
		{
			firstUpdate.current = false;
		}

	}, [urlStatus]);

	console.log(urlStatus);

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
						onClick={() => updateContractState(contractURL, urlStatus, setUrlStatus, urlStatus + 1, props.produceSnackBar)}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

const checkURLStatus = (contractURL) =>
{
	return callLambdaFunction("getURLStatus", {
		url: contractURL
	}).then(r => r.data[0].urlStatus);
};

const updateContractState = async (contractURL, urlStatus, setUrlStatus, newStatus, produceSnackBar) =>
{
	let databaseStatus;
	await checkURLStatus(contractURL).then(result => databaseStatus = result);

	if(databaseStatus !== urlStatus) {
		produceSnackBar("Synchronization Issue! Please Try Again.");
		setUrlStatus(databaseStatus);
	} else {
		setUrlStatus(newStatus);
	}
};

export default ContractPage;
