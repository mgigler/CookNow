"use strict";
import React from 'react';
import Rating from '@material-ui/lab/Rating';
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import moment from "moment";
import {UserService} from "../../services/UserService";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {CourseService} from "../../services/CourseService";
import RatingDialog from "./RatingDialog";

const useStyles = makeStyles((theme) => ({

    card: {
        padding: '5px',
        margin: '10px 0',
    },
    ratingWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    list: {
        listStyleType: "none",
        padding: "0px",
        display: "flex",
        justifyContent: "space-between",
    },
    icon: {
        cursor: "pointer",
    }

}));

export default function RatingComp(props) {

    const classes = useStyles()

    const handleRemoveRating = async (ratingId) => {
        CourseService.removeRating(props.courseId, ratingId)
            .then(props.onRatingDelete(true))
            .catch(err => console.log(err))
    }

    const handleUpdateRating = async (ratingId, rating) => {
        CourseService.updateRating(props.courseId, {
            "ratingId": ratingId,
            "rating": rating.rating,
            "title": rating.title,
            "description": rating.description
        }).then(props.onRatingDelete(true))
            .catch(err => console.log(err))
    }

    const showRemoveRating = (ratingUserId, ratingId, ratingTitle, ratingDescription, ratingStars) => {

        if (UserService.currentUserValue !== null && ratingUserId === UserService.currentUserValue.id) {
            return <div>
                <RatingDialog update={true} onSubmit={(e) => handleUpdateRating(ratingId, e)} title={ratingTitle}
                              description={ratingDescription} rating={ratingStars}/>
                <FontAwesomeIcon key={ratingId} icon={['fa', 'trash']} onClick={() => handleRemoveRating(ratingId)}
                                 fixedWidth className={classes.icon}/>
            </div>
        }
    }

    return (
        <div>
            {props.ratings.map((rating, index) => (
                <Card key={index} className={classes.card}>
                    <div className={classes.ratingWrapper}>
                        <Rating size='small' name="size-medium" value={rating.rating} readOnly={true}/>
                        {showRemoveRating(rating.userId, rating._id, rating.title, rating.description, rating.rating)}
                    </div>
                    <ul className={classes.list}>
                        <li>Author: {rating.firstName}</li>
                        <li>{moment(rating.createdAt).format("DD.MM.YYYY HH:mm")}</li>
                    </ul>
                    <h3>{rating.title}</h3>
                    <p>{rating.description}</p>
                </Card>
            ))}
        </div>
    )
}

