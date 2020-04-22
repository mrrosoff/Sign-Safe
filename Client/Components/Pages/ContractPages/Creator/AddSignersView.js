import React, {useState} from "react";

import {Button, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, TextField, Typography} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const AddSignersView = props =>
{
	const [expanded, setExpanded] = React.useState('panel1');
	let [signerData, setSignerData] = useState([{name: "", email: "", ethAddr: ""}]);

	const handleChange = (panel) => setExpanded(expanded === panel ? false : panel);

	const addSigner = () =>
	{
		let currentSignerSize = signerData.length;

		if (currentSignerSize === 5)
		{
			props.produceSnackBar("The Maximum Number Of Signers is Five.", "info");
		}

		else
		{
			setSignerData([...signerData, {name: "", email: "", ethAddr: ""}]);
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
					signerData.map((signer, i) => {
						let setName = (name) => { let copy = [...signerData]; copy[i].name = name; setSignerData(copy) };
						let setEmail = (email) => { let copy = [...signerData]; copy[i].email = email; setSignerData(copy) };
						let setEthAddr = (ethAddr) => { let copy = [...signerData]; copy[i].ethAddr = ethAddr; setSignerData(copy) };

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
				<ActionButtons addSigner={addSigner}/>
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
					onClick={() => {}}
				>
					Finish Adding Signers
				</Button>
			</Grid>
		</Grid>
	)
};

export default AddSignersView;
