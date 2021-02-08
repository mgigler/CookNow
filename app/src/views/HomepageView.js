
"use strict";

import React from 'react';
import Home from "../components/Home";


export class HomepageView extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <React.Fragment>
                <Home/>
            </React.Fragment>
        );
    }
}