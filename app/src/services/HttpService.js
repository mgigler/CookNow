"use strict";
import {UserService} from "./UserService";
import {CourseService} from "./CourseService";

const axios = require('axios');
require("babel-polyfill");


export default class HttpService {
    constructor() {
    }

    static baseURL() {
        return 'http://localhost:9000/'
    }


    static async get(url, params, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let headers = {};
        if (token) {
            headers['Authorization'] = `JWT ${token}`;
        }
        let request;
        if (params !== null) {
            request = {
                method: 'GET',
                url: url,
                baseURL: this.baseURL(),
                headers: headers,
                params: params
            };
        } else {
            request = {
                method: 'GET',
                url: url,
                baseURL: this.baseURL(),
                headers: headers
            };
        }
        await axios(request).then(e => {
            onSuccess(e);
        }).catch(err => {
            onError(err.response);
        });
    }

    static async post(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        await axios.post(`${this.baseURL()}${url}`, data, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data;`,
                'Authorization': `JWT ${token}`
            }
        }).then(e => {
            onSuccess(e);
        }).catch(err => {
            onError(err.response);
        });
    }

    static async postJson(url, data, onSuccess, onError) {

        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');

        await axios.post(`${this.baseURL()}${url}`, data, {headers: header}
        ).then((resp) => {
            if (resp.data.hasOwnProperty('token')) {
                UserService.setAuthToken(resp.data.token);
            }
            onSuccess(resp);

        }).catch((e) => {
            onError(e.response);
        });

    }


    static async put(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('accept', 'application/json');
        header.append('Content-Type', 'multipart/form-data');

        await axios.put(`${this.baseURL()}${url}`, data, {
            headers: header
        }).then(e => {
            if (e.data.hasOwnProperty('token')) {
                UserService.setAuthToken(e.data.token);
            }
            onSuccess(e)
        }).catch(err => {
            onError(err.response)
        });
    }

    static async putJson(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');

        await axios.put(`${this.baseURL()}${url}`, data, {
            headers: header,
        }).then(e => {
            if (e.data.hasOwnProperty('token')) {
                UserService.setAuthToken(e.data.token);
            }
            onSuccess(e);
        }).catch(err => {
            onError(err.response)
        });


    }

    static async delete(url, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let headers = {};
        if (token) {
            headers['Authorization'] = `JWT ${token}`;
        }
        await axios({
            method: 'DELETE',
            url: url,
            baseURL: this.baseURL(),
            headers: headers
        }).then(e => onSuccess(e)).catch(err => {
            onError(err.response)
        });
    }


    static checkIfUnauthorized(res) {
        return res.status === 401;
    }


}