"use strict";
import React from 'react';


export default function RequiredItem({items}) {

    return (
        <div>
            {items.map((item, index) => (
                <div key={index}>
                   {item.description}
                </div>
            ))}
        </div>
    )
}




