const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// generation1 pokemon  route

app.get('/generation1', (req, res) => {
  axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => {
      const species = response.data.results;
      console.log(species)
      res.status(200).send(species);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('An error occurred');
    });
});

//Task given during interview to hit each url and return that data


// app.get('/generation1', (req, res) => {
//   axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
//     .then(response => {
//       const species = response.data.results;
//       console.log(species)
//       const pokemonPromises = species.map(s => {
//         return axios.get(s.url);
//       })
      
//       Promise.all(pokemonPromises)
//         .then(pokemonResponses => {
//           const pokemonData = pokemonResponses.map(response => response.data);
//           res.status(200).send(pokemonData);
//         })
//         .catch(error => {
//           console.log(error);
//           res.status(500).send('An error occurred');
//         });
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).send('An error occurred');
//     });
// }); 

app.get('/color', (req, res) => {
  const color = req.query.color;
  console.log(color)

  // Validate color input
  const colorRegex = /^[a-zA-Z]{1,20}$/;
  if (!colorRegex.test(color)) {
    res.status(400).send('Invalid color input');
    return;
  }

  let url = 'https://pokeapi.co/api/v2/pokemon-color/';
  if (color) {
    url += `${color}`;
  }
  console.log("url", url)

  axios.get(url)
    .then(response => {
      const pokemon = response.data;
      res.send(pokemon);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('An error occurred');
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
