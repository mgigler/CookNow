"use strict";

import React, {useEffect} from "react";

import {makeStyles} from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Slider from "@material-ui/core/Slider";
import moment from 'moment';
import {CourseService} from "../../services/CourseService";


const useStyles = makeStyles((theme) => ({
    categoryFormControl: {
        margin: theme.spacing(2),
        minWidth: 120,
        maxWidth: 300,
    },
    priceRange: {
        maxWidth: "600px",
        margin: theme.spacing(2),
        marginTop: "40px",
        width: "100%",
    },
    datePicker: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    flex: {
        display: "flex",
    },
    priceSliderDescription: {
        position: "relative",
        top: "50%",
        transform: "translateY(50%)",
    }

}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
    anchorOrigin: {
        vertical: "top",
        horizontal: "left"
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "left"
    },
    getContentAnchorEl: null
};

function valuetext(value, i) {
    return `${value}°C`;
}


export default function FilterBar(props) {
    const classes = useStyles();
    const today = new Date();
    const [selectedCategories, setSelectedCategories] = React.useState([]);
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [prices, setPrices] = React.useState([0, 250]);
    const [categories, setCategories] = React.useState([]);
    useEffect(
        () => {
            const fetchData = () => {
                CourseService.getCategories().then(res => {
                    const cat = res.data.map((v) => v.name)
                    setCategories(cat);
                });
            }
            fetchData()
        },
        []
    );

    const handleSliderChange = (event, newValue) => {
        setPrices(newValue);
    };

    const handleSliderCommitChange = (event, newValue) => {
        props.onPriceChange(newValue);
    };

    const handleDateChange = (date) => {
        const parsed_date = moment(date).format("YYYY-MM-DD");
        props.onDateChange(parsed_date);
        setSelectedDate(date);
    };
    const handleChange = (event) => {
        props.onCategoryChange(event.target.value);
        setSelectedCategories(event.target.value);
    };


    return (
        <div className={classes.flex}>
            <FormControl className={classes.categoryFormControl}>
                <InputLabel id="demo-mutiple-checkbox-label">Category</InputLabel>
                <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={selectedCategories}
                    onChange={handleChange}
                    input={<Input/>}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >


                    {categories.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={selectedCategories.indexOf(name) > -1}/>
                            <ListItemText primary={name}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <div className={classes.datePicker}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd.MM.yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={selectedDate}
                        onChange={handleDateChange}
                        minDate={today}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider></div>
            <div className={classes.priceSliderDescription}>Price:</div>

            <div className={classes.priceRange}>
                <Slider
                    min={0}
                    max={250}
                    step={10}
                    marks={props.marks}
                    value={prices}
                    onChange={handleSliderChange}
                    onChangeCommitted={handleSliderCommitChange}
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    valueLabelDisplay="on"
                />
            </div>
        </div>
    );

}