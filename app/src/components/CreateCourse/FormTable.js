import React from 'react';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TrashIcon from "material-ui/svg-icons/action/delete";
import {makeStyles} from "@material-ui/core/styles";
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            padding: theme.spacing(5),
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
            marginBottom: theme.spacing(5),
        },
    },
    tableWrapper: {
        boxShadow: '0 4px 5px rgba(0, 0, 0, 0.6)',
        marginTop: 5
    },
    headerWrapper: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        width: '30%'
    },
    deleteColumn: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,

    },
    clickable: {
        cursor: "pointer",
    },
    disabled: {
        color: theme.palette.action.disabled + " !important",
    }
}))

const row = (x, i, header, handleRemove,) =>
    <TableRow key={`tr-${i}`}>
        {header.map((y, k) =>
            <TableCell key={`tc-${k}`}>
                {x[y.prop]}
            </TableCell>
        )}
        <TableCell>
            <TrashIcon onClick={() => handleRemove(i)}/>
        </TableCell>
    </TableRow>;

export default function FormTable({data, header, handleRemove, update, number_instances}) {

    const classes = useStyles();

    return (
        <Table className={classes.tableWrapper}>
            <TableHead>
                <TableRow className={classes.tableRow}>
                    {header.map((x, i) =>
                        <TableCell className={classes.headerWrapper} key={`tc-${i}`}>
                            {x.name}
                        </TableCell>
                    )}
                    <TableCell className={classes.deleteColumn}>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((x, i) =>
                    <TableRow key={`tr-${i}`}>
                        {header.map((y, k) =>
                            <TableCell key={`tc-${k}`}>
                                {x[y.prop]}
                            </TableCell>
                        )}
                        <TableCell>
                            {
                                //Forbid changing past instances

                                x.date && update && i < number_instances || moment().diff(moment(`${x.date} ${x.startTime}`, "DD.MM.YYYY HH:mm"), 'minutes') > 0 ?
                                    <TrashIcon className={classes.disabled}/> :
                                    <TrashIcon className={classes.clickable} onClick={() => handleRemove(i)}/>
                            }

                        </TableCell>
                    </TableRow>)}
            </TableBody>
        </Table>

    );
}
