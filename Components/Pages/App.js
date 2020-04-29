import React, { useEffect, useState } from "react";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";

import { SnackbarProvider, useSnackbar } from 'notistack';

import {loadWeb3AccountListener, testWeb3} from "../../Hooks/getWeb3";

import Router from "../Router";
import {getIPFS} from "../../Hooks/getIPFS";

const LoadApp = props => {

    const [web3, setWeb3] = useState();
    let [ethAccount, setEthAccount] = useState("");
    const [IPFS, setIPFS] = useState();

    useEffect(() => {
        testWeb3().then(web3Provider => {
            setWeb3(web3Provider);
            if (web3Provider)
            {
                web3Provider.eth.getAccounts().then(e =>
                {
                    if(e.length !== 0)
                    {
                        setEthAccount(e[0].toLowerCase());
                        loadWeb3AccountListener(setEthAccount);
                    }
                });
            }
        });

        getIPFS().then(IPFSProvider => {

            if(IPFSProvider)
            {
                setIPFS(IPFSProvider);
            }

            else
            {
                setIPFS(IPFSProvider);
                produceSnackBar("Failure To Connect To The IPFS Node. Please Refresh.")
            }
        });
    }, []);

    const { enqueueSnackbar } = useSnackbar();
    const produceSnackBar = (message, variant = "error") => enqueueSnackbar(message, { variant: variant });

    return(
        <Router
            web3={web3}
            setWeb3={setWeb3}
            IPFS={IPFS}
            ethAccount={ethAccount}
            setEthAccount={setEthAccount}
            produceSnackBar={produceSnackBar}
            {...props}
        />
    );
};

const App = () => {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [darkMode, setDarkMode] = useState(prefersDarkMode);

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: darkMode ? 'dark' : 'light',
                    primary: { main: "#157F1F"},
                    secondary: { main: "#00A5CF"}
                },
            }),
        [darkMode],
    );

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3} preventDuplicate>
                <LoadApp darkMode={darkMode} setDarkMode={setDarkMode}/>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
