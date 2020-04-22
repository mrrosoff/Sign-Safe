import React from "react";

import {Button} from "@material-ui/core";

export const UploadButton = props =>
{
	return(
		<Button
			color={"primary"}
			variant={"contained"}
			component={"label"}
		>
			{props.text}
			<input
				type="file"
				accept={props.accept}
				style={{ display: "none" }}
				onChange={props.onClick}
			/>
		</Button>
	)
};
