import React, {useState, createRef} from "react";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Button, Box, CircularProgress, Container, Grid, IconButton, Tooltip, Typography, Paper} from "@material-ui/core";
import {getWeb3, loadWeb3AccountListener} from "../Hooks/getWeb3";

import FileCopyIcon from '@material-ui/icons/FileCopy';
import CheckIcon from '@material-ui/icons/Check';

import Brightness7Icon from '@material-ui/icons/Brightness7'; // Light
import Brightness4Icon from '@material-ui/icons/Brightness4'; // Dark

const LayoutTemplate = props =>
{
	const small = useMediaQuery(theme => theme.breakpoints.down('sm'));
	let [loading, setLoading] = useState(false);

	let inputRef = createRef();
	let [copied, setCopied] = useState(false);

	return(
		<Container disableGutters>
			<Grid
				container
				justify={"center"}
				alignItems={"center"}
				alignContent={"center"}
				style={{minHeight: "100vh"}}
			>
				<Paper elevation={4}>
					<Box width={small ? "90vw" : "80vw"} style={{minHeight: "85vh", position: "relative"}}>
						<Box pt={10}>
							{props.innerComponent}
						</Box>
						<div style={{position: 'absolute', top: 20, right: 20}}>
							<Grid
								container
								justify={"center"}
								alignItems={"center"}
								alignContent={"center"}
								spacing={1}
							>
								<Grid item>
									{loading ? <CircularProgress /> : <Web3Item setLoading={setLoading} {...props} />}
								</Grid>
								<Grid item style={{marginLeft: '20px'}}>
									<Tooltip title={"Copy Url To Clipboard"}>
										<IconButton
											disabled={copied}
											onClick={() =>
											{
												inputRef.current.select();
												document.execCommand("copy");
												setCopied(true);

												setTimeout(() => setCopied(false), 3000);
											}}
										>
											<input
												readOnly
												ref={inputRef}
												style={{position: 'absolute', top: '-9999px', left: '-9999px'}}
												value={window.location.href}
											/>
											{copied ? <CheckIcon /> : <FileCopyIcon/>}
										</IconButton>
									</Tooltip>
								</Grid>
								<Grid item>
									<Tooltip title={props.darkMode ? "Light Theme" : "Dark Theme"}>
										<IconButton onClick={() => props.setDarkMode(!props.darkMode)}>
											{props.darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
										</IconButton>
									</Tooltip>
								</Grid>
							</Grid>
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
					getWeb3(props.setWeb3, props.setEthAccount).then(() =>
					{
						loadWeb3AccountListener();
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
