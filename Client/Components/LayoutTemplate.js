import React from "react";
import {Box, Container, Grid, Typography, Paper} from "@material-ui/core";

const LayoutTemplate = props =>
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
					<Paper elevation={3}>
						<Box m={4} width={"75vw"} height={"75vh"}>
							{props.innerComponent}
						</Box>
					</Paper>
				</Grid>
			</Container>
			<div style={{position: 'absolute', top: '10px', right: '10px'}}>
				<Typography variant={"subtitle2"} align={"center"}>
					Ethereum Address: {
					props.ethAccount.substring(0, 6) + "..." +
					props.ethAccount.substring(props.ethAccount.length - 4, props.ethAccount.length)}
				</Typography>
			</div>
		</>
	);
};

export default LayoutTemplate;
