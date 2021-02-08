"use strict";
import CreateCourseForm from '../components/CreateCourse/CreateCourseForm';

import React from 'react';
import {CourseService} from "../services/CourseService";

export class CreateCourseFormView extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            data: []
        };
    }

    createCourse(course) {
        CourseService.createCourse(course).then((data) => {
            this.props.history.push('/courses');
        }).catch((e) => {
            console.error(e);
            this.setState({
                error: e
            });
        })
    }

    render() {
        return (
            <div>
                <CreateCourseForm onSubmit={(course) => this.createCourse(course)}/>
            </div>
        );
    }
}