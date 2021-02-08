"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './components/FontAwesome';

import WebFontLoader from 'webfontloader';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";


WebFontLoader.load({
    google: {
        families: ['PT Serif:400,700', 'Material Icons', 'Raleway:400,700'],
    },
});

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2C8577',
        },
        secondary: {
            main: '#6f6f6f',
        },
        textfont: {
            main: '#FFFFFF',
        },
        background: {
            paper: '#fff',
            default: '#e5e5e5'
        }
    },
    typography: {
        fontFamily: 'Raleway',
        h1: {
            fontFamily: 'Pt Serif, serif',
        },
        h2: {
            fontFamily: 'Pt Serif, serif',
        },
        h3: {
            fontFamily: 'Pt Serif, serif',
        }, h4: {
            fontFamily: 'Pt Serif, serif',
        },
        h5: {
            fontFamily: 'Pt Serif, serif',
        },


    }
});

ReactDOM.render(<MuiThemeProvider theme={theme}>
    <CssBaseline/>
    <App/> </MuiThemeProvider>, document.getElementById('app'));