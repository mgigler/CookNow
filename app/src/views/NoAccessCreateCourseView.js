"use strict";

import React from 'react';
import Home from "../components/Home";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";


export default function NoAccessCreateCourseView() {

    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
            <Home/>
            <div>

                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Access denied
                    </DialogTitle>
                    <DialogContent dividers>
                        Sorry, you don't have access to this page!
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </React.Fragment>
    );

}