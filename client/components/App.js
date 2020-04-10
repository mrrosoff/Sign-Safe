import React from "react";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";

import { SnackbarProvider, useSnackbar } from 'notistack';

import Layout from "./Layout";

const LoadApp = () => {

    const { enqueueSnackbar } = useSnackbar();
    const produceSnackBar = (message, variant = "error") => enqueueSnackbar(message, { variant: variant });

    return <Layout produceSnackBar={produceSnackBar}/>;
};

const App = () => {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                    primary: { main: "#123456" },
                    secondary: { main: "#123456"}
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
