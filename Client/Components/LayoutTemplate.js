import React from "react";

const LayoutTemplate = props =>
{
	return(
		<>
			{props.innerComponent}
			<div style={{position: 'absolute', top: '10px', right: '10px'}}>
				Ethereum Address: {
				props.ethAccount.substring(0, 6) + "..." +
				props.ethAccount.substring(props.ethAccount.length - 4, props.ethAccount.length)}
			</div>
		</>
	);
};

export default LayoutTemplate;
