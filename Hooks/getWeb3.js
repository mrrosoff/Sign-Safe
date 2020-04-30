import Web3 from "web3";
import UniLogin from '@unilogin/provider';

export const testWeb3 = async () =>
{
    try
    {
        if(window.web3)
        {
            window.web3 = new Web3(web3.currentProvider, null, {transactionConfirmationBlocks: 1});
            return web3;
        }
    }

    catch(error)
    {
        return null;
    }
};


export const getWeb3 = async () =>
{
    const unilogin = UniLogin.createPicker(window.ethereum);
    const web3 = new Web3(unilogin);
    web3.currentProvider.enable();
    return web3;
};

export const loadWeb3AccountListener = (callback) =>
{
    if (window.ethereum)
    {
        window.ethereum.on('accountsChanged', function(accounts)
        {
            callback(accounts[0].toLowerCase())
        });
    }
};

