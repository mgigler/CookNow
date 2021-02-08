import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {elementAt} from "rxjs/operators";

const useStyles = makeStyles((theme) => ({
    titleWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    dialogTitle: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    }
}))

export default function IngredientsDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState(null);
    const [startTime, setStartTime] = React.useState(null);
    const [endTime, setEndTime] = React.useState(null);
    const [endTimeHelper, setEndTimeHelper] = React.useState('');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDateChange = (d) => {
        const date = moment(d).format("YYYY-MM-DD");
        setDate(date);
    };
    const handleStartTimeChange = (t) => {
        const time = moment(t).format("HH:mm");
        setStartTime(time);

    };
    const handleEndTimeChange = (t) => {
        const time = moment(t).format("HH:mm");
        if (moment(time, "HH:mm").diff(moment(startTime, "HH:mm"), 'minutes') < 60) {
            setEndTimeHelper("Minimum course time: 1 hour");
        } else {
            setEndTime(time);
            setEndTimeHelper('');
        }
    };
    const handleSubmit = (event) => {
        try {
            event.preventDefault();
            setOpen(false);
            const err = false //this.validate();
            if (!err) {
                props.onSubmit({
                    date: moment(date, "YYYY-MM-DD").format("DD.MM.YYYY"),
                    startTime: startTime,
                    endTime: endTime
                })
                // clear form
                setDate(null);
                setStartTime(null);
                setEndTime(null);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const formatTime = (t) => {
        const time = moment("1970-01-01 " + t, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm:ss");
        if (t === null || time === "Invalid date") {
            return null;
        } else {

            return time;
        }
    }
    const allowSubmit = () => {
        return date && date != 'Invalid date' && startTime && startTime != 'Invalid date' && endTime && endTime != 'Invalid date' && endTimeHelper.length < 1;
    }

    return (
        <div>
            <div className={classes.titleWrapper}>
                <div>Course dates&#42;</div>
                <Button color={"primary"} variant={"outlined"} onClick={handleClickOpen}>Add date</Button>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle className={classes.dialogTitle}>Add new course date</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter a new date, start time and end time when a course will take place.
                    </DialogContentText>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Course date"
                                format="dd.MM.yyyy"
                                value={date}
                                minDate={tomorrow}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardTimePicker
                                margin="normal"
                                id="start-time-picker"
                                label="Start time"
                                value={formatTime(startTime)}
                                ampm={false}
                                onChange={handleStartTimeChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                            <KeyboardTimePicker
                                margin="normal"
                                id="end-time-picker"
                                label="End time"
                                value={formatTime(endTime)}
                                ampm={false}
                                disabled={startTime === null || startTime == 'Invalid date'}
                                error={endTimeHelper.length > 0}
                                helperText={endTimeHelper}
                                onChange={handleEndTimeChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant={"contained"}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" variant={"contained"} disabled={!allowSubmit()}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}