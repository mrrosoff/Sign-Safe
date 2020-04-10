import React from "react";

import {Button} from "@material-ui/core";

const PrimaryButton = props => {
	return(
		<Button
			color={"primary"}
			variant={"contained"}
			onClick={props.onClick}
		>
			{props.text}
		</Button>
	);
};

export default PrimaryButton;
