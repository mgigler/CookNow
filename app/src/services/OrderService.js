"use strict";
import axios from "axios";
import React from "react";
import HttpService from "./HttpService";

export const OrderService = {
    order,
};

function order(order) {
    return new Promise((resolve, reject) => {
        HttpService.postJson(`customer/order`, order, function (data) {
            resolve(data);
        }, function (textStatus) {
            reject(textStatus);
        });
    });
}