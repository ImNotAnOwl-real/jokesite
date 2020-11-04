// controller.js
const mongoose = require('mongoose');
const config = require('../config');
const joke = require('../models/jokes');
const fetch = require('node-fetch');

const getServiceURL = 'https://krdo-joke-registry.herokuapp.com/api/services';


mongoose.connect(config.databaseURI, {useNewUrlParser: true, useUnifiedTopology: true});

async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}



exports.createJoke = async function (setup, punchline) {
    return joke.create({
        setup,
        punchline
    })
};


exports.Sites = async function () {
        return await get(getServiceURL);
}

exports.getJokesFraSites = async function (address) {
        return await get(address + "api/jokes");
}

exports.getJokes = function () {
    return joke.find().exec();
};

// exports.getSites = async function () {
//     return get(urlServices);
// }
// exports.getRummet = function (rum) {
//     return besked.find().where('rum').eq(rum).select('-_id -__v').exec();
// }

// exports.getRum = function () {
//     return besked.find().distinct('rum').exec();
// }



