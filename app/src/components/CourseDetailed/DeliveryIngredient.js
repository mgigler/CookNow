"use strict";
import React from 'react';
import {makeStyles} from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles((theme) => ({


    margin: {
        marginTop: "12px"
    }

}))

export default function DeliveryIngredient({userIngredients}) {
    const classes = useStyles()


    return (
        <div>
            {userIngredients.map((userIngredient, index) => (
                <div key={index}>
                    {index < userIngredients.length - 1 ?
                        <div>
                            <div className={classes.margin}>
                                <div>{userIngredient.user.firstName} {userIngredient.user.lastName}</div>
                                <div>{userIngredient.user.streetname} {userIngredient.user.houseNumber}</div>
                                <div>{userIngredient.user.zipCode} {userIngredient.user.city}</div>
                                <div>Preferred Delivery
                                    Time: {moment(userIngredient.user.deliveryTime).format("HH:mm")}</div>
                            </div>
                            <ul>
                                {userIngredient.ingredients.map((ingredient, i) => (

                                    <li key={i}>{ingredient.amount} {ingredient.unit} {ingredient.ingredient}</li>

                                ))}
                            </ul>
                        </div>
                        : null}
                </div>
            ))}
        </div>
    )


}

