"use strict";

import React from "react";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {fade, makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {CourseService} from "../../services/CourseService";

const useStyles = makeStyles((theme) => ({

    searchDiv: {
        maxWidth: '800px',
        minWidth: '300px',
        margin: '30px auto',
        marginTop: '10px'
    },
    search: {
        position: 'relative',
        borderRadius: '40px', /* theme.shape.borderRadius,*/
        border: '1px solid rgba(132, 124, 124, 0.7)',
        backgroundColor: fade(theme.palette.common.white, 0.75),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 1),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        transition: 'all 0.3s ease 0s',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        fontSize: '30px',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchIconSVG: {
        fontSize: '2rem',
    },
    inputRoot: {
        color: 'inherit',
        fontSize: 25,
        width: '100%',

        margin: theme.spacing(0, 0, 0, 0),
        padding: theme.spacing(1, 1, 1, 1),
        transition: theme.transitions.create('width'),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,

    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        fontSize: 25,

        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },

}));



export default function SearchBar(props) {
    const classes = useStyles();
    const [autocomplete, setAutocomplete] = React.useState([]);

    const handleSearchChange = (e) => {
        if (e.key === 'Enter') {
            props.onSearchChange(e.target.value);
        }
    }

    const handleAutocomplete = (e, v) => {
        if (e.type === "click") {
            props.onSearchChange(v);
        } else if (e.type === 'change' && v === "") {
            props.onSearchChange("");
            setAutocomplete([]);
        } else {
            CourseService.getCourseTitles(v).then(e => setAutocomplete(e.data))
        }
    };

    return (
        <div className={classes.searchDiv}>

            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon className={classes.searchIconSVG}/>
                </div>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={autocomplete}
                    onInputChange={handleAutocomplete}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            margin="normal"
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                            }}
                            InputProps={{...params.InputProps, type: 'search', disableUnderline: true}}
                            onKeyPress={(e) => handleSearchChange(e)}
                        />
                    )}
                />
            </div>
        </div>
    );
}

