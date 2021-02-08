"use strict";
import axios from "axios";

import HttpService from './HttpService';

export const CourseService = {
    getCourses,
    createCourse,
    updateCourse,
    getCourse,
    deleteCourse,
    getCategories,
    getCourseIngredients,
    addRating,
    removeRating,
    updateRating,
    getUserCourses,
    getChefCourses,
    getInstance,
    isUserCourse,
    isChefCourse,
    getCourseTitles
}


function getCourses(search, priceRange, categories, date) {
    let params = {};

    if (search.length > 0) params["search"] = search;

    if (priceRange.length > 1) {
        params["minPrice"] = priceRange[0];
        params["maxPrice"] = priceRange[1];
    }
    if (categories.length > 0) {
        params["categories"] = categories.toString();
    }
    if (date.length > 0) {
        params["date"] = date;
    }


    return new Promise(((resolve, reject) => {
        HttpService.get(`course/all`, params, function (data) {
            resolve(data);
        }, function (data) {
            reject(data);
        });
    }));
}


async function createCourse(course) {
    return new Promise((resolve, reject) => {
        HttpService.post("course/create", course, function (data) {
            resolve(data);
        }, function (textStatus) {
            reject(textStatus);
        });
    })
}

function updateCourse(course, id) {
    return new Promise((resolve, reject) => {
        HttpService.put("course/" + id, course, function (data) {
            resolve(data);
        }, function (textStatus) {
            reject(textStatus);
        });
    })
}

function getCourse(id) {
    return new Promise(((resolve, reject) => {
        HttpService.get('/course/' + id, null, function (data) {
            if (data !== undefined || Object.keys(data).length !== 0) {
                resolve(data);
            } else {
                reject('Unable to fetch course');
            }
        }, function (textStatus) {
            reject(textStatus);
        });
    }));
}

function getCourseTitles(search) {
    const params = {search: search}
    return new Promise(((resolve, reject) => {
        HttpService.get('course/titles', params, function (data) {
            resolve(data);
        }, function (data) {
            reject(data);
        });

    }))
}

function deleteCourse(id) {
    return new Promise(((resolve, reject) => {
        HttpService.delete('/course/' + id, function (data) {
            if (data !== undefined || Object.keys(data).length !== 0) {
                resolve(data);
            } else {
                reject('Unable to delete course');
            }
        }, function (textStatus) {
            reject(textStatus);
        });
    }));
}


function addRating(id, rating) {
    return new Promise((resolve, reject) => {
        HttpService.postJson(`course/${id}/rating`, rating, function (data) {
            resolve(data);
        }, function (textStatus) {
            reject(textStatus);
        });
    });
}

function removeRating(courseId, rating) {

    return new Promise(((resolve, reject) => {
        HttpService.putJson(`course/${courseId}/rating`, {ratingId: rating}, function (data) {
            if (data !== undefined || Object.keys(data).length !== 0) {
                resolve(data);
            } else {
                reject('Error while removing rating');
            }
        }, function (textStatus) {
            reject(textStatus);
        });
    }));
}


function updateRating(courseId, rating) {

    return new Promise(((resolve, reject) => {
        HttpService.putJson(`course/${courseId}/updateRating`, rating, function (data) {
            if (data !== undefined || Object.keys(data).length !== 0) {
                resolve(data);
            } else {
                reject('Error while updating ratings');
            }
        }, function (textStatus) {
            reject(textStatus);
        });
    }));
}


function getInstance(id) {
    return new Promise(((resolve, reject) => {
        HttpService.get('/course/instance/' + id, null, function (data) {
            if (data !== undefined || Object.keys(data).length !== 0) {
                resolve(data);
            } else {
                reject('Error while retrieving courseinstance');
            }
        }, function (textStatus) {
            reject(textStatus);
        });
    }));
}

function getCategories() {
    return new Promise(((resolve, reject) => {
        HttpService.get('/category/all', null, function (data) {
            resolve(data);
        }, function (textStatus) {
            reject(textStatus);
        });
    }));
}

function getCourseIngredients(id) {
    return new Promise(((resolve, reject) => {
        HttpService.get('/course/ingredients/' + id, null, function (data) {
            if (data !== undefined || Object.keys(data).length !== 0) {
                resolve(data);
            } else {
                reject('Unable to get Course Ingredients');
            }
        }, function (textStatus) {
            reject(textStatus);
        });
    }));
}

function getUserCourses() {
    return new Promise(((resolve, reject) => {
        HttpService.get('/course/user', null, function (data) {
            if (data !== undefined || Object.keys(data).length !== 0) {
                resolve(data);
            } else {
                reject('Error while retrieving user courses');
            }
        }, function (textStatus) {
            reject(textStatus);
        });
    }));
}

function getChefCourses() {
    return new Promise(((resolve, reject) => {
        HttpService.get('/course/chef', null, function (data) {
            if (data !== undefined || Object.keys(data).length !== 0) {
                resolve(data);
            } else {
                reject('Error while retrieving chef courses');
            }
        }, function (textStatus) {
            reject(textStatus);
        });
    }));
}

function isUserCourse(instanceId) {
    return new Promise(((resolve, reject) => {
        HttpService.get('/course/isUserCourse/' + instanceId, null, function (data) {
            if (data !== undefined || Object.keys(data).length !== 0) {
                resolve(data);
            } else {
                reject('Error while retrieving is user course');
            }
        }, function (textStatus) {
            reject(textStatus);
        });
    }));
}

function isChefCourse(courseId) {
    return new Promise(((resolve, reject) => {
        HttpService.get('/course/isChefCourse/' + courseId, null, function (data) {
            if (data !== undefined || Object.keys(data).length !== 0) {
                resolve(data);
            } else {
                reject('Error while retrieving is user course');
            }
        }, function (textStatus) {
            reject(textStatus);
        });
    }));
}