"use strict";

import React from 'react';
import {UserService} from "../services/UserService";
import RegistrationForm from "../components/Registration/RegistrationForm";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

export class RegistrationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleClose = () => {
        this.setState({
            open: false,
        });
    }

    signup(user, isChef) {

        if (isChef){
            UserService.registerChef(user).then((data) => {
                this.props.history.push('/login');
            }).catch((e) => {
                console.error(e);
                this.setState({
                    error: e
                });
            })
        }
        else {
            UserService.registerCustomer(user).then((data) => {
                this.props.history.push('/login');
            }).catch((e) => {
                this.setState({
                    error: e
                });
                if (e.status === 400) {
                    this.setState({
                        open: true,
                        error: e.data.error
                    });
                }

            })
        }


    }

    render() {
        return (
            <div>
                <RegistrationForm onSubmit={(user, isChef) => this.signup(user, isChef)}/>
                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                        {this.state.error}
                    </Alert>
                </Snackbar>
            </div>
        );
    }

}