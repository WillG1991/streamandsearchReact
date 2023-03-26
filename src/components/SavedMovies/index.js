import React from 'react';
import { Typography, Box, Card, CardMedia, CardContent } from '@mui/material';

const SavedMovies = ({ savedMovies }) => {
  console.log('Saved movies:', savedMovies);

  return (
<Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', mt: 2 }}>
  {savedMovies.map((movie) => {
    console.log('movie:', movie);
    return (
      <Card key={movie.title} sx={{ maxWidth: 350, m: 2 }}>
<CardMedia component="img" image={movie.Poster} alt={movie.Title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {movie.Title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.Plot}
          </Typography>
        </CardContent>
      </Card>
    );
  })}
</Box>
  );
};

export default SavedMovies;
