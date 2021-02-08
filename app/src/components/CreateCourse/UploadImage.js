"use strict";

import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {PhotoCamera} from "@material-ui/icons";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

let cropper = new Cropper();

const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none',
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    cropper: {
        overflow: "hidden"
    },
    image: {
        maxWidth: "650px",
        display: "block",
    },
    imageButtons: {
        marginTop: "15px",
    },
    imageDeleteButton: {
        marginRight: "10px"
    },
    uploadPicture: {
        marginTop:' 27px',
    },
    cameraIcon: {
        paddingLeft: '0px',
        paddingTop: '12px',
        paddingRight: '12px',
        paddingBottom: '12px',


    }

}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateUploadImage(props) {
    const classes = useStyles()
    const [courseImage, setCourseImage] = useState('');
    const [courseImageUrl, setCourseImageURL] = useState('');
    const [open, setOpen] = React.useState(false);


    useEffect(
        () => {
            const fetchData = () => {
                if (props.imageUrl) {
                    setCourseImageURL(props.imageUrl);
                }
            }
            fetchData()
        },
        [props.imageUrl]
    );


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUserImageChange = (event) => {
        setCourseImage(event.target.files[0]);
        setCourseImageURL(URL.createObjectURL(event.target.files[0]));
        handleClickOpen();

    };

    const handleImageDeletions = () => {
        setCourseImageURL('');
        setCourseImage('');
        handleClose();
        props.onSubmit('');
    }

    const handleSaveImage = async () => {
        const imageURI = cropper.getCroppedCanvas().toDataURL('image/png');
        let file = await fetch(imageURI).then(res => res.blob()).then(blobFile => new File([blobFile], "croppedImage", {type: "image/png"}));
        setCourseImage(file);
        setCourseImageURL(URL.createObjectURL(file));
        props.onSubmit(courseImage)
        handleClose();
    }

    return (

        <div className={classes.uploadPicture}>
            {courseImageUrl === '' ?
                <React.Fragment>
                    <input accept="image/*" className={classes.input} id="icon-button-file" type="file"
                           onChange={handleUserImageChange}/>
                    <label htmlFor="icon-button-file">
                        <IconButton className={classes.cameraIcon} color="primary" aria-label="upload picture"
                                    component="span">
                            <PhotoCamera/>
                        </IconButton>
                        <a>Upload Picture</a>
                    </label>
                </React.Fragment>
                :
                <React.Fragment>
                    <img src={courseImageUrl} className={classes.image}/>
                    <div className={classes.imageButtons}>
                        <Button color="secondary" variant={"contained"} className={classes.imageDeleteButton}
                                onClick={handleImageDeletions}>
                            Delete image
                        </Button>
                        <Button color="secondary" variant={"contained"}
                                onClick={handleClickOpen}>
                            Edit image
                        </Button>
                    </div>
                </React.Fragment>
            }

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleImageDeletions} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Edit course picture
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleSaveImage}>
                            SAVE
                        </Button>
                    </Toolbar>
                </AppBar>
                <Cropper className={classes.cropper}
                         ref={crop => {
                             cropper = crop;
                         }}
                         src={courseImageUrl}
                         style={{height: '100%', width: '100%'}}
                         aspectRatio={1}
                         guides={false}
                         autoCropArea={1}
                         zoomable={false}
                         viewMode={1}
                         minCropBoxWidth={450}
                />
            </Dialog>

        </div>

    );

}