import React, { useState } from "react";

import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";

import { callLambdaFunction }from "../../Hooks/getDatabase"

const Home = props =>
{
	return(
		<Box m={4}>
			<HomeContent ethAccount={props.ethAccount} />
		</Box>
	);
};


const HomeContent = props =>
{
	return(
		<Grid
			container
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
			direction={"column"}
			style={{minHeight: "70vh"}}
			spacing={4}
		>
			<Grid item>
				<Typography variant={"h2"} align={"center"}>Sign Safe</Typography>
			</Grid>
			<Grid item>
				<Typography variant={"h6"} align={"center"}>An E-Contract Solution For A Modern World</Typography>
			</Grid>
			<Grid item>
				<Button
					size={"large"}
					color={"primary"}
					variant={"contained"}
					onClick={() => generateNewURLAndGo(props.ethAccount)}
				>
					Create A New Contract
				</Button>
			</Grid>
			<Grid item>
				<Typography variant={"h6"} align={"center"}>or</Typography>
			</Grid>
			<Grid item>
				<ExistingURLSection />
			</Grid>
		</Grid>
	)
};


const ExistingURLSection = props =>
{
	let [urlText, setUrlText] = useState("");

	return(
		<Grid
			container
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
			spacing={2}
		>
			<Grid item xs={12} sm={"auto"}>
				<TextField
					fullWidth
					variant={"outlined"}
					label={"Enter Contract Address"}
					value={urlText}
					onChange={(e) => setUrlText(e.target.value)}
				/>
			</Grid>
			<Grid item>
				<Typography variant={"h6"} align={"center"}>and</Typography>
			</Grid>
			<Grid item>
				<Button
					size={"large"}
					color={"primary"}
					variant={"contained"}
					onClick={() => window.location.href = urlText}
				>
					Go!
				</Button>
			</Grid>
		</Grid>
	)
};


const generateNewURLAndGo = (ethAccount) => {

	function randomStr(len) {

		let ans = '';
		let possibleCharacters = 'abcdefghijklmnopqrstuvwxyz1234567890';

		for (let i = 0; i < len; i++)
		{
			ans += possibleCharacters[Math.floor(Math.random() * possibleCharacters.length)];
		}

		return ans;
	}

	let newRandomURL = randomStr(8);

	callLambdaFunction("createURL", {
		url: newRandomURL,
		urlStatus: [{ ethAccount: ethAccount, status: 0}],
		contractOwner: ethAccount,
		signers: [],
		hash: "",
		ipfsHash: ""
	}).then(r => console.log(r));

	window.location.href = window.location + newRandomURL;
};


export default Home;
