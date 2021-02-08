import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from "@material-ui/core/styles";

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
    const [course, setCourse] = React.useState('');
    const [dish, setDish] = React.useState('');
    const [courseError, setCourseError] = React.useState('');
    const [dishError, setDishError] = React.useState('');
    const regex = new RegExp('^(?!\\s)+[a-zA-Z0-9 äöüÄÖÜßéÉèÈêÊ]+$');
    const regexNoNumbers = new RegExp('^(?!\\s)+[a-zA-Z äöüÄÖÜßéÉèÈêÊ]+$');

    const allowSubmit = () => {
        return courseError.length < 1 && dishError.length < 1 && course && dish ;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setCourse('')
        setDish('')
        setDishError('')
        setCourseError('')
        setOpen(false);
    };
    const handleCourseChange = (event) => {
        setCourse(event.target.value);
        if (event.target.value.length < 1) {
            setCourseError("Course is required.");
        }
        else if (!regex.test(event.target.value)) {
            setCourseError("Please do not enter special characters or start with a whitespace.");
        }
        else if (event.target.value.length > 255) {
            setCourseError("Course is too long.");
        }
        else {
            setCourseError('');
        }
    };
    const handleDishChange = (event) => {
        setDish(event.target.value);

        if (event.target.value.length < 1) {
            setDishError("Dish is required");
        }
        else if (!regexNoNumbers.test(event.target.value)) {
            setDishError("Please do not enter special characters, numbers or start with a whitespace.");
        }
        else if (event.target.value.length > 255) {
            setDishError("Dish is too long");
        }
        else {
            setDishError('');
        }
    };

    const handleSubmit = (event) => {
        try{
            event.preventDefault();
            setOpen(false);
            const err = false //this.validate();
            if (!err) {
                props.onSubmit({course: course, dish: dish})

                // clear form
                setCourse('');
                setDish('');
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className={classes.titleWrapper}>
                <div>Menu&#42;</div>
                <Button color={"primary"} variant={"outlined"} onClick={handleClickOpen}>Add Dish</Button>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle className={classes.dialogTitle}>Menu</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please add the course and the dish name to the Menu.<br/><i>For example: Starter Bruschetta.</i>
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="course"
                        label="Course"
                        type="text"
                        error={courseError.length > 0}
                        helperText={courseError}
                        onChange={handleCourseChange}
                        required
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="dish"
                        label="Dish"
                        type="text"
                        error={dishError.length > 0}
                        helperText={dishError}
                        onChange={handleDishChange}
                        required
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant={"contained"}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" variant={"contained"}  disabled={!allowSubmit()}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}