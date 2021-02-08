"use strict";
import CreateCourseForm from '../components/CreateCourse/CreateCourseForm';

import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {CourseService} from "../services/CourseService";

export default function UpdateCourseFormView(props) {

    const [course, setCourse] = useState();
    const id = props.computedMatch.params.id;
    const history = useHistory();

    useEffect(
        () => {
            const fetchData = () => {
                CourseService.getCourse(id).then(res => {
                    setCourse(res.data);
                }).catch(err => {
                    console.log(err);
                });
            }
            fetchData();
        },
        []
    );

    const updateCourse = (course) => {
        CourseService.updateCourse(course, id).then((data) => {
            history.push('/courses');
        }).catch((e) => {
            console.error(e);
        })
    };


    return (
        <div>
            <CreateCourseForm onSubmit={(course) => updateCourse(course)} course={course} update={true}/>
        </div>
    );

}