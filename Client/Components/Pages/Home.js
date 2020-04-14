import React, { useState } from "react";

import { Box, Container, Grid, Paper, TextField, Typography } from "@material-ui/core";

import { PrimaryButton } from "../Elements/Buttons";
import { callLambdaFunction }from "../../Hooks/getDatabase"

const Home = props =>
{
	let [urlText, setUrlText] = useState("");

	return(
		<Layout urlText={urlText} setUrlText={setUrlText} {...props} />
	);
};


const Layout = props =>
{
	return(
		<>
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
							<HomeContent {...props} />
						</Box>
					</Paper>
				</Grid>
			</Container>
			<div style={{position: 'absolute', top: '10px', right: '10px'}}>
				Ethereum Address: {props.ethAccount.substring(0, 6) + "..." + props.ethAccount.substring(props.ethAccount.length - 4, props.ethAccount.length)}
			</div>
		</>
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
					onClick={() => generateNewURLAndGo()}
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

	let newRandomURL = randomStr(8);

	callLambdaFunction("pushURLInitialStatus", {
		url: newRandomURL,
		urlStatus: 1
	}).then(r => console.log(r));

	window.location.href = window.location + newRandomURL;
};


export default Home;
