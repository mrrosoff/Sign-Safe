const IPFSClient = require('ipfs-http-client');

export const getIPFS = async () =>
{
	try
	{
		return await new IPFSClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
	}

	catch(error)
	{
		return null;
	}
};
