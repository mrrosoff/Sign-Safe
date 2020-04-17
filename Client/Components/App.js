import React, { useEffect, useState } from "react";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";

import { SnackbarProvider, useSnackbar } from 'notistack';

import {getWeb3, loadWeb3AccountListener} from "../Hooks/getWeb3";

import Router from "./Router";

const LoadApp = () => {

    const [web3, setWeb3] = useState();
    let [ethAccount, setEthAccount] = useState("");

    useEffect(() => {
        getWeb3().then(web3Container => {
            if (web3Container) {
                setWeb3(web3Container);
                web3Container.eth.getAccounts().then(e => setEthAccount(e[0].toLowerCase()));
                loadWeb3AccountListener(setEthAccount);
            } else {
                setWeb3(null);
                produceSnackBar("Failure To acquire Metamask. Please Sign In and Refresh.")
            }
        });
    }, []);

    const { enqueueSnackbar } = useSnackbar();
    const produceSnackBar = (message, variant = "error") => enqueueSnackbar(message, { variant: variant });

    return <Router web3={web3} ethAccount={ethAccount} produceSnackBar={produceSnackBar}/>;
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
