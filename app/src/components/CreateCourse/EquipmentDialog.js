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
    const [description, setDescription] = React.useState('');
    const [descriptionError, setDescriptionError] = React.useState('');

    const allowSubmit = () => {
        return descriptionError.length < 1 && description ;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setDescription('')
        setDescriptionError('')
        setOpen(false);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
        const regex = new RegExp('^(?!\\s)+[a-zA-Z0-9 äöüÄÖÜßéÉèÈêÊ]+$');
        if (event.target.value.length < 1) {
            setDescriptionError("Description is required.");
        }
        else if (!regex.test(event.target.value)) {
            setDescriptionError("Please do not enter special characters or start with a whitespace.");
        }
        else if (event.target.value.length > 1000) {
            setDescriptionError("Description is too long.");
        }
        else {
            setDescriptionError('');
        }
    };

    const handleSubmit = (event) => {
        try{
            event.preventDefault();
            setOpen(false);
            const err = false //this.validate();
            if (!err) {
                props.onSubmit({description: description})
                // clear form
                setDescription('');
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className={classes.titleWrapper}>
                <div>Required Equipment&#42;</div>
                <Button color={"primary"} variant={"outlined"} onClick={handleClickOpen}>Add Equipment</Button>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle className={classes.dialogTitle}>Menu</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please add the required Equipment to the course Info. <br/> <i>For example: Two frying pans. </i>
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        error={descriptionError.length > 0}
                        helperText={descriptionError}
                        onChange={handleDescriptionChange}
                        required
                        fullWidth
                    />
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