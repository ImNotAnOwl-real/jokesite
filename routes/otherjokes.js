// company.js
const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const getServiceURL = 'https://krdo-joke-registry.herokuapp.com/api/services';


async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}


router
.get('/:site', async (request, response) => {
    try {
        let result = await get("https://krdo-joke-registry.herokuapp.com/api/services");
        for (site of result) {
            if (site._id == request.params.site) {
                let url = site.address
                if(url[url.length - 1] != '/'){
                    url += '/'
                }
                result = await get(url + 'api/jokes')
            }
        }
        // result = await get("https://jokenator4000.herokuapp.com/api/jokes%22)
        response.send(result)


    } catch (e) {
        sendStatus(e, response);
    }

})
//     let id;
//     let address;
//     for (site of sites) {
//     if (site.name === request.params.id) {
//     id = site._id;
//     address = site.address;
// }

// let jokesfraSites = await controller.getJokesFraSites(address);
// response.send(jokesfraSites);

// .post('/', async (request, response) => {
//         try {
//             let {setup, punchline} = request.body;
//             await controller.createJoke(setup, punchline);
//             response.send({message: 'Joke saved!'});
//         } catch (e) {
//             sendStatus(e, response);
//         }
//     }
// );




function sendStatus(e, response) {
    console.error("Exception: " + e);
    if (e.stack) console.error(e.stack);
    response.status(500).send(e);
}

module.exports = router;