import Web3 from "web3";

export const getWeb3 = async () =>
{
    if (window.ethereum)
    {
        window.web3 = new Web3(ethereum);

        try
        {
            await ethereum.enable();
            return web3;

        }

        catch (error)
        {
            return error;
        }
    }

    else if (window.web3)
    {
        window.web3 = new Web3(web3.currentProvider);
        return web3;
    }

    else
    {
        console.log('Error Loading Blockchain. You should consider trying MetaMask!');
        return null;
    }
};

export const loadWeb3AccountListener = (callback) =>
{
    if (window.ethereum)
    {
        window.ethereum.on('accountsChanged', function(accounts)
        {
            callback(accounts[0])
        });
    }
};

