import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
}));

const SavedMovies = () => {
  const classes = useStyles();
  const savedMovies = JSON.parse(localStorage.getItem('savedMovies') || '[]');

  return (
    <Box>
      <Typography variant="h2" align="center" gutterBottom>
        Saved Movies
      </Typography>
      {savedMovies.map((movie, index) => (
        <Grid item key={index}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={movie.posterURLs['500']}
              title={movie.title}
            />
            <CardContent className={classes.cardDetails}>
              <Typography component="h3" variant="h5">
                {movie.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {movie.streamingInfo}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Box>
  );
};

export default SavedMovies;
