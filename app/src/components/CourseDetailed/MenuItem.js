"use strict";
import React from 'react';
import Typography from "@material-ui/core/Typography";


export default function MenuItem({items}) {

    return (
        <div>
            {items.map((item, index) => (
                <div key={index}>
                    <Typography component="h6" variant="h6">{item.course}</Typography>
                    <p>{item.dish}</p>
                </div>
            ))}
        </div>
    )
}


