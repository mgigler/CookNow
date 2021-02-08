import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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
    const [amount, setAmount] = React.useState(0);
    const [unit, setUnit] = React.useState('');
    const [ingredient, setIngredient] = React.useState('');
    //@TODO INPUT Validation
    const [amountError, setAmountError] = React.useState('');
    const [unitError, setUnitError] = React.useState('');
    const [ingredientError, setIngredientError] = React.useState('');

    const allowSubmit = () => {
        return amountError.length < 1 && unitError.length < 1 && ingredientError.length < 1 && amount && unit && ingredient;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setAmount(0)
        setUnit('')
        setIngredient('')
        setAmountError('')
        setUnitError('')
        setIngredientError('')
        setOpen(false);
    };
    const handleAmountChange = (event) => {
        setAmount(event.target.value);
        if (event.target.value < 1) {
            setAmountError('Please enter a number')
        } else if (event.target.value > 9999) {
            setAmountError('Number is too large')
        } else {
            setAmountError('')
        }
    };
    const handleUnitChange = (event) => {
        setUnit(event.target.value);
        if (event.target.value.length < 1) {
            setUnitError("Unit is required.");
        } else if (event.target.value.length > 10) {
            setUnitError("Unit is too long.");
        } else {
            setUnitError('');
        }
    };
    const handleIngredientChange = (event) => {
        setIngredient(event.target.value);
        const regex = new RegExp('^(?!\\s)+[a-zA-Z0-9 äöüÄÖÜßéÉèÈêÊ]+$');
        if (event.target.value.length < 1) {
            setIngredientError("Ingredient is required.");
        } else if (!regex.test(event.target.value)) {
            setIngredientError("Please do not enter special characters or start with a whitespace.");
        } else if (event.target.value.length > 1000) {
            setIngredientError("Ingredient is too long.");
        } else {
            setIngredientError('');
        }
    };
    const handleSubmit = (event) => {
        try {
            event.preventDefault();
            setOpen(false);
            const err = false //this.validate();
            if (!err) {
                props.onSubmit({amount: amount, unit: unit, ingredient: ingredient})
                // clear form
                setAmount('');
                setUnit('');
                setIngredient('');

            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className={classes.titleWrapper}>
                <div>Provided Ingredients&#42;</div>
                <Button color={"primary"} variant={"outlined"} onClick={handleClickOpen}>Add Ingredient</Button>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle className={classes.dialogTitle}>Ingredients</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please add the provided amount, unit and ingredient that will be sent to your participants.<br/><i>For
                        example: 100g Salmon.</i>
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="amount"
                        label="Amount"
                        type="number"
                        helperText={amountError}
                        error={amountError !== ''}
                        onChange={handleAmountChange}
                        required
                        fullWidth
                    />
                    <FormControl
                        fullWidth
                        required>
                        <InputLabel>Unit</InputLabel>
                        <Select
                            value={unit}
                            error={unitError.length > 0}
                            onChange={handleUnitChange}
                            inputProps={{
                                name: 'unit',
                                id: 'unit',
                            }}
                        >
                            <MenuItem value="g">g</MenuItem>
                            <MenuItem value="kg">kg</MenuItem>
                            <MenuItem value="ml">ml</MenuItem>
                            <MenuItem value="l">l</MenuItem>
                            <MenuItem value=" tl">tsp</MenuItem>
                            <MenuItem value=" el">tbsp</MenuItem>
                            <MenuItem value=" piece(s)">piece(s)</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        id="ingredient"
                        label="Ingredient"
                        type="text"
                        error={ingredientError.length > 0}
                        helperText={ingredientError}
                        onChange={handleIngredientChange}
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