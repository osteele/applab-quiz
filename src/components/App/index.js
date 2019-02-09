import React from 'react';
import Layout from '../Layout';

import {Provider} from 'react-redux';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import {ConnectedRouter} from 'connected-react-router'
import store, {firebase, history} from '../../store';
import {reactReduxFirebaseConfig} from '../../config';
import {SnackbarProvider} from 'notistack';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faUserAstronaut, faQuestion, faHome, faSignOutAlt, faVial, faPlusSquare, faScroll, faChartLine} from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';

const font = "'Lato', sans-serif"; 

// fontawesome
library.add(faUserAstronaut, faQuestion, faHome, faSignOutAlt, faVial, faPlusSquare, faScroll, faChartLine);

// material ui
// @see https://material-ui.com/customization/themes/
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#ff8e8c',
            main: '#455a64',
            dark: '#1c313a',
            contrastText: '#fff',
          },
          secondary: {
            light: '#4da9b7',
            main: '#017a87',
            dark: '#004e5a',
            contrastText: '#000',
          },
    },
    typography: {
        "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        "fontSize": 12,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
       }
});

Moment.globalFormat = 'MM/DD/YYYY';


// main App component
function App() {
    const rrfProps = {
        firebase,
        config: reactReduxFirebaseConfig,
        dispatch: store.dispatch,
    }

    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <ConnectedRouter history={history}>
                    <SnackbarProvider>
                        <MuiThemeProvider theme={theme}>
                            <Layout/>
                        </MuiThemeProvider>
                    </SnackbarProvider>
                </ConnectedRouter>
            </ReactReduxFirebaseProvider>
        </Provider>
    );
}

export default App;