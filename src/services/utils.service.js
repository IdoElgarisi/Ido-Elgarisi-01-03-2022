'use strict';

export const utils = {
    saveToStorage,
    loadFromStorage,
    getRandomInt,
    getRandomId,
    makeId
};
function makeId(length = 6) {
    let txt = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null);
}
function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return (data) ? Promise.resolve(JSON.parse(data)) : (key === "favorites") ? Promise.resolve([]) : Promise.reject();
}

function getRandomId() {
    var pt1 = Date.now().toString(16);
    var pt2 = getRandomInt(1000, 9999).toString(16);
    var pt3 = getRandomInt(1000, 9999).toString(16);
    return `${pt3}-${pt1}-${pt2}`.toUpperCase();
}

function getRandomInt(num1, num2) {
    var max = (num1 >= num2) ? num1 + 1 : num2 + 1;
    var min = (num1 <= num2) ? num1 : num2;
    return (Math.floor(Math.random() * (max - min)) + min);
}