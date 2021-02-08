"use strict";

import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Link} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({

    courseCard: {
        margin: '10px',
        gridColumnEnd: 'span 4',
        borderRadius: '5px',
        [theme.breakpoints.down('sm')]: {
            gridColumnEnd: 'span 6',
        },
        [theme.breakpoints.down('xs')]: {
            gridColumnEnd: 'span 12',
        },

    },
    header: {
        //overflow: 'hidden',
        //maxWidth: '100%',
        //textOverflow: 'clip',
        flex: '1 1 auto',
    },
    courseContent: {
        display: 'flex',
        flexFlow: 'column',
        height: '100%'
    },
    courseTitle: {
        textAlign: 'center',
        padding: '16px',
        paddingBottom: '0',

    },
    courseSubtitle: {
        textAlign: 'center',
        fontFamily: 'Pt Serif, serif',
        paddingBottom: '16px',
    },
    imageHolder: {
        width: '100%',
        paddingTop: '100%',
        overflow: 'hidden',
        position: 'relative',
    },
    image: props => ({
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundImage: 'url(" ' + props.courseImage + '")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        textIndent: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    }),
    cardFooter: {
        padding: '12px',
        fontSize: '1.1rem',
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: 'Pt Serif, serif',
    },
}));

export default function CourseCard(props) {
    const classes = useStyles(props);
    return (
        <Card className={classes.courseCard}>
            <Link to={`/course/${props.id}/${props.instance_id}`} style={{textDecoration: 'none', color: 'black'}}>
                <div className={classes.courseContent}>
                    <div className={classes.header}>
                        <Typography component="h5" variant="h5" className={classes.courseTitle}>
                            {props.courseTitle}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" className={classes.courseSubtitle}>
                            {props.chefName}
                        </Typography>
                    </div>
                    <div className={classes.imageHolder}>
                        <div className={classes.image}/>
                    </div>
                    <CardActions className={classes.cardFooter}>
                        <div>
                            <FontAwesomeIcon icon={['far', 'calendar-times']} fixedWidth/>
                            <span> {moment(props.startDate).format("DD.MM.YYYY HH:mm")}</span>
                        </div>
                        <div>
                            <span> {props.costs}</span>
                            <FontAwesomeIcon icon={['fas', 'euro-sign']} fixedWidth/>
                        </div>
                    </CardActions>
                </div>
            </Link>
        </Card>
    );
}
