import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {UserService} from "../services/UserService";


export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route render={props => {
        const currentUser = UserService.currentUserValue;
        if (!currentUser) {
            return <Redirect to={{pathname: '/login'}}/>
        }
        if (currentUser && !currentUser.isChef && (props.location.pathname === '/course/create' || props.location.pathname.endsWith('edit'))) {
            return <Redirect to={{pathname: '/noaccess'}}/>
        }
        if (currentUser && currentUser.isChef && props.location.pathname.endsWith('book')) {
            return <Redirect to={{pathname: '/noaccess'}}/>
        }
        return <Component {...props} {...rest} />
    }}/>
);