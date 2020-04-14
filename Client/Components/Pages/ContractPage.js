import React, {useEffect, useLayoutEffect, useRef, useState} from "react";

import { useParams } from "react-router-dom";

import {Box, Container, Grid, Paper, Typography} from "@material-ui/core";

import { callLambdaFunction } from "../../Hooks/getDatabase";
import { PrimaryButton } from "../Elements/Buttons";

const ContractPage = props =>
{
	let { contractUrl } = useParams();
	let [urlStatus, setUrlStatus] = useState(null);

	const firstUpdate = useRef(true);

	useLayoutEffect(() =>
	{
		checkURLStatus(contractUrl, props.ethAccount, props.produceSnackBar).then(r => setUrlStatus(r));
	}, []);

	useEffect(() =>
	{
		if (!firstUpdate.current)
		{
			//callLambdaFunction("updateURLStatus", {
			//	url: contractUrl, urlStatus: urlStatus, address: props.ethAccount
			//}).then(r => console.log("Update Database to", urlStatus, ". Log:", r));
		}

		else
		{
			firstUpdate.current = false;
		}

	}, [urlStatus]);

	console.log(urlStatus);
	return <Layout contractUrl={contractUrl} urlStatus={urlStatus} setUrlStatus={setUrlStatus} {...props}/>;
};

const Layout = props =>
{
	return(
		<Container>
			<Grid
				container
				justify={"center"}
				alignItems={"center"}
				alignContent={"center"}
				style={{height: "100vh"}}
			>
				<Paper>
					<Box m={4}>
						<ContractPageContent {...props} />
					</Box>
				</Paper>
			</Grid>
		</Container>
	);
};

const ContractPageContent = props =>
{
	return(
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
					Your URL Status is: {props.urlStatus}
				</Typography>
			</Grid>
			<Grid item>
				<PrimaryButton
					text={"Update URL State"}
					onClick={() => updateContractState(
						props.contractUrl,
						props.urlStatus,
						props.setUrlStatus,
						props.urlStatus + 1,
						props.produceSnackBar
					)}
				/>
			</Grid>
		</Grid>
	)
};

const checkURLStatus = (contractUrl, ethAccount, produceSnackBar) =>
{
	return callLambdaFunction("getURLStatus", {
		url: contractUrl
	}).then(r => {
		if (r.data[0])
		{
			for (let i = 0; i < r.data[0].urlStatus.length; i++)
			{
				let item = r.data[0].urlStatus[i];

				if (item.address === ethAccount)
				{
					return item.status;
				}
			}

			produceSnackBar("Critical Application Error");
		} else {
			produceSnackBar("This Contract Address Does Not Exist, Redirecting...");
			setTimeout(() => {
				window.location.href = window.location.protocol + "//" + window.location.host
			}, 3000)
		}
	});
};

const updateContractState = async (contractUrl, urlStatus, setUrlStatus, newStatus, produceSnackBar) =>
{
	let databaseStatus;
	await checkURLStatus(contractUrl, produceSnackBar).then(result => databaseStatus = result);

	if(databaseStatus !== urlStatus) {
		produceSnackBar("Synchronization Issue! Please Try Again.");
		setUrlStatus(databaseStatus);
	} else {
		setUrlStatus(newStatus);
	}
};

export default ContractPage;
