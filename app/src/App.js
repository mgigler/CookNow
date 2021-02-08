"use strict";

import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import CourseDetailView from "./views/CourseDetailView";
import {CreateCourseFormView} from "./views/CreateCourseFormView";
import {HomepageView} from "./views/HomepageView";
import {BookCourseView} from './views/BookCourseView';
import CourseOverview from "./views/CourseOverview";
import {RegistrationView} from './views/RegistrationView';
import {LoginView} from './views/LoginView';
import {SuccessPaymentView} from "./views/SuccessPaymentView";
import {FailPaymentView} from "./views/FailPaymentView";
import Navbar from "./components/Navbar";
import './styles/index.css';
import {UserService} from "./services/UserService";
import UpdateCourseFormView from "./views/UpdateCourseFormView";
import UserView from "./views/UserView";
import {PrivateRoute} from "./components/PrivateRoute";
import NoAccessCreateCourseView from "./views/NoAccessCreateCourseView";

const UserContext = React.createContext({
    user: null
});

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            title: 'Cook Now',
            routes: [
                {component: HomepageView, path: '/', exact: true},
                {component: CourseDetailView, path: '/course/:id/:instanceId', exact: true},
                {component: RegistrationView, path: '/registration', exact: true},
                {component: LoginView, path: '/login', exact: true},
                {component: CourseOverview, path: '/courses', exact: true},
                {component: NoAccessCreateCourseView, path: '/noaccess', exact: true},
            ]
        };
    }

    componentDidMount() {
        document.title = this.state.title;
        UserService.currentUser.subscribe(u => this.setState({ currentUser: u }));
    }

    render() {
        return (
            <UserContext.Provider>
                <Navbar/>
                <Router>
                    <Switch>
                        {!UserService.isAuthenticated() &&
                        <Route path='/' exact component={HomepageView} />
                        }
                        <PrivateRoute path={'/course/create'}  component={CreateCourseFormView} />
                        <PrivateRoute path={'/course/:id/edit'}  component={UpdateCourseFormView} />
                        <PrivateRoute path={'/profile'}  component={UserView} />
                        <PrivateRoute path={'/payment/success'}  component={SuccessPaymentView} />
                        <PrivateRoute path={'/payment/fail'}  component={FailPaymentView} />
                        <PrivateRoute path={'/course/:id/book'}  component={BookCourseView} />

                        {this.state.routes.map((route, i) => (<Route key={i} {...route}/>))}
                    </Switch>

                </Router>
            </UserContext.Provider>
        );
    }
}
