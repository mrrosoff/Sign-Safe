import React, {useEffect, useRef, useState} from "react";

import { useParams, useHistory } from "react-router-dom";

import {callLambdaFunction} from "../../Hooks/getDatabase";

import ContractPageLoading from "./ContractPages/ContractPageLoading";
import ContractPageCreator from "./ContractPages/Creator/ContractPageCreator";
import ContractPageSigner from "./ContractPages/Signer/ContractPageSigner";
import ContractPageForbidden from "./ContractPages/ContractPageForbidden";

const ContractPage = props =>
{
	let { contractUrl } = useParams();
	let history = useHistory();

	let [urlStatus, setUrlStatus] = useState(null);
	let [isContractOwner, setIsContractOwner] = useState(null);
	let [isSigner, setIsSigner] = useState(null);

	let [signers, setSigners] = useState([{name: "", email: "", ethAccount: ""}]);
	let [image, setImage] = useState(null);
	let [hash, setHash] = useState(null);
	let [fileInformation, setFileInformation] = useState();

	let [deployedContract, setDeployedContract] = useState();

	const firstUpdate = useRef(true);

	useEffect(() =>
	{
		if(props.ethAccount)
		{
			callLambdaFunction("getURLStatus", { url: contractUrl })
			.then(r =>
			{
				console.log(r);

				if(r.data[0])
				{
					if(r.data[0].ipfsHash)
					{
						setHash(r.data[0].ipfsHash);
						setImage("https://ipfs.io/ipfs/" + r.data[0].ipfsHash)
					}

					if(r.data[0].signers.length > 0)
					{
						setSigners(r.data[0].signers);
					}

					setIsContractOwner(props.ethAccount === r.data[0].contractOwner);

					let isSigner = false;

					for(let i = 0; i < r.data[0].signers.length; i++)
					{
						if(r.data[0].signers[i].ethAccount === props.ethAccount)
						{
							isSigner = true;
							setIsSigner(isSigner);
						}
					}

					if(!isSigner)
					{
						setIsSigner(isSigner);
					}

					let restored = false;

					for(let i = 0; i < r.data[0].urlStatus.length; i++)
					{
						let item = r.data[0].urlStatus[i];
						if(item.ethAccount === props.ethAccount)
						{
							restored = true;
							setUrlStatus(item.status);
						}
					}

					// Forbidden User

					if(!restored)
					{
						setUrlStatus(null);
					}
				}

				else
				{
					props.produceSnackBar("This Contract Address Does Not Exist, Redirecting...");

					setTimeout(() =>
					{
						history.push("/");
					}, 3000)
				}
			});
		}
	}, [props.ethAccount]);

	useEffect(() =>
	{
		if (!firstUpdate.current)
		{
			console.log(contractUrl, urlStatus, props.ethAccount);
			callLambdaFunction("updateURLAccountStatus", {
				url: contractUrl, urlStatus: urlStatus, ethAccount: props.ethAccount
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
			signers={signers}
			setSigners={setSigners}
			image={image}
			setImage={setImage}
			hash={hash}
			setHash={setHash}
			fileInformation={fileInformation}
			setFileInformation={setFileInformation}
			deployedContract={deployedContract}
			setDeployedContract={setDeployedContract}
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
			pageType = <ContractPageSigner {...props}/>;
		}

		else
		{
			pageType = <ContractPageForbidden {...props}/>;
		}
	}

	return pageType;
};


export default ContractPage;
