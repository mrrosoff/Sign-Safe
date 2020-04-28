import React, {useState} from "react";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Backdrop, Box, Button, CircularProgress, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, Paper, TextField, Typography} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {callLambdaFunction} from "../../../../Hooks/getDatabase";

import MultiplePartyContract from "../../../../Contracts/build/MultiplePartyContract";

const useStyles = makeStyles((theme) => (
	{
		backdrop:
			{
				zIndex: theme.zIndex.drawer + 1,
				color: '#fff',
			},
	}
));

const AddSignersView = props =>
{
	const [expanded, setExpanded] = React.useState('panel1');
	const handleChange = (panel) => setExpanded(expanded === panel ? false : panel);
	const [openBackdrop, setOpenBackdrop] = useState(false);
	const [invalidSigners, setInvalidSigners] = useState([null]);

	const addSigner = () =>
	{
		props.setSigners([...props.signers, {name: "", email: "", ethAccount: ""}]);
		setInvalidSigners([...invalidSigners, null]);
		setTimeout(() => {
			handleChange('panel' + (props.signers.length + 1));
			document.getElementById('panel' + (props.signers.length + 1)).scrollIntoView({behavior: "smooth"});
		}, 300);
	};

	return(
		<>
			<Box width={"100%"} height={"100%"}>
				<Grid
					container
					direction={"column"}
					justify={"center"}
					alignItems={"center"}
					alignContent={"center"}
					style={{height: "100%"}}
					spacing={5}
				>
					<Grid item align={"center"}>
						<SignersTable
							web3={props.web3}
							signers={props.signers}
							setSigners={props.setSigners}
							invalidSigners={invalidSigners}
							setInvalidSigners={setInvalidSigners}
							expanded={expanded}
							handleChange={handleChange}
						/>
					</Grid>
					<Grid item align={"center"}>
						<ActionButtons addSigner={addSigner} setOpenBackDrop={setOpenBackdrop} invalidSigners={invalidSigners}/>
					</Grid>
				</Grid>
			</Box>
			<BackdropConfirm
				web3={props.web3}
				ethAccount={props.ethAccount}
				signers={props.signers}
				contractUrl={props.contractUrl}
				setUrlStatus={props.setUrlStatus}
				deployedContract={props.deployedContract}
				setDeployedContract={props.setDeployedContract}
				fileInformation={props.fileInformation}
				openBackdrop={openBackdrop}
				setOpenBackdrop={setOpenBackdrop}
			/>
		</>
	);
};

const SignersTable = props =>
{
	const small = useMediaQuery(theme => theme.breakpoints.down('sm'));

	return(
		props.signers.map((signer, i) => {
			let setName = (name) => { let copy = [...props.signers]; copy[i].name = name; props.setSigners(copy); };
			let setEmail = (email) => { let copy = [...props.signers]; copy[i].email = email; props.setSigners(copy); };
			let setEthAccount = (ethAccount) => { let copy = [...props.signers]; copy[i].ethAccount = ethAccount; props.setSigners(copy); };
			let setInvalidSigner = (valid) => { let copy = [...props.invalidSigners]; copy[i] = valid; props.setInvalidSigners(copy); };
			let title = signer.name ? signer.name : "Signer " + (i + 1);

			return(
				<ExpansionPanel
					key={'panel' + (i + 1)}
					id={'panel' + (i + 1)}
					style={{width: small ? "95%" : "100%"}}
					expanded={props.expanded === ('panel' + (i + 1))}
					onChange={() => props.handleChange('panel' + (i + 1))}
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
							ethAccount={signer.ethAccount}
							setEthAccount={setEthAccount}
							web3={props.web3}
							invalidSigner={props.invalidSigners[i]}
							setInvalidSigner={setInvalidSigner}
						/>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			);
		}));
};

const SignerLayout = props =>
{
	return(
		<Grid
			container
			spacing={2}
		>
			<Grid item>
				<NameField name={props.name} setName={props.setName}/>
			</Grid>
			<Grid item>
				<EmailField email={props.email} setEmail={props.setEmail}/>
			</Grid>
			<Grid item>
				<EthAddrField
					ethAccount={props.ethAccount}
					setEthAccount={props.setEthAccount}
					web3={props.web3}
					invalidSigner={props.invalidSigner}
					setInvalidSigner={props.setInvalidSigner}
				/>
			</Grid>
		</Grid>
	);
};

const NameField = props =>
{
	return(
		<TextField
			variant={"filled"}
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
			variant={"filled"}
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
			required
			variant={"filled"}
			label={"Ethereum Address"}
			error={props.invalidSigner}
			value={props.ethAccount}
			onChange={(e) =>
			{
				try { props.web3.utils.toChecksumAddress(e.target.value); props.setInvalidSigner(false); }
				catch(e) { props.setInvalidSigner(true); }
				props.setEthAccount(e.target.value)
			}}
		/>
	)
};

const ActionButtons = props =>
{
	return(
		<Box pb={2}>
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
						disabled={props.invalidSigners.includes(true) || props.invalidSigners.includes(null)}
						onClick={() => props.setOpenBackDrop(true)}
					>
						Finish Adding Signers
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

const BackdropConfirm = props =>
{
	const classes = useStyles();
	return(
		<Backdrop className={classes.backdrop} open={props.openBackdrop} onClick={() => props.setOpenBackdrop(false)}>
			<Paper style={{minWidth: "20vw", minHeight: "20vh"}}>
				<Box m={4}>
					<Grid
						container
						direction={"column"}
						justify={"center"}
						alignItems={"center"}
						alignContent={"center"}
						style={{height: "100%"}}
						spacing={4}
					>
						<Grid item>
							<Typography variant={"h6"} align={"center"}>
								Are you sure? You won't be able to come back to this page.
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant={"body1"} align={"center"}>
								Clicking confirm will save your contract to the Ethereum blockchain. Your Ethereum wallet provider will ask for payment.
							</Typography>
						</Grid>
						<Grid item>
							<BackdropButtons
								web3={props.web3}
								ethAccount={props.ethAccount}
								signers={props.signers}
								contractUrl={props.contractUrl}
								setUrlStatus={props.setUrlStatus}
								fileInformation={props.fileInformation}
								deployedContract={props.deployedContract}
								setDeployedContract={props.setDeployedContract}
								setOpenBackdrop={props.setOpenBackdrop}
							/>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Backdrop>
	);
};

const BackdropButtons = props =>
{
	let [loading, setLoading] = useState(false);

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
					onClick={() => props.setOpenBackdrop(false)}
				>
					Go Back
				</Button>
			</Grid>
			<Grid item>
				<Button
					variant={"contained"}
					color={"primary"}
					onClick={() =>
					{
						setLoading(true);
						callLambdaFunction("addSigners", {url: props.contractUrl, signers: props.signers}).then(r => console.log(r));
						deployContract(props.web3, props.ethAccount, props.fileInformation, props.signers.map(signer => signer.ethAccount)).then(r =>
						{
							setLoading(false);
							props.setDeployedContract(r);
							props.setUrlStatus(2)
						});
					}}
				>
					Confirm
				</Button>
			</Grid>
			{loading ? <Grid item><CircularProgress/></Grid> : null}
		</Grid>
	);
};

const deployContract  = async (web3, ethAccount, fileInformation, addresses) =>
{
	const deployable = new web3.eth.Contract(MultiplePartyContract.abi);
	const gas = await deployable.deploy({ data: MultiplePartyContract.bytecode, arguments: [fileInformation, addresses] }).estimateGas() + 500000;

	return deployable.deploy({ data: MultiplePartyContract.bytecode, arguments: [fileInformation, addresses] })
	.send({ from: ethAccount, gas: gas })
	.on('error', (error) => console.error(error))
	.on('transactionHash', (transactionHash) => console.log('Transaction Hash:', transactionHash))
	.on('receipt', (receipt) => console.log('Receipt', receipt));
};

export default AddSignersView;
