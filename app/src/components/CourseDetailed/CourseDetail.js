"use strict";

import {UserService} from "../../services/UserService";

import React, {useEffect, useState} from 'react';
import {Button, makeStyles} from '@material-ui/core';
import {Link} from "react-router-dom";
import RatingDialog from "./RatingDialog";
import RatingComp from "./RatingComp";
import MenuItem from "./MenuItem";
import Ingredient from "./Ingredient";
import RequiredItem from "./RequiredItem";
import {CourseService} from "../../services/CourseService";
import moment from "moment";
import IngredientCalculator from "./IngredientCalculator";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const useStyles = makeStyles((theme) => ({

    headerImg: {
        objectFit: 'cover',
        height: '280px',
        width: '100%',
    },

    image: props => ({
        width: '100%',
        height: '100%',
        backgroundImage: 'url(" ' + props.course.courseImage + '")',
        backgroundPosition: "0 37%",
        backgroundSize: 'cover',
    }),

    restaurantImage: props => ({
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        backgroundImage: 'url(" ' + props.course.userImage + '")',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundSize: 'cover',
    }),

    gridBox: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, minmax(auto, 1fr))',
        gridTemplateRows: 'repeat(12, minmax(auto, 1fr))',
        gridGap: '40px',
    },

    mainBox: {
        gridRowStart: '2',
        gridColumnStart: '2',
        gridRowEnd: 'span 10',
        gridColumnEnd: 'span 10',
        [theme.breakpoints.down('sm')]: {
            gridColumnEnd: 'span 10',
            gridRowStart: '1',
        },
        [theme.breakpoints.down('xs')]: {
            gridColumnEnd: 'span 12',
            gridColumnStart: '1',
            gridRowStart: '1',
        },
    },

    LeftBox: {
        gridColumnEnd: 'span 7',
        gridRowEnd: 'span 12',
        [theme.breakpoints.down('sm')]: {
            gridColumnEnd: 'span 12',
        },
    },

    RightBox: {
        gridColumnEnd: 'span 4',
        gridRowEnd: 'span 12',
        [theme.breakpoints.down('sm')]: {
            gridColumnEnd: 'span 12',
        },
        textAlign: 'center',
    },

    box3: {
        textAlign: 'center',
    },
    border: {
        borderBlockEnd: 'double #6f6f6f',
        paddingBottom: "1em",
    },
    elementsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1em',
        alignContent: 'start',
        borderBottom: "solid #6f6f6f 0.01em",
        paddingBottom: "1em",
    },
    ratingsWrapper: {
        marginBottom: '1em',
        paddingBottom: "1em",
    },
    headings: {
        width: '25%',
    },
    descriptions: {
        width: '70%',
    },
    iconButton: {
        cursor: "pointer",
        marginLeft: '1em',
        marginTop: '1em',
        marginBottom: '1em',
        minHeight: '20px',
        fontSize: '1.7rem'
    },

}));

function goBack() {
    window.history.back()
}


export default function CourseDetail(data) {

    const classes = useStyles(data)
    let currentDate = moment().format();

    const [isBooked, setIsBooked] = useState(false)
    const [isChefCourse, setIsChefCourse] = useState(false)


    let instanceId = data.instanceId
    let courseId = data.courseId

    const storeRating = (rating) => {
        if (UserService.isAuthenticated()) {
            CourseService.addRating(data.course.courseId,
                {
                    instanceId: data.course.instanceId,
                    rating: rating["rating"],
                    title: rating["title"],
                    description: rating["description"]
                }).then(data.onRatingChange(true))
                .catch((e) => {
                    console.error(e);
                })
        }
    }


    useEffect(
        () => {
            const fetchData = () => {
                if (UserService.isAuthenticated() && UserService.currentUserValue.isChef) {
                    CourseService.isChefCourse(courseId).then(res => {
                        setIsChefCourse(res.data)

                    }).catch(err => {
                        console.log(err);
                    });
                }
                if (UserService.isAuthenticated() && !UserService.currentUserValue.isChef) {
                    CourseService.isUserCourse(instanceId).then(res => {
                        setIsBooked(res.data)

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
        <div className={classes.main}>
            <div className={classes.headerImg}>
                <div className={classes.image}/>
            </div>

            <div className={classes.gridBox}>
                <FontAwesomeIcon className={classes.iconButton} icon={['fa', 'arrow-left']} onClick={goBack}/>
                <div className={classes.mainBox}>
                    <div className={classes.gridBox}>
                        <div className={classes.LeftBox}>
                            <div className={classes.border}>
                                <Typography component="h4" variant="h4">{data.course.courseTitle}</Typography>
                            </div>
                            <p> {data.course.description}</p>
                            <div className={classes.elementsWrapper}>
                                <div className={classes.headings}>
                                    <Typography component="h5" variant="h5">Menu</Typography>
                                </div>
                                <div className={classes.descriptions}>
                                    <MenuItem items={data.course.dishes}/>
                                </div>
                            </div>
                            <div className={classes.elementsWrapper}>
                                <div className={classes.headings}>
                                    <Typography component="h5" variant="h5">Provided Ingredients</Typography>
                                </div>
                                <div className={classes.descriptions}>
                                    <Ingredient ingredients={data.course.ingredients}/></div>
                            </div>
                            <div className={classes.elementsWrapper}>
                                <div className={classes.headings}>
                                    <Typography component="h5" variant="h5">Required Items</Typography>
                                </div>
                                <div className={classes.descriptions}>
                                    <RequiredItem items={data.course.equipment}/></div>
                            </div>
                            <div className={classes.ratingsWrapper}>

                                <Typography component="h5" variant="h5">Ratings</Typography>
                            </div>
                            <RatingComp ratings={data.course.ratings} courseId={data.course.courseId}
                                        onRatingDelete={(e) => data.onRatingChange(true)}/>

                        </div>
                        <div className={classes.RightBox}>
                            <div className={classes.box3}>
                                <div className={classes.restaurantImage}/>
                            </div>
                            <p/>
                            <Typography component="h5" variant="h5">Restaurant Details</Typography>
                            <p>Chef {data.course.chefFirstName} {data.course.chefLastName}</p>
                            <p>{data.course.restaurantName}</p>
                            <p>{data.course.homepage}</p>
                            <Typography component="h5" variant="h5">Course Details</Typography>
                            <p>Date: {moment(data.course.startDate).format("DD.MM.YYYY")}</p>
                            <p>Starttime: {moment(data.course.startDate).format("HH:mm")}</p>
                            <p>Endtime: {moment(data.course.endDate).format("HH:mm")}</p>
                            <p>up to {data.course.maxParticipants} Participants</p>
                            <p>{data.course.cost}€</p>
                            {UserService.isAuthenticated() && !UserService.currentUserValue.isChef && data.course.endDate > currentDate && data.course.bookable ?
                                <Button variant="contained" color="primary">
                                    <Link to={{
                                        pathname: `/course/${data.course.courseId}/book`, aboutProps: {
                                            title: data.course.courseTitle, price: data.course.cost,
                                            startTime: data.course.startDate, endTime: data.course.endDate,
                                            courseImage: data.course.courseImage, courseId: data.course.courseId,
                                            instanceId: data.course.instanceId
                                        }
                                    }}
                                          style={{textDecoration: 'none', color: 'white'}}>
                                        Book Course
                                    </Link>
                                </Button>
                                : null}
                            <Snackbar open={!data.course.bookable} autoHideDuration={6000}>
                                <Alert severity="error">
                                    This Course is already booked out! <br/>
                                    Go to the Courses Page to find alternative dates and courses.
                                </Alert>
                            </Snackbar>
                            <p/>
                            {isChefCourse ?
                                <div>
                                    <Button variant="contained" color="primary">
                                        <Link to={{pathname: `/course/${data.course.courseId}/edit`}}
                                              style={{textDecoration: 'none', color: 'white'}}>
                                            Edit Course
                                        </Link>
                                    </Button>
                                    <p/>
                                    <IngredientCalculator instanceId={instanceId}/>
                                </div>
                                : null}
                            <p/>
                            {isBooked && data.course.endDate < currentDate ?
                                <div>
                                    <RatingDialog
                                        onSubmit={submission => storeRating(submission)}
                                    />
                                </div>
                                : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

