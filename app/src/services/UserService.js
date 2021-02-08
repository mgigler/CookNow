"use strict";
import axios from "axios";
import HttpService from "./HttpService";
import jwt from 'jwt-decode';
import React from "react";
import {BehaviorSubject} from "rxjs";

const currentUserSubject = new BehaviorSubject(localStorage.getItem('jwtToken'));

(function () {
    const authToken = currentUserSubject.value;
    axios.defaults.headers.common['Authorization'] = authToken ? `JWT ${authToken}` : null;
}());


export const UserService = {
    registerCustomer,
    registerChef,
    setAuthToken,
    getUser,
    updateCustomer,
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    isAuthenticated,
    get currentUserValue() {
        const userValue = currentUserSubject.value;
        return userValue === null ? null : jwt(userValue);
    }
};

function isAuthenticated() {
    return currentUserSubject.value !== null;
}


async function registerCustomer(user) {
    return new Promise((resolve, reject) => {
        HttpService.post("customer/register", user, function (data) {
            resolve(data);
        }, function (textStatus) {
            reject(textStatus);
        });
    });
}

async function registerChef(user) {
    return new Promise((resolve, reject) => {
        HttpService.post("chef/register", user, function (data) {
            resolve(data);
        }, function (textStatus) {
            reject(textStatus);
        });
    });
}

async function getUser() {
    return new Promise(((resolve, reject) => {
        HttpService.get('customer', null, function (data) {
            if (data !== undefined || Object.keys(data).length !== 0) {
                resolve(data);
            } else {
                reject('Error while retrieving user');
            }
        }, function (textStatus) {
            reject(textStatus);
        });
    }));
}

async function updateCustomer(user) {
    return new Promise((resolve, reject) => {
        HttpService.putJson(`customer`, user, function (data) {
            resolve(data);
        }, function (textStatus) {
            reject(textStatus);
        });
    });
}

async function login(email, password) {
    return new Promise((resolve, reject) => {
        HttpService.postJson(`login`, {
            email: email,
            password: password
        }, function (data) {
            resolve(data);
        }, function (textStatus) {
            reject(textStatus);
        });
    });
}

function setAuthToken(token) {
    //localStorage.setItem('authToken', token);
    localStorage.setItem('jwtToken', token)
    currentUserSubject.next(token);
}

function logout() {
    //localStorage.removeItem('authToken');
    localStorage.removeItem('jwtToken');
    currentUserSubject.next(null);
}