"use strict";


import React, {useState} from 'react';
import UserInfo from "../BookCourse/UserInfo";
import {Button, Dialog, DialogActions, DialogTitle} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import {UserService} from "../../services/UserService";
import CourseInfo from "../BookCourse/CourseInfo";

const useStyles = makeStyles((theme) => ({
    dialogTitle: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
}))

export default function UserDialog(props) {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [title, setTitleData] = useState("");
    const [firstname, setFNameData] = useState("");
    const [lastname, setLNameData] = useState("");
    const [streetname, setStreetData] = useState("");
    const [streetnr, setStreetNrData] = useState("");
    const [plz, setPLZData] = useState("");
    const [country, setCountryData] = useState("");
    const [city, setCityData] = useState("");
    const [restaurantName, setRestaurantNameData] = useState("");
    const [homepage, setHomepageData] = useState("");
    const [submitDisabled, setSubmitDisabled] = useState(false);

    const [data, setData] = useState({
        title: '', firstName: '',
        lastName: '', streetname: '', houseNumber: 0, zipCode: 0, city: '', country: '', email: ''
    });


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setOpen(false);
        //@TODO: Title und Images dynamisch laden
        let user;
        if (UserService.isAuthenticated() && UserService.currentUserValue.isChef) {
            user = {
                _id: UserService.currentUserValue.id,
                title: title,
                firstName: firstname,
                lastName: lastname,
                streetname: streetname,
                houseNumber: streetnr,
                zipCode: plz,
                city: city,
                country: country,
                userImage: "test123",
                restaurantName: restaurantName,
                homepage: homepage,
            };
        } else {
            user = {
                _id: UserService.currentUserValue.id,
                title: title,
                firstName: firstname,
                lastName: lastname,
                streetname: streetname,
                houseNumber: streetnr,
                zipCode: plz,
                city: city,
                country: country,
                userImage: "test123",
            };
        }
        props.onSubmit(user);
    }


    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Edit Info
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle className={classes.dialogTitle} id="form-dialog-title">Your Information</DialogTitle>
                <div>
                    <UserInfo
                        booking={false}
                        setTitleData={setTitleData}
                        setFNameData={setFNameData}
                        setLNameData={setLNameData}
                        setStreetData={setStreetData}
                        setStreetNrData={setStreetNrData}
                        setPLZData={setPLZData}
                        setCountryData={setCountryData}
                        setCityData={setCityData}
                        setRestaurantNameData={setRestaurantNameData}
                        setHomepageData={setHomepageData}
                        setSubmitDisabled={setSubmitDisabled}


                        title={title}
                        firstname={firstname}
                        lastname={lastname}
                        streetname={streetname}
                        streetnr={streetnr}
                        plz={plz}
                        city={city}
                        country={country}
                        restaurantName={restaurantName}
                        homepage={homepage}
                        submitDisabled={submitDisabled}
                    />
                </div>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant={"contained"}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={submitDisabled}
                            color="primary" variant={"contained"}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}


