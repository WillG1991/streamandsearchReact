import React from 'react';
import { Box, Typography, Container } from '@material-ui/core';
import SavedMovies from '../SavedMovies';


const SavedMoviesSection = ({ savedMovies, removeMovie }) => {
  return (
    <div>
      <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography gutterBottom variant="h2" component="div" align="center" sx={{ pt: 2 }}>
          Your Saved Movies:
        </Typography>
      </Box>
      <SavedMovies savedMovies={savedMovies} onRemoveMovie={removeMovie} />
      </Container>
    </div>
  );
};

export default SavedMoviesSection;