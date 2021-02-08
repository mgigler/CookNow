"use strict";
import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { PayPalButton } from "react-paypal-button-v2";
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {UserService} from "../../services/UserService";
import moment from "moment";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({

    gridBox: {
        display: 'grid',
    },

    row: {
        gridColumnEnd: 'span 3',
    },

    card: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '2vw',
        alignItems: 'center',
        textAlign: 'center',
        //color: '#4F4F4F',
        borderBottom: `2px solid ${theme.palette.grey[400]}`,
        paddingTop: '1em',
        paddingBottom: '1em',
        [theme.breakpoints.down('xl')]: {
            fontSize: '1.2vw',
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: '1.5vw',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '2.5vw',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '4vw',
        },
    },

    cardPrice: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '3.5vw',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: '0.4em',
        //color: '#4F4F4F',
        [theme.breakpoints.down('xl')]: {
            fontSize: '1.8vw',
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: '2.5vw',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '3.5vw',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '5vw',
        },
    },

    cardPortion: {
        boxShadow: 'none',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        marginTop: '0.5em',
        border: `1px solid ${theme.palette.grey[400]}`,

    },

    cardPortionButton: {
        minWidth: '50px',
        backgroundColor: theme.palette.background.paper,
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            border: 'none',
        },
        "&.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        }
    },


    cardButton: {
      paddingTop: '1em',
      paddingBottom: '1em',
        margin: '0 2em',
    },

    buttonPay: {
        display: 'flex',
        cursor: 'pointer',
        borderRadius: '50px',
        outline: 'none',
        textAlign: 'center',
        width: '100%',

        "&> span": {
            display: 'inline-block',
            position: 'relative',
            transition: '0.7s',
        },

        "&> span > span": {
            position: 'absolute',
            opacity: '0',
            top: '-1px',
            right: '-30px',
            transition: '0.7s',
            fontSize: '15px',
        },

        "&:hover > span": {
            paddingRight: '30px',
        },

        "&:hover > span > span": {
            opacity: '1',
            right: '0',
        },
    },

}));

export default function CourseInfo(props) {

    const classes = useStyles()
    const [portions, setPortionsData] = useState('1');
    const [price, setPriceData] = useState(props.coursePrice);
    const [open, setOpen] = useState(false);
    const [paid, setPaymentPaid] = useState(false);
    const [payment, setPaymentData] = useState('');


    const handleValue = (event, portions) => {
        if (portions != null){
            setPortionsData(portions);
        }
    };

    const paymentHandler = (details, data) => {
        setPaymentData(details);
    };

    useEffect(()=>{
        if(payment!==""){
            setPaymentPaid(true)
        }
    },[payment])

    useEffect(()=>{
        if (paid){
            let order = {
                email: props.email,
                title: props.title,
                firstName: props.firstname,
                lastName: props.lastname,
                street: props.streetname,
                houseNumber: props.streetnr,
                postalCode: props.plz,
                city: props.city,
                userId: UserService.currentUserValue.id,
                portions: portions,
                deliveryTime: props.selectedDate,
                paid: paid,
                paymentId: payment.purchase_units[0].payments.captures[0].id,
                courseInstancesId: props.instanceId,
                courseId: props.courseId
            };
            props.paymentHandler(order);
        }

    }, [paid])

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div className={classes.gridBox}>
            {props.portions2}
            <div className={`${classes.row} ${classes.card}`}>
                <Typography component="h5" variant="h5">
                    Course Title:
                </Typography>
                <Typography variant="h6">
                    {props.courseTitle}
                </Typography>
            </div>
            <div className={`${classes.row} ${classes.card}`}>
                <Typography component="h5" variant="h5">
                    Date: {moment(props.courseDateStart).format("DD.MM.YYYY")}
                </Typography>
                <Typography variant="h6">
                    {moment(props.courseDateStart).format("HH:mm")} -
                    {moment(props.courseDateEnd).format("HH:mm")}
                </Typography>
            </div>
            <div className={`${classes.row} ${classes.card}`}>
                <Typography component="h5" variant="h5">
                    Price per portion:
                </Typography>
                <Typography variant="h6">
                    {price}€
                </Typography>
                <ToggleButtonGroup className={`${classes.cardPortion} `}
                                   aria-label='portions'
                                   name='portions'
                                   value={portions}
                                   exclusive
                                   onChange={handleValue}
                >
                    <ToggleButton className={`${classes.cardPortionButton} `} value='1' >
                        1
                    </ToggleButton>
                    <ToggleButton className={`${classes.cardPortionButton} `} value='2' >
                        2
                    </ToggleButton>
                    <ToggleButton className={`${classes.cardPortionButton} `} value='3' >
                        3
                    </ToggleButton>
                    <ToggleButton className={`${classes.cardPortionButton}  `} value='4' >
                        4
                    </ToggleButton>
                </ToggleButtonGroup>

            </div>

            <div className={`${classes.row} ${classes.cardPrice}`}>
                <Typography component="h4" variant="h4">
                    Total:
                </Typography>
                <Typography variant="h4">
                    {(portions*price).toFixed(2)}€
                </Typography>
            </div>
            <div className={`${classes.row} ${classes.cardButton}`}>
                <Button id='submitId'
                        disabled={props.paymentDisabled}
                        onClick={handleClickOpen}
                    className={`${classes.buttonPay} `} size={"large"}
                    variant="contained" color="primary"> <div> Pay Now</div> <span> >></span>
                </Button>

            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle className={classes.dialogTitle} id="form-dialog-title">Choose your payment method</DialogTitle>
                <DialogContent>
                    <PayPalButton
                        amount={(portions*price).toFixed(2)}
                        onSuccess={paymentHandler}
                        options={{
                            clientId: "AZ2pamR5CkSZTTTzWzdN0xrY15gOCTrmTxPmvKD-nsxzO39y6UrX_5oolQ45DSXz85VMfyk_y5z_coea",
                            currency: "EUR"
                        }}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}
