import React, { useState } from "react";

import { Grid, TextField, Typography } from "@material-ui/core";

import { PrimaryButton } from "../Elements/Buttons";
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
			style={{width: "100%", height: "100%"}}
			spacing={4}
		>
			<Grid item xs={12}>
				<Typography variant={"h3"} align={"center"}>Sign Safe</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography variant={"body1"} align={"center"}>An E-Contract Solution For A Modern World</Typography>
			</Grid>
			<Grid item>
				<PrimaryButton
					text={"Create A New Contract"}
					onClick={() => generateNewURLAndGo(props.ethAccount)}
				/>
			</Grid>
			<Grid item xs={12}>
				<Typography align={"center"}>or</Typography>
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
			spacing={4}
		>
			<Grid item>
				<TextField
					variant={"outlined"}
					label={"Contract Address"}
					value={props.urlText}
					onChange={(e) => props.setUrlText(e.target.value)}
				/>
			</Grid>
			<Grid item>
				<PrimaryButton
					text={"Go!"}
					onClick={() => window.location.href = props.urlText}
				/>
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
		contractOwner: creatorAddress
	}).then(r => console.log(r));

	window.location.href = window.location + newRandomURL;
};


export default Home;
