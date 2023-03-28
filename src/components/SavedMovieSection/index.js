import React from 'react';
import { Box, Typography } from '@material-ui/core';
import SavedMovies from '../SavedMovies';

const SavedMoviesSection = ({ savedMovies, removeMovie }) => {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography gutterBottom variant="h5" component="div" align="center" sx={{ mt: 5 }}>
          Your Saved Movies:
        </Typography>
      </Box>
      <SavedMovies savedMovies={savedMovies} onRemoveMovie={removeMovie} />
    </div>
  );
};

export default SavedMoviesSection;