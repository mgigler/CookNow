"use strict";

import React, {useState} from 'react';
import {UserService} from "../services/UserService";
import LoginForm from "../components/Login/LoginForm";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

export class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleClose = () => {
        this.setState({
            open: false,
        });
    }

    login(user) {
        UserService.login(user.email, user.password)
            .then((data) => {
            this.props.history.push('/');
        }).catch((e) => {
            this.setState({
                error: e
            });
            if (e.status === 404) {
                this.setState({
                    open: true,
                    error: e.data.error
                });
            }
            if (e.status === 401) {
                this.setState({
                    open: true,
                    error: "Incorrect Password"
                });
            }
        })
    }

    render() {
        return (
            <div>
                <LoginForm onSubmit={(user) => this.login(user)}/>
                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                        {this.state.error}
                    </Alert>
                </Snackbar>
            </div>
        );

    }

}