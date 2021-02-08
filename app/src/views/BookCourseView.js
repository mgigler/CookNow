"use strict";

import React from 'react';
import BookCourse from "../components/BookCourse/BookCourse";

export class BookCourseView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const title = this.props.location.aboutProps.title
        const startTime = this.props.location.aboutProps.startTime
        const endTime = this.props.location.aboutProps.endTime
        const price = this.props.location.aboutProps.price
        const courseId = this.props.location.aboutProps.courseId
        const instanceId = this.props.location.aboutProps.instanceId
        const courseImage = this.props.location.aboutProps.courseImage


        return (
            <BookCourse title={title} startTime={startTime} endTime={endTime} price={price} courseId={courseId}
                        instanceId={instanceId}
                        courseImage={courseImage}/>
        );
    }

}