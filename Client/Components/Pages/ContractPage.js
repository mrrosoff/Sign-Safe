import React, {useState, useEffect} from "react";

import { useParams } from "react-router-dom";

import { Container, Grid, Typography } from "@material-ui/core";
import {callLambdaFunction} from "../../Hooks/restfulAPI";
import {PrimaryButton} from "../Elements/Buttons";

const ContractPage = props =>
{
	let { contractURL } = useParams();
	let [urlStatus, setURLStatus] = useState(null);

	useEffect(() => {
		callLambdaFunction("getURLStatus", {
			url: contractURL
		}).then(r => setURLStatus(r.data[0].urlStatus))
	}, []);

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
						onClick={() => updateContractState(contractURL, urlStatus + 1, setURLStatus)}
					/>
				</Grid>
			</Grid>
		</Container>

	);
};

const updateContractState = (url, newState, setState) =>
{
	callLambdaFunction("updateURLStatus", {
		url: url, urlState: newState
	}).then(r => console.log(r));

	setState(newState);
};

export default ContractPage;
