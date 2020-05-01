import Web3 from "web3";
import Onboard from 'bnc-onboard'

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
    let web3 = null;

    const wallets = [
        { walletName: "coinbase", preferred: true },
        { walletName: "metamask", preferred: true },
        { walletName: "torus", preferred: true },
        { walletName: "dapper",  },
        { walletName: "unilogin" },
    ];

    const onboard = Onboard(
        {
            dappId: "d8557b0d-3b65-4826-b336-d502f90f1b6f",
            networkId: 4,
            subscriptions: { wallet: wallet => web3 = new Web3(wallet.provider) },
            walletSelect: { wallets: wallets }
        }
    );

    if (await onboard.walletSelect())
    {
        await onboard.walletCheck();
    }

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


