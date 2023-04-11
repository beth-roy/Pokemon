import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import NamesTable from './NamesTable';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Display({ session }) {
  const [pokemons, setPokemons] = useState();

  useEffect(() => {
    getAllPokemon();
  }, []);

  const url = 'http://localhost:8080/generation1';
  const getAllPokemon = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const allPokemons = data;
        setPokemons(allPokemons);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (session != null) {
    if (pokemons !== undefined) {
      return (
        <Container>
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Pokemons List
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <NamesTable pokemons={pokemons} />
          </Grid>
        </Container>
      );
    } else {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      );
    }
  }
}

export default Display;
