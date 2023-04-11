import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TablePagination from '@mui/material/TablePagination';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  formControl: {
    minWidth: 120,
    margin: '20px 0',
  },
});

function NamesTable(props) {
  const classes = useStyles();
  const [colorFilter, setColorFilter] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (colorFilter) {
      fetch(`http://localhost:8080/color/?color=${colorFilter}`)
        .then(response => response.json())
        .then(data => {
          setFilteredPokemon(data.pokemon_species);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setFilteredPokemon(props.pokemons || []);
    }
  }, [colorFilter]);

  const handleColorFilterChange = (event) => {
    setColorFilter(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const names = filteredPokemon.map(pokemon => pokemon.name);

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select
          value={colorFilter}
          onChange={handleColorFilterChange}
          displayEmpty
          inputProps={{ 'aria-label': 'color' }}
        >
           <MenuItem value="">All colors</MenuItem>
          <MenuItem value="black">Black</MenuItem>
          <MenuItem value="blue">Blue</MenuItem>
          <MenuItem value="brown">Brown</MenuItem>
          <MenuItem value="gray">Gray</MenuItem>
          <MenuItem value="green">Green</MenuItem>
          <MenuItem value="pink">Pink</MenuItem>
          <MenuItem value="purple">Purple</MenuItem>
          <MenuItem value="red">Red</MenuItem>
          <MenuItem value="white">White</MenuItem>
          <MenuItem value="yellow">Yellow</MenuItem>
        </Select>
        
      </FormControl>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="names table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {names.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(name => (
              <TableRow key={name}>
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={names.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}

export default NamesTable;
