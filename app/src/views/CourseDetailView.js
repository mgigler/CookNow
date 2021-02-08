"use strict";

import React, {useEffect, useState} from 'react';
import CourseDetail from "../components/CourseDetailed/CourseDetail";
import {CourseService} from "../services/CourseService";

export default function CourseDetailView(props) {

    const [data, setData] = useState({
        title: '', description: '', chefName: '',
        dishes: [], ingredients: [], equipment: [], cost: 0, maxParticipants: 0, categories: [],
        instances: [{date: '2000-01-01T00:00:00.000Z', startTime: '', endTime: '', orders: []}]
        , startTime: '', ratings: [], courseImage: '', userImage: '', bookable: true
    });


    const [loading, setLoading] = useState(true);
    // ratingState changes if new Rating has been added or removed
    const [ratingState, setRatingState] = useState(false)
    const courseId = props.match.params.id
    const instanceId = props.match.params.instanceId


    useEffect(
        () => {
            const fetchData = () => {
                setLoading(true)
                CourseService.getInstance(instanceId).then(res => {
                    setData(res.data);
                    setLoading(false)

                }).catch(err => {
                    console.log(err);
                });
            }

            fetchData()
        },
        [ratingState]
    )
    return (
        <CourseDetail courseId={courseId} instanceId={instanceId} course={data}
                      onRatingChange={(e) => setTimeout((e) => setRatingState(!ratingState), 600)}/>
    );

}

