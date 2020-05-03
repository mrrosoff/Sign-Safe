import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import { Box, Button, CircularProgress, Grid, TextField, Typography } from "@material-ui/core";

import { callLambdaFunction }from "../../Hooks/getDatabase"

const Home = props =>
{
	return(
		<Box m={4}>
			<HomeContent ethAccount={props.ethAccount} history={props.history} produceSnackBar={props.produceSnackBar}/>
		</Box>
	);
};

const HomeContent = props =>
{
	const history = useHistory();
	let [loading, setLoading] = useState(false);

	return(
		<Grid
			container
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
			direction={"column"}
			style={{minHeight: "70vh"}}
			spacing={8}
		>
			<Grid item>
				<Typography variant={"h2"} align={"center"}>Sign Safe</Typography>
			</Grid>
			<Grid item>
				<Typography variant={"h6"} align={"center"}>An E-Contract Solution For A Modern World</Typography>
			</Grid>
			<Grid item>
				<Grid
					container
					justify={"center"}
					alignContent={"center"}
					alignItems={"center"}
					spacing={3}
					>
					<Grid item>
						<Button
							size={"large"}
							color={"primary"}
							variant={"contained"}
							onClick={() =>
							{
								if(props.ethAccount)
								{
									generateNewURLAndGo(props.ethAccount, history, setLoading);
								}

								else
								{
									props.produceSnackBar("You must log in to continue.");
								}
							}}
						>
							Create A New Contract
						</Button>
					</Grid>
					{loading ? <Grid item><CircularProgress/></Grid> : null}
					<Grid item xs={12}>
						<Typography variant={"h6"} align={"center"}>or</Typography>
					</Grid>
					<Grid item xs={12}>
						<ExistingURLSection history={history}/>
					</Grid>
				</Grid>
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
					label={"Enter Contract URL"}
					value={urlText}
					onChange={(e) => setUrlText(e.target.value)}
					onKeyPress={(ev) => { if (ev.key === 'Enter') { ev.preventDefault();

						if (urlText.includes("http"))
						{
							urlText = urlText.substring(urlText.length - 8, urlText.length);
						}

						props.history.push("/" + urlText);

					}}}
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
					onClick={() =>
					{
						if (urlText.includes("http"))
						{
							urlText = urlText.substring(urlText.length - 8, urlText.length);
						}

						props.history.push("/" + urlText);
					}}
				>
					Go!
				</Button>
			</Grid>
		</Grid>
	)
};


const generateNewURLAndGo = (ethAccount, history, setLoading) => {

	setLoading(true);

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
		contractAddress: "",
		contractHash: "",
		ipfsHash: "",
		fileType: ""
	}).then(r =>
	{
		console.log(r);
		setLoading(false);
		history.push("/" + newRandomURL);
	});
};


export default Home;
