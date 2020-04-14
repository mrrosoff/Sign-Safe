import React from "react";

import {Grid, Step, StepLabel, Stepper} from "@material-ui/core";

import {PrimaryButton} from "../../Elements/Buttons";
import {updateURLStatus} from "../../../Hooks/getDatabase";

const ContractPageOther = props =>
{
	let steps = ['View Contract', 'Sign'];
	return(
		<Grid
			container
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
			spacing={2}
		>
			<Grid item xs={2}>
				<PrimaryButton
					text={"Back"}
					disabled={props.urlStatus === 0}
					onClick={() => updateURLStatus(
						props.contractUrl,
						props.ethAccount,
						props.setUrlStatus,
						props.setIsContractOwner,
						props.produceSnackBar,
						props.urlStatus,
						props.urlStatus - 1
					)}
				/>
			</Grid>
			<Grid item xs={8}>
				<Stepper activeStep={props.urlStatus} alternativeLabel>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
			</Grid>
			<Grid item xs={2}>
				<PrimaryButton
					text={"Next"}
					disabled={props.urlStatus === 2}
					onClick={() => updateURLStatus(
						props.contractUrl,
						props.ethAccount,
						props.setUrlStatus,
						props.setIsContractOwner,
						props.produceSnackBar,
						props.urlStatus,
						props.urlStatus + 1
					)}
				/>
			</Grid>
		</Grid>
	)
};

export default ContractPageOther;
