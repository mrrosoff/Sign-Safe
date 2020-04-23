import React, {useState} from "react";

import {Button, Box, CircularProgress, Container, Grid, Typography, Paper} from "@material-ui/core";

import {getWeb3, loadWeb3AccountListener} from "../Hooks/getWeb3";

const LayoutTemplate = props =>
{
	let [loading, setLoading] = useState(false);

	return(
		<Container>
			<Grid
				container
				justify={"center"}
				alignItems={"center"}
				alignContent={"center"}
				style={{minHeight: "100vh"}}
			>
				<Paper elevation={3}>
					<Box width={"80vw"} style={{minHeight: "85vh", position: "relative"}}>
						<Box pt={8}>
							{props.innerComponent}
						</Box>
						<div style={{position: 'absolute', top: 20, right: 20}}>
							{loading ? <CircularProgress /> : <Web3Item setLoading={setLoading} {...props} />}
						</div>
					</Box>
				</Paper>
			</Grid>
		</Container>
	);
};

const Web3Item = props =>
{
	if(!props.ethAccount)
	{
		return(
			<Button
				size={"small"}
				variant={"outlined"}
				onClick={() => {
					props.setLoading(true);
					getWeb3().then(web3Provider => {
						props.setWeb3(web3Provider);
						if (web3Provider)
						{
							web3Provider.eth.getAccounts().then(e => props.setEthAccount(e[0].toLowerCase()));
							loadWeb3AccountListener(props.setEthAccount);
						}

						props.setLoading(false)
					})
				}}
			>
				Log In
			</Button>
		);
	}

	const greetings = ["Hello", "Good To See You", "Howdy", "Hi There", "Hey There"];
	const greeting = greetings[Math.floor(Math.random() * greetings.length)];

	return(
		<Typography variant={"subtitle2"} align={"center"}>
			{greeting} {
			props.ethAccount.substring(0, 6) + "..." +
			props.ethAccount.substring(props.ethAccount.length - 4, props.ethAccount.length)}
		</Typography>
	);
};

export default LayoutTemplate;
