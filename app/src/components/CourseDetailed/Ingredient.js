"use strict";
import React from 'react';

export default function Ingredient({ingredients}) {

    return (

                <div>
                    {ingredients.map((ingredient, index) => (
                        <div key={index}>
                        <span >{ingredient.amount}</span>
                            <span >{ingredient.unit} </span>
                            <span >{ingredient.ingredient}</span>
                        </div>
                    ))}
                </div>
    )
}


