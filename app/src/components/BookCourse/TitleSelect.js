import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {UserService} from "../../services/UserService";


export default function TitleSelect() {

    const [title, setTitleData] = React.useState(Object.is(UserService.currentUser.title,null) ?
        UserService.currentUserValue.title : ""
    );

    const handleTitleChange = (event) => {
        setTitleData(event.target.value);
    };

    return (
        <div>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Title</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={title}
                    onChange={handleTitleChange}
                >
                    <MenuItem value={'Mr'}>Mr</MenuItem>
                    <MenuItem value={'Mrs'}>Mrs</MenuItem>
                    <MenuItem value={'Ms'}>Ms</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}