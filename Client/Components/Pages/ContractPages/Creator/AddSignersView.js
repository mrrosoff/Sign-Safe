import React from "react";

import {Button, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, TextField, Typography} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {callLambdaFunction} from "../../../../Hooks/getDatabase";

const AddSignersView = props =>
{
	const [expanded, setExpanded] = React.useState('panel1');
	const handleChange = (panel) => setExpanded(expanded === panel ? false : panel);

	const addSigner = () =>
	{
		let currentSignerSize = props.signers.length;

		if (currentSignerSize === 5)
		{
			props.produceSnackBar("The Maximum Number Of Signers is Five.", "info");
		}

		else
		{
			props.setSigners([...props.signers, {name: "", email: "", ethAddr: ""}]);
			setTimeout(() => handleChange('panel' + (currentSignerSize + 1)), 300);
		}
	};

	return(
		<Grid
			container
			direction={"column"}
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
			style={{height: "100%"}}
			spacing={5}
		>
			<Grid item>
				{
					props.signers.map((signer, i) => {
						let setName = (name) => { let copy = [...props.signers]; copy[i].name = name; props.setSigners(copy) };
						let setEmail = (email) => { let copy = [...props.signers]; copy[i].email = email; props.setSigners(copy) };
						let setEthAddr = (ethAddr) => { let copy = [...props.signers]; copy[i].ethAddr = ethAddr; props.setSigners(copy) };

						let title = signer.name ? signer.name : "Signer " + (i + 1);

						return(
							<ExpansionPanel
								key={'panel' + (i + 1)}
								expanded={expanded === ('panel' + (i + 1))}
								onChange={() => handleChange('panel' + (i + 1))}
							>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
									<Typography>{title}</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<SignerLayout
										name={signer.name}
										setName={setName}
										email={signer.email}
										setEmail={setEmail}
										ethAddr={signer.ethAddr}
										setEthAddr={setEthAddr}
									/>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						);
					})}
			</Grid>
			<Grid item>
				<ActionButtons addSigner={addSigner} {...props} />
			</Grid>
		</Grid>
	);
};

const SignerLayout = props =>
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
				<NameField name={props.name} setName={props.setName}/>
			</Grid>
			<Grid item>
				<EmailField email={props.email} setEmail={props.setEmail}/>
			</Grid>
			<Grid item>
				<EthAddrField ethAddr={props.ethAddr} setEthAddr={props.setEthAddr}/>
			</Grid>
		</Grid>
	);
};

const NameField = props =>
{
	return(
		<TextField
			variant={"outlined"}
			label={"Name"}
			value={props.name}
			onChange={(e) => props.setName(e.target.value)}
		/>
	)
};

const EmailField = props =>
{
	return(
		<TextField
			variant={"outlined"}
			label={"Email"}
			value={props.email}
			onChange={(e) => props.setEmail(e.target.value)}
		/>
	)
};

const EthAddrField = props =>
{
	return(
		<TextField
			variant={"outlined"}
			label={"Ethereum Address"}
			value={props.ethAddr}
			onChange={(e) => props.setEthAddr(e.target.value)}
		/>
	)
};

const ActionButtons = props =>
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
				<Button
					variant={"contained"}
					color={"primary"}
					onClick={() => props.addSigner()}
				>
					Add Additional Signer
				</Button>
			</Grid>
			<Grid item>
				<Button
					variant={"contained"}
					color={"primary"}
					onClick={() =>
					{
						callLambdaFunction("addSigners", {url: props.contractUrl, signers: props.signers}).then(r => console.log(r));
						props.setFinishedAddingSigners(true);
						props.setUrlStatus(2);
					}}
				>
					Finish Adding Signers
				</Button>
			</Grid>
		</Grid>
	)
};

export default AddSignersView;
