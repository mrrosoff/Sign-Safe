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


export const getWeb3 = async (setWeb3, setEthAccount) =>
{
    const wallets = [
        { walletName: "metamask", preferred: true },
        {
            walletName: "torus",
            buildEnv: 'production',
            showTorusButton: false,
            enableLogging: true,
            preferred: true
        },
        {
            walletName: 'portis',
            apiKey: '7ed6089b-f117-43b0-8167-9d8761c7fa5e',
        },
        { walletName: "dapper" },
        { walletName: "coinbase" },
        { walletName: 'status' },
        { walletName: 'trust' },
        { walletName: "unilogin" },
    ];

    const onboard = Onboard(
        {
            dappId: "d8557b0d-3b65-4826-b336-d502f90f1b6f",
            networkId: 4,
            subscriptions:
                {
                    wallet: wallet => setWeb3(new Web3(wallet.provider)),
                    address: address => setEthAccount(address)
                },
            walletSelect:
                {
                    heading: "To Use Sign Safe, Please Choose a Wallet Provider.",
                    description: "This will allow a connection to the Ethereum Blockchain, the core element of our secure contracts.",
                    wallets: wallets
                }
        }
    );

    if (await onboard.walletSelect())
    {
        await onboard.walletCheck();
    }
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


