
const urlServices = 'https://krdo-joke-registry.herokuapp.com/api/services'
// index.js
async function get(url) {
  const respons = await fetch(url);
  if (respons.status !== 200) // OK
    throw new Error(respons.status);
  return await respons.json();
}

async function getText(url) {
  const respons = await fetch(url);
  if (respons.status !== 200) // OK
    throw new Error(respons.status);
  return await respons.text();
}

let allesites;

async function post(url, objekt) {
  const respons = await fetch(url, {
      method: "POST",
      body: JSON.stringify(objekt),
      headers: { 'Content-Type': 'application/json' }
  });
  if (respons.status !== 200) // Created
      throw new Error(respons.status);
  return await respons.json();
}


async function generateJokeTable(jokes) {
  let template = await getText('/jokes.hbs');
  let compiledTemplate = Handlebars.compile(template);
  return compiledTemplate({ jokes });
}
async function generateHjemmesideTable(sites) {
  let template = await getText('/sites.hbs');
  let compiledTemplate = Handlebars.compile(template);
  return compiledTemplate({ sites });
}
const alleJokes = document.getElementById('voresjokes');

console.log(alleJokes)


alleJokes.addEventListener('click', async (event) => {
  if (!event.isTrusted) return // do nothing on the second run
  try {
    event.preventDefault()
    document.getElementById('add').style.visibility ='visible';
    document.getElementById('smiley').remove();
    document.getElementById('infoSites').innerHTML = " "
    let jokes = document.getElementById('infoJokes');
    let header = document.getElementById('header');
    header.innerHTML = "Vores jokes";
    console.log(jokes);
    let joke = await get('api/jokes');
    jokes.innerHTML = await generateJokeTable(joke);
    // alleJokes.click() // simulate a new click
  } catch(err) {
    console.error(err) // or alert it, or put the message on the page
  }
})

const andresites = document.getElementById('andresites');


andresites.addEventListener('click', async (event) => {
  if (!event.isTrusted) return // do nothing on the second run
  try {
    event.preventDefault()
    document.getElementById('add').style.visibility ='hidden';
    document.getElementById('smiley').remove();
    document.getElementById('infoJokes').innerHTML = " "
    let header = document.getElementById('header');
    header.innerHTML = "Andre sites";
    let hjemmesider = document.getElementById('infoSites');
    let jokes = await get('api/othersites');
    hjemmesider.innerHTML = await generateHjemmesideTable(jokes);
    allesites = document.getElementById("mySelect")
    allesites.onchange = () => findJokes();
    //alleJokes.click() // simulate a new click
  } catch (err) {
    console.error(err) // or alert it, or put the message on the page
  }
})

function clear() {
  let clear = document.getElementById('infoJokes');
  clear.innerHTML = ""
}


function findJokes() {
  async function getJokes() {
    try {

      let sites = await get('api/othersites');
      let id;
      let address;
      for (site of sites) {
        if (site.name === allesites.options[allesites.selectedIndex].value) {
          id = site._id;
          address = site.address;
        }
      }

      let jokesFraSites = await get('api/otherjokes/'+id);
      console.log(jokesFraSites);

      let hjemmesider = document.getElementById('infoJokes');
      

      hjemmesider.innerHTML = await generateJokeTable(jokesFraSites);





      console.log(id);
      // let selectedSites = allesites.options[allesites.selectedIndex].value

      // let respons = await get(selectedSites + "api/otherjokes");
      // console.log(respons.length);
      // console.log(respons);
      // console.log("hej");
      // beskedFelt.value = " ";
      // for (let i = 0; i < respons.length; i++)
      // {
      //     console.log(i);
      //     console.log(respons[i].navn+"hej");
      //    beskedFelt.value += respons[i].navn+ " : " + respons[i].Besked + "\n";
      // }
    } catch (fejl) {
      console.log(fejl);
    }
  }
  getJokes();
}


let add = document.getElementById("add")

add.addEventListener('click', async (event) => {
if (!event.isTrusted) return
try {
event.preventDefault()
let setupvalue = document.getElementById("setupinput").value
let punchlinevalue = document.getElementById("punchlineinput").value
await post('api/jokes',{setup: setupvalue,punchline: punchlinevalue});
} catch(err) {
  console.error(err) // or alert it, or put the message on the page
}
})



async function main() {
  console.log("hej");
  try {
    let jokes = document.getElementById('infoJokes');
    console.log(jokes);
    let joke = await get('api/jokes');
    jokes.innerHTML = await generateJokeTable(joke);
  } catch (e) {
    console.log(e.name + ": " + e.message);
  }
}
//main();



