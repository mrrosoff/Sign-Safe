import React, { useState } from "react";

import { Box, Container, Grid, Paper, TextField, Typography } from "@material-ui/core";

import { PrimaryButton } from "../Elements/Buttons";
import { callLambdaFunction }from "../../Hooks/restfulAPI"

const Home = props =>
{
	let [urlText, setUrlText] = useState("");

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
							<Grid
								container
								justify={"center"}
								alignItems={"center"}
								alignContent={"center"}
								spacing={4}
								>
								<Grid item>
									<TextField
										variant={"outlined"}
										label={"Enter A Contract Address"}
										value={urlText}
										onChange={(e) => setUrlText(e.target.value)}
									/>
								</Grid>
								<Grid item>
									<PrimaryButton
										text={"Go!"}
										onClick={() => window.location.href = urlText}
									/>
								</Grid>
							</Grid>

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
