import React, { useState } from "react";

import { Button, Grid, TextField, Typography } from "@material-ui/core";

import { callLambdaFunction }from "../../Hooks/getDatabase"

const Home = props =>
{
	let [urlText, setUrlText] = useState("");

	return <HomeContent urlText={urlText} setUrlText={setUrlText} {...props} />;
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
			style={{height: "100%"}}
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
					onClick={() => {
						if(props.ethAccount)
						{
							generateNewURLAndGo(props.ethAccount)
						}

						else
						{
							props.produceSnackBar("Please Log In To The Blockchain To Continue.")
						}
					}}
				>
					Create A New Contract
				</Button>
			</Grid>
			<Grid item>
				<Typography variant={"h6"} align={"center"}>or</Typography>
			</Grid>
			<Grid item>
				<ExistingURLSection {...props} />
			</Grid>
		</Grid>
	)
};


const ExistingURLSection = props =>
{
	return(
		<Grid
			container
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
			spacing={2}
		>
			<Grid item>
				<TextField
					variant={"outlined"}
					label={"Enter Contract Address"}
					value={props.urlText}
					onChange={(e) => props.setUrlText(e.target.value)}
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
					onClick={() => {
						if(props.ethAccount)
						{
							window.location.href = props.urlText
						}

						else
						{
							props.produceSnackBar("Please Log In To The Blockchain To Continue.")
						}
					}}
				>
					Go!
				</Button>
			</Grid>
		</Grid>
	)
};


const generateNewURLAndGo = (creatorAddress) => {

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
		urlStatus: [{
			address: creatorAddress,
			status: 0
		}],
		contractOwner: creatorAddress,
		signers: []
	}).then(r => console.log(r));

	window.location.href = window.location + newRandomURL;
};


export default Home;
