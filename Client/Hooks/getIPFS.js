import IPFS from 'ipfs-api';

export const getIPFS = async () =>
{
	try
	{
		return await new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
	}

	catch(error)
	{
		return null;
	}
};
