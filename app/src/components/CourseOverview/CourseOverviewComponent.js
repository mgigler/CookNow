"use strict";

import React from 'react';
import CourseCard from "./CourseCard";

export default function CourseOverviewComponent(data) {
    return (
        <React.Fragment>
            {data.courses.map(course => (
                <CourseCard key={course._id + "_" + course.instance_id} id={course._id} instance_id={course.instance_id}
                            courseTitle={course.title}
                            chefName={course.chefName} courseImage={course.courseImage} startDate={course.startDate}
                            costs={course.cost}/>
            ))}
        </React.Fragment>
    );
}