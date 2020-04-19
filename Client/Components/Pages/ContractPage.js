import React, {useEffect, useRef, useState} from "react";

import { useParams } from "react-router-dom";

import {callLambdaFunction, checkURLStatus} from "../../Hooks/getDatabase";

import ContractPageLoading from "./ContractPages/ContractPageLoading";
import ContractPageCreator from "./ContractPages/ContractPageCreator";
import ContractPageOther from "./ContractPages/ContractPageOther";
import ContractPageForbidden from "./ContractPages/ContractPageForbidden";

const ContractPage = props =>
{
	let { contractUrl } = useParams();
	let [urlStatus, setUrlStatus] = useState(null);
	let [isContractOwner, setIsContractOwner] = useState(null);
	let [isSigner, setIsSigner] = useState(null);

	const firstUpdate = useRef(true);

	useEffect(() =>
	{
		if(props.ethAccount)
		{
			checkURLStatus(contractUrl, props.ethAccount, setUrlStatus, setIsContractOwner, setIsSigner, props.produceSnackBar)
			.then(r => setUrlStatus(r));
			firstUpdate.current = false;
		}
	}, [props.ethAccount]);

	useEffect(() =>
	{
		if (!firstUpdate.current)
		{
			callLambdaFunction("updateURLAccountStatus", {
				url: contractUrl, urlStatus: urlStatus, address: props.ethAccount
			})
			.then(r => console.log(r));
		}

		else
		{
			firstUpdate.current = false;
		}
	}, [urlStatus]);

	return (
		<Layout
			contractUrl={contractUrl}
			urlStatus={urlStatus}
			setUrlStatus={setUrlStatus}
			isContractOwner={isContractOwner}
			setIsContractOwner={setIsContractOwner}
			isSigner={isSigner}
			setIsSigner={setIsSigner}
			{...props}
		/>
	);
};

const Layout = props =>
{
	let pageType = <ContractPageLoading {...props}/>;

	if(props.isContractOwner)
	{
		pageType = <ContractPageCreator {...props}/>;
	}

	else if (props.isContractOwner !== null)
	{
		if (props.isSigner)
		{
			pageType = <ContractPageOther {...props}/>;
		}

		else
		{
			pageType = <ContractPageForbidden {...props}/>;
		}
	}

	return pageType;
};


export default ContractPage;
