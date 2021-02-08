"use strict";
import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers';
import {UserService} from "../../services/UserService";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({

    gridBox: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, minmax(auto, 1fr))',

    },

    row1: {
        gridColumnEnd: 'span 12'
    },

    row2: {
        gridColumnEnd: 'span 6',
        width: '20%',
    },

    rowStart: {
        gridColumnStart: '1'
    },

    rowShort: {
        gridColumnEnd: 'span 6'
    },

    textField: {
        marginLeft: '2em',
        marginTop: '2em',
        marginRight: '2em',
        minHeight: '20px',
    },

    timeField: {
        marginLeft: '2em',
        minHeight: '20px',
        paddingBottom: '1em',
        paddingTop: '0.6em',

    },

    title: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '1em',
        alignItems: 'center',
        marginLeft: '2em',
        marginTop: '2em',
    },

    rowSelect: {
        width: '200px'
    }

}));

export default function UserInfo(props) {
    const classes = useStyles()

    const [firstNameError, setFirstNameError] = useState('');
    const [firstNameValidation, setFirstNameValidation] = useState(true);

    const [lastNameError, setLastNameError] = useState('');
    const [lastNameValidation, setLastNameValidation] = useState(true);

    const [streetError, setStreetError] = useState('');
    const [streetValidation, setStreetValidation] = useState(true);

    const [streetNumberError, setStreetNumberError] = useState('');
    const [streetNumberValidation, setStreetNumberValidation] = useState(true);

    const [cityError, setCityError] = useState('');
    const [cityValidation, setCityValidation] = useState(true);

    const [postalCodeError, setPostalCodeError] = useState('');
    const [postalCodeValidation, setPostalCodeValidation] = useState(true);

    const [emailError, setEmailError] = useState('');
    const [emailValidation, setEmailValidation] = useState(true);

    const [dateError, setDateError] = useState('');
    const [dateValidation, setDateValidation] = useState(true);

    const [restaurantNameError, setRestaurantNameError] = useState('');
    const [restaurantNameValidation, setRestaurantNameValidation] = useState(true);

    const [countryError, setCountryError] = useState('');
    const [countryValidation, setCountryValidation] = useState(true);

    const [homepageError, setHomepageError] = useState('');
    const [homepageValidation, setHomepageValidation] = useState(true);

    const booking = props.booking;

    useEffect(
        () => {
            const fetchData = () => {
                UserService.getUser().then(res => {
                    props.setTitleData(res.data.title)
                    props.setFNameData(res.data.firstName)
                    props.setLNameData(res.data.lastName)
                    props.setStreetData(res.data.streetname)
                    props.setStreetNrData(res.data.houseNumber)
                    props.setPLZData(res.data.zipCode)
                    props.setCityData(res.data.city)

                    if (booking)
                        props.setEmailData(res.data.email)

                    if (!booking) {
                        props.setCountryData(res.data.country)
                        if (UserService.isAuthenticated() && UserService.currentUserValue.isChef) {
                            props.setRestaurantNameData(res.data.restaurantName)
                            props.setHomepageData(res.data.homepage)
                        }
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
            fetchData()
        },
        []
    )

    useEffect(
        () => {
            if (
                firstNameValidation &&
                lastNameValidation &&
                streetValidation &&
                streetNumberValidation &&
                cityValidation &&
                postalCodeValidation &&
                dateValidation &&
                emailValidation
            ) {
                if (booking) {
                    props.setPaymentDisabled(false)
                } else if (
                    countryValidation &&
                    restaurantNameValidation &&
                    homepageValidation
                ) {
                    props.setSubmitDisabled(false)
                }
            } else {
                if (booking) {
                    props.setPaymentDisabled(true)
                } else {
                    props.setSubmitDisabled(true)
                }
            }
        },
        [firstNameError, lastNameError, streetError, streetNumberError, cityError, postalCodeError,
            dateError, emailError]
    );

    const handleFNameChange = (event) => {
        if (event.target.value.length <= 0) {
            setFirstNameError('At least 1 character')
            setFirstNameValidation(false)
        } else if (event.target.value.length > 255) {
            setFirstNameError('First name is too long')
            setFirstNameValidation(false)
        } else {
            setFirstNameError('')
            setFirstNameValidation(true)
        }
        props.setFNameData(event.target.value);
    };


    const handleLNameChange = (event) => {
        if (event.target.value.length <= 0) {
            setLastNameError('At least 1 character')
            setLastNameValidation(false)
        } else if (event.target.value.length > 255) {
            setLastNameError('Last name is too long')
            setLastNameValidation(false)
        } else {
            setLastNameError('')
            setLastNameValidation(true)
        }
        props.setLNameData(event.target.value);
    };

    const handleStreetChange = (event) => {
        if (event.target.value.length <= 0) {
            setStreetError('At least 1 character')
            setStreetValidation(false)
        } else if (event.target.value.length > 50) {
            setStreetError('Street is too long')
            setStreetValidation(false)
        } else {
            setStreetError('')
            setStreetValidation(true)
        }
        props.setStreetData(event.target.value);
    };

    const handleStreetNrChange = (event) => {
        if (event.target.value.length <= 0) {
            setStreetNumberError('At least 1 character')
            setStreetNumberValidation(false)
        } else if (event.target.value.length > 50) {
            setStreetNumberError('Street number is too long')
            setStreetNumberValidation(false)
        } else {
            setStreetNumberError('')
            setStreetNumberValidation(true)
        }
        props.setStreetNrData(event.target.value);
    };

    const handleCityChange = (event) => {
        if (event.target.value.length <= 0) {
            setCityError('At least 1 character')
            setCityValidation(false)
        } else if (event.target.value.length > 50) {
            setCityError('At most 50 characters long')
            setCityValidation(false)
        } else {
            setCityError('')
            setCityValidation(true)
        }
        props.setCityData(event.target.value);
    };

    const handlePLZChange = (event) => {
        const postalCode = new RegExp("^[0-9]*$")
        if (!postalCode.test(event.target.value)) {
            setPostalCodeError('No letters allowed')
            setPostalCodeValidation(false)
        } else if (event.target.value.length <= 0) {
            setPostalCodeError('At least 1 character')
            setPostalCodeValidation(false)
        } else {
            setPostalCodeError('')
            setPostalCodeValidation(true)
        }
        props.setPLZData(event.target.value);
    };

    const handleEmailChange = (event) => {
        const email = new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])');
        if (!email.test(event.target.value)) {
            setEmailError('Email must be valid')
            setEmailValidation(false)
        } else {
            setEmailError('')
            setEmailValidation(true)
        }
        props.setEmailData(event.target.value);
    };

    const handleDateChange = (date) => {
        props.setSelectedDate(date);
    };

    const handleTitleChange = (event) => {
        props.setTitleData(event.target.value);
    };

    const handleCountryChange = (event) => {
        props.setCountryData(event.target.value);
        const regex = /^[a-zA-Z äöüÄÖÜßéÉèÈêÊ]*$/;
        if (event.target.value.length < 1) {
            setCountryError("Please enter a country");
        } else if (!regex.test(event.target.value)) {
            setCountryError("Only characters are allowed");
        } else if (event.target.value.length > 1000) {
            setCountryError("Country name is too long");
        } else {
            setCountryError('');
        }
    };

    const handleRestaurantNameChange = (event) => {
        props.setRestaurantNameData(event.target.value);
        const regex = /^[a-zA-Z äöüÄÖÜßéÉèÈêÊ]*$/;
        if (event.target.value.length < 1) {
            setRestaurantNameError("Please enter a restaurant name");
        } else if (!regex.test(event.target.value)) {
            setRestaurantNameError("Only characters are allowed");
        } else if (event.target.value.length > 1000) {
            setRestaurantNameError("Restaurant name is too long");
        } else {
            setRestaurantNameError('');
        }
    };

    const handleHomepageChange = (event) => {
        props.setHomepageData(event.target.value);
        const regex = /(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        if (event.target.value.length < 1) {
            setHomepageError("Please enter a website");
        } else if (!regex.test(event.target.value)) {
            setHomepageError("Please enter a valid website");
        } else if (event.target.value.length > 1000) {
            setHomepageError("Website url is too long");
        } else {
            setHomepageError('');
        }
    };


    return (
        <div
            className={classes.gridBox}>
            <div className={`${classes.row1}
             ${classes.title}`}>
                {booking ?
                    <Typography component="h4" variant="h4">
                        Delivery Details
                    </Typography>
                    : null}
            </div>

            <div className={`${classes.row2} ${classes.textField} ${classes.rowStart}`}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Title</InputLabel>
                    <Select className={classes.rowSelect}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={props.title}
                            onChange={handleTitleChange}
                    >
                        <MenuItem value={'Mr'}>Mr</MenuItem>
                        <MenuItem value={'Mrs'}>Mrs</MenuItem>
                        <MenuItem value={'Ms'}>Ms</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <TextField className={`${classes.rowShort} ${classes.textField} ${classes.rowStart}`}
                       margin="dense"
                       value={props.firstname}
                       id="firstname"
                       label="First Name"
                       type="text"
                       helperText={firstNameError}
                       error={firstNameError.length > 0}
                       onChange={handleFNameChange}
                       required
            />

            <TextField className={`${classes.rowShort} ${classes.textField} `}
                       margin="dense"
                       value={props.lastname}
                       id="lastname"
                       label="Last Name"
                       type="text"
                       helperText={lastNameError}
                       error={lastNameError.length > 0}
                       onChange={handleLNameChange}
                       required
            />
            <TextField className={`${classes.rowShort} ${classes.textField} ${classes.rowStart}`}
                       margin="dense"
                       value={props.streetname}
                       id="streetname"
                       label="Street"
                       type="text"
                       helperText={streetError}
                       error={streetError.length > 0}
                       onChange={handleStreetChange}
                       required
            />

            <TextField className={`${classes.rowShort} ${classes.textField}`}
                       margin="dense"
                       value={props.streetnr}
                       id="streetnr"
                       label="Streetnumber"
                       type="text"
                       helperText={streetNumberError}
                       error={streetNumberError.length > 0}
                       onChange={handleStreetNrChange}
                       required
            />

            <TextField className={`${classes.rowShort} ${classes.textField} ${classes.rowStart}`}
                       margin="dense"
                       value={props.plz}
                       id="plz"
                       label="Postal Code"
                       type="text"
                       helperText={postalCodeError}
                       error={postalCodeError.length > 0}
                       onChange={handlePLZChange}
                       required
            />

            <TextField className={`${classes.rowShort} ${classes.textField}`}
                       margin="dense"
                       value={props.city}
                       id="city"
                       label="City"
                       type="text"
                       helperText={cityError}
                       error={cityError.length > 0}
                       onChange={handleCityChange}
                       required
            />


            {booking ?

                <TextField className={`${classes.rowShort} ${classes.textField} ${classes.rowStart}`}
                           margin="dense"
                           value={props.email}
                           id="email"
                           label="Email"
                           type="text"
                           helperText={emailError}
                           error={emailError.length > 0}
                           onChange={handleEmailChange}
                           required
                />
                : null}
            {!booking ?
                <TextField className={`${classes.rowShort} ${classes.textField} `}
                           margin="dense"
                           value={props.country}
                           id="country"
                           label="Country"
                           type="text"
                           helperText={countryError}
                           error={countryError.length > 0}
                           onChange={handleCountryChange}
                           required
                />
                : null}

            {!booking && UserService.isAuthenticated() && UserService.currentUserValue.isChef ?

                <TextField className={`${classes.rowShort} ${classes.textField} ${classes.rowStart}`}
                           margin="dense"
                           value={props.restaurantName}
                           id="restaurantName"
                           label="Restaurant Name"
                           type="text"
                           helperText={restaurantNameError}
                           error={restaurantNameError.length > 0}
                           onChange={handleRestaurantNameChange}
                           required
                />
                : null}

            {!booking && UserService.isAuthenticated() && UserService.currentUserValue.isChef ?
                <TextField className={`${classes.rowShort} ${classes.textField} `}
                           margin="dense"
                           value={props.homepage}
                           id="homepage"
                           label="Homepage"
                           type="text"
                           helperText={homepageError}
                           error={homepageError.length > 0}
                           onChange={handleHomepageChange}
                           required
                />
                : null}
            {booking ?

                <div className={`${classes.rowShort} ${classes.timeField} `}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Preferred Delivery Time"
                            value={props.selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                : null}


        </div>
    )
}
