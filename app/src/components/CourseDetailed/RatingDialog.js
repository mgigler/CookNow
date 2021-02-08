import React, {useEffect} from 'react';

import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import {makeStyles} from "@material-ui/core/styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const useStyles = makeStyles((theme) => ({
    dialogTitle: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    icon: {
        cursor: "pointer",
    },
    marginRight: {
        marginRight: "8px"
    }
}))

export default function RatingDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [rating, setRating] = React.useState(props.hasOwnProperty("rating") ? props.rating : 5);
    const [title, setTitle] = React.useState(props.hasOwnProperty("title") ? props.title : '');
    const [description, setDescription] = React.useState(props.hasOwnProperty("description") ? props.description : '');

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        try {
            event.preventDefault();
            setOpen(false);
            const err = false //this.validate();
            if (!err) {
                props.onSubmit({rating: rating, title: title, description: description})

                if (!props.update) {
                    // clear form
                    setRating(5);
                    setTitle('');
                    setDescription('');
                }

            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <React.Fragment>
            {!(props.hasOwnProperty("update")) ? <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Rate Course
            </Button> : <FontAwesomeIcon icon={['fa', 'pen']} onClick={handleClickOpen}
                                         fixedWidth className={`${classes.icon} ${classes.marginRight}`}/>}

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle className={classes.dialogTitle} id="form-dialog-title">Rating</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Let us know what you thought about your course.
                    </DialogContentText>
                    <Rating
                        name="hover-feedback"
                        value={Number(rating)}
                        precision={1}
                        onChange={handleRatingChange}
                    />
                    <TextField
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        onChange={handleTitleChange}
                        error={title !== '' && title.length < 3}
                        helperText={title !== '' && title.length < 3 ? "Title too short" : null}
                        value={title}
                        required
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        error={description !== '' && description.length < 3}
                        helperText={description !== '' && description.length < 3 ? "Description too short" : null}
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant={"contained"}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" variant={"contained"}
                            disabled={title.length < 3 || description.length < 3}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}