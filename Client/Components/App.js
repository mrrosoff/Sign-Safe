import React, { useEffect, useState } from "react";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";

import { SnackbarProvider, useSnackbar } from 'notistack';

import {getWeb3, loadWeb3AccountListener} from "../Hooks/getWeb3";

import Router from "./Router";
import {getIPFS} from "../Hooks/getIPFS";

const LoadApp = () => {

    const [web3, setWeb3] = useState();
    let [ethAccount, setEthAccount] = useState("");
    const [IPFS, setIPFS] = useState();

    useEffect(() => {
        getWeb3().then(web3Provider => {
            if (web3Provider) {
                setWeb3(web3Provider);
                web3Provider.eth.getAccounts().then(e => setEthAccount(e[0].toLowerCase()));
                loadWeb3AccountListener(setEthAccount);
            } else {
                setWeb3(web3Provider);
                produceSnackBar("Failure To Acquire Web3 Provider. Please Refresh and Sign In.")
            }
        });

        getIPFS().then(IPFSProvider => {
            if(IPFSProvider) {
                setIPFS(IPFSProvider);
            } else {
                setIPFS(IPFSProvider);
                produceSnackBar("Failure To Connect To The IPFS Node. Please Refresh.")
            }
        });
    }, []);

    const { enqueueSnackbar } = useSnackbar();
    const produceSnackBar = (message, variant = "error") => enqueueSnackbar(message, { variant: variant });

    return <Router web3={web3} ethAccount={ethAccount} IPFS={IPFS} produceSnackBar={produceSnackBar}/>;
};

const App = () => {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                    primary: { main: "#157F1F" },
                    secondary: { main: "#00A5CF"}
                },
            }),
        [prefersDarkMode],
    );

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3} preventDuplicate>
                <LoadApp />
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
