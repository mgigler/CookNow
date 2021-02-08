"use strict";
import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CourseInfo from "./CourseInfo";
import UserInfo from "./UserInfo";
import {Button, Card} from "@material-ui/core";
import {OrderService} from "../../services/OrderService";
import { useHistory } from "react-router-dom";
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
        backgroundImage: 'url(" ' + props.courseImage + '")',
        backgroundPosition: "0 37%",
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

    userBox: {
        gridColumnEnd: 'span 7',
        gridRowEnd: 'span 12',
        [theme.breakpoints.down('sm')]: {
            gridColumnEnd: 'span 12',
        },
    },

    courseBox: {
        gridColumnEnd: 'span 4',
        gridRowEnd: 'span 12',
        [theme.breakpoints.down('sm')]: {
            gridColumnEnd: 'span 12',
            gridColumnStart: '0',
        },
    },

    //@TODO css kann gelöscht werden
    card: {
        boxShadow: '0 4px 5px rgba(0, 0, 0, 0.6)',
        borderRadius: '5px',
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

export default function BookCourse(props) {


    const classes = useStyles(props)
    let history = useHistory();

    const courseTitle = props.title
    const courseDateStart = props.startTime
    const courseDateEnd = props.endTime
    const coursePrice = props.price
    const courseId = props.courseId
    const instanceId = props.instanceId
    const [title, setTitleData] = useState("");
    const [firstname, setFNameData] = useState("");
    const [lastname, setLNameData] = useState("");
    const [streetname, setStreetData] = useState("");
    const [streetnr, setStreetNrData] = useState("");
    const [plz, setPLZData] = useState("");
    const [city, setCityData] = useState("");
    const [email, setEmailData] = useState("");
    const [paymentDisabled, setPaymentDisabled] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const setOrder = (order) => {
        OrderService.order(order).then((data) => {
            history.push('/payment/success');
        }).catch((e) => {
            console.error(e);
            history.push('/payment/fail');
        })
    };


    return (
        <div className={classes.main}>
                 <div className={classes.headerImg}>
                     <div className={classes.image}/>
                 </div>
            <div className={classes.gridBox}>
                <FontAwesomeIcon className={classes.iconButton} icon={['fa', 'arrow-left']} onClick={goBack}/>
                <div className={`${classes.mainBox}`}>
                    <div className={classes.gridBox}>
                        <Card className={`${classes.userBox}`}>
                            <UserInfo
                                booking={true}
                                setTitleData={setTitleData}
                                setFNameData={setFNameData}
                                setLNameData={setLNameData}
                                setStreetData={setStreetData}
                                setStreetNrData={setStreetNrData}
                                setPLZData={setPLZData}
                                setCityData={setCityData}
                                setEmailData={setEmailData}
                                setSelectedDate={setSelectedDate}
                                setPaymentDisabled={setPaymentDisabled}

                                title={title}
                                firstname={firstname}
                                lastname={lastname}
                                streetname={streetname}
                                streetnr={streetnr}
                                plz={plz}
                                city={city}
                                email={email}
                                selectedDate={selectedDate}
                                paymentDisabled={paymentDisabled}
                            />
                        </Card>
                        <Card className={`${classes.courseBox}`}>
                            <CourseInfo paymentHandler={(order) => setOrder(order)}
                                        onSubmit={(user) => setAddress(user)}
                                        title={title}
                                        firstname={firstname}
                                        lastname={lastname}
                                        streetname={streetname}
                                        streetnr={streetnr}
                                        plz={plz}
                                        city={city}
                                        email={email}
                                        selectedDate={selectedDate}
                                        courseTitle={courseTitle}
                                        courseDateStart={courseDateStart}
                                        courseDateEnd={courseDateEnd}
                                        coursePrice={coursePrice}
                                        courseId={courseId}
                                        instanceId={instanceId}
                                        paymentDisabled={paymentDisabled}

                            />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
