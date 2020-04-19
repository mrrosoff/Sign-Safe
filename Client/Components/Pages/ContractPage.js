import React, {useEffect, useRef, useState} from "react";

import { useParams } from "react-router-dom";

import {Box, Container, Grid, Paper} from "@material-ui/core";

import {callLambdaFunction, checkURLStatus} from "../../Hooks/getDatabase";

import ContractPageLoading from "./ContractPages/ContractPageLoading";
import ContractPageCreator from "./ContractPages/ContractPageCreator";
import ContractPageOther from "./ContractPages/ContractPageOther";

const ContractPage = props =>
{
	let { contractUrl } = useParams();
	let [urlStatus, setUrlStatus] = useState(null);
	let [isContractOwner, setIsContractOwner] = useState(null);

	const firstUpdate = useRef(true);

	useEffect(() =>
	{
		if(props.ethAccount)
		{
			checkURLStatus(contractUrl, props.ethAccount, setUrlStatus, setIsContractOwner, props.produceSnackBar)
			.then(r => setUrlStatus(r));
			firstUpdate.current = false;
		}
	}, [props.ethAccount]);

	useEffect(() =>
	{
		if (!firstUpdate.current)
		{
			callLambdaFunction("updateURLAccountStatus", {
				url: contractUrl, urlStatus: urlStatus, address: props.ethAccount
			})
			.then(r => console.log(r));
		}

		else
		{
			firstUpdate.current = false;
		}
	}, [urlStatus]);

	return (
		<Layout
			contractUrl={contractUrl}
			urlStatus={urlStatus}
			setUrlStatus={setUrlStatus}
			isContractOwner={isContractOwner}
			setIsContractOwner={setIsContractOwner}
			{...props}
		/>
	);
};

const Layout = props =>
{
	let pageType = <ContractPageLoading {...props}/>;

	if(props.isContractOwner)
	{
		pageType = <ContractPageCreator {...props}/>;
	}

	else if (props.isContractOwner !== null)
	{
		pageType = <ContractPageOther {...props}/>;
	}

	return(
		<Container>
			<Grid
				container
				justify={"center"}
				alignItems={"center"}
				alignContent={"center"}
				style={{height: "100vh"}}
			>
				<Grid item>
					<Paper>
						<Box m={4} width={"75vw"} height={"75vh"}>
							{pageType}
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
};


export default ContractPage;
