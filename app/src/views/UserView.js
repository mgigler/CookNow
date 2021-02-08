"use strict";

import React, {useEffect, useState} from 'react';
import User from "../components/User/User";
import {CourseService} from "../services/CourseService";
import {UserService} from "../services/UserService";

export default function UserView() {

    const [courses, setCourses] = useState({data: []});

    useEffect(
        () => {
            const fetchData = () => {
                if (UserService.isAuthenticated() && UserService.currentUserValue.isChef) {
                    CourseService.getChefCourses().then(res => {
                        setCourses(res)

                    }).catch(err => {
                        console.log(err);
                    });
                } else {
                    CourseService.getUserCourses().then(res => {
                        setCourses(res)

                    }).catch(err => {
                        console.log(err);
                    });
                }
            }
            fetchData()
        },
        []
    )


    return (
        <User courses={courses}/>
    );

}