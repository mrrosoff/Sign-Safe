import React from "react";

import { Box, Container, Grid, Paper, TextField, Typography } from "@material-ui/core";

import { PrimaryButton } from "../Elements/Buttons";
import { callLambdaFunction }from "../../Hooks/restfulAPI"

const Home = props =>
{
	return(
		<Container>
			<Box m={4} >
				<Paper>
					<Grid
						container
						justify={"center"}
						alignItems={"center"}
						alignContent={"center"}
						spacing={4}
					>
						<Grid item>
							<PrimaryButton
								text={"Create A Contract"}
								onClick={() => generateNewURLAndGo()}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography align={"center"}>or</Typography>
						</Grid>
						<Grid item>
							<TextField
								label={"Enter A Contract Address"}
								variant={"outlined"}
							/>
						</Grid>
					</Grid>
				</Paper>
			</Box>
		</Container>

	);
};

const generateNewURLAndGo = () => {

	function randomStr(len) {

		let ans = '';
		let possibleCharacters = 'abcdefghijklmnopqrstuvwxyz1234567890';

		for (let i = 0; i < len; i++)
		{
			ans += possibleCharacters[Math.floor(Math.random() * possibleCharacters.length)];
		}

		return ans;
	}

	let newRandomURL = randomStr(20);

	callLambdaFunction("pushURLInitialStatus", {
		url: newRandomURL,
		urlStatus: 1
	}).then(r => console.log(r));

	window.location.href = window.location + newRandomURL;
};


export default Home;
