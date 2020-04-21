import Web3 from "web3";
import Torus from "@toruslabs/torus-embed";

export const getWeb3 = async () =>
{
    try
    {
        if (window.web3)
        {
            window.web3 = new Web3(web3.currentProvider);
            return web3;
        }

        else if (window.ethereum && ethereum.isMetaMask)
        {
            window.web3 = new Web3(ethereum);
            await ethereum.enable();
            return web3;
        }

        else
        {
            const torus = new Torus();
            await torus.init({showTorusButton: false});
            await torus.login();
            window.web3 = new Web3(torus.provider);
            return web3;
        }
    }

    catch(error)
    {
        return null;
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

