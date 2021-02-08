import React, {useEffect, useState} from 'react';

import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Ingredient from "./Ingredient";
import DeliveryIngredient from "./DeliveryIngredient";
import {UserService} from "../../services/UserService";
import {CourseService} from "../../services/CourseService";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    dialogTitle: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    dialog: {
        width: "80%"
    },
    margin: {
        marginTop: "8px"
    },
    marginBot: {
        marginBottom: "8px"
    }
}))
const MenuProps = {
    PaperProps: {
        style: {
            width: "80%",
            maxHeight: "80%",
            left: "12%"
        },
    },
};
export default function IngredientCalculator(data) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [courseIngredients, setCourseIngredients] = useState([])
    let instanceId = data.instanceId

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(
        () => {
            const fetchData = () => {
                if (UserService.isAuthenticated() && UserService.currentUserValue.isChef) {
                    CourseService.getCourseIngredients(instanceId).then(res => {
                        setCourseIngredients(res.data)

                    }).catch(err => {
                        console.log(err);
                    });
                }
            }
            fetchData()
        },
        []
    )

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Ingredient Calculator
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.dialog}
                    PaperProps={MenuProps.PaperProps}>
                <DialogTitle className={classes.dialogTitle} id="form-dialog-title">Ingredient Calculator</DialogTitle>
                <DialogContent>
                    <div>
                        {courseIngredients.length > 1 ?
                            <div>
                                <Typography component="h5" variant="h5" className={`${classes.margin}`}>You will need to
                                    buy</Typography>
                                <Ingredient ingredients={courseIngredients[courseIngredients.length - 1]}/>
                                <Divider className={`${classes.margin} ${classes.marginBot}`}/>
                                <Typography component="h5" variant="h5">You will need to deliver</Typography>
                                <DeliveryIngredient userIngredients={courseIngredients}/>

                            </div>
                            : <Typography component="h5" variant="h5">So far there have been no Orders for this
                                course</Typography>
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant={"contained"}>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}