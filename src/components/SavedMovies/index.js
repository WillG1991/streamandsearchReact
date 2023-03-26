import React from 'react';
import { Typography, Box, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import netflixIcon from "../../assets/img/netflix.png"
import hboIcon from "../../assets/img/hbo.png"
import disneyIcon from "../../assets/img/disney.png"
import amazonIcon from "../../assets/img/amazon.png"
import appleIcon from "../../assets/img/apple.png"
import huluIcon from "../../assets/img/hulu.png"

const getIcon = (serviceName) => {
  switch (serviceName.toLowerCase()) {
    case 'netflix':
      return netflixIcon;
    case 'prime':
      return amazonIcon;
    case 'disney':
      return disneyIcon;
    case 'apple':
      return appleIcon;
    case 'hbo':
      return hboIcon;
    case 'hulu':
      return huluIcon;
    default:
      return null;
  }
};

const SavedMovies = ({ savedMovies, onRemoveMovie }) => {
  console.log('Saved movies:', savedMovies);

  return (
    <div>
      <Typography gutterBottom variant="h5" component="div" align="center" sx={{ pt: 10 }}>
        Your Saved Movies:
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', mt: 2 }}>
        {savedMovies.map((movie) => {
          console.log('movie:', movie);
          return (
            <Card key={movie.title} sx={{ maxWidth: 250, m: 2 }}>
              <IconButton onClick={() => onRemoveMovie(movie)}>
                <Delete />
              </IconButton>
              <CardMedia component="img" image={movie.Poster} alt={movie.Title} sx={{ height: 400 }} />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography gutterBottom variant="h5" component="div">
                  {movie.Title}
                </Typography>
                {Object.keys(movie.streamingData).length === 0 ? (
                  <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                    No Streaming Information Available
                  </Typography>
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {Object.keys(movie.streamingData).map((streamingService) => {
                      const icon = getIcon(streamingService);
                      return (
                        <Box key={streamingService} sx={{ display: 'flex', alignItems: 'center', gap: 1, textAlign: 'left' }}>
                          {icon && (
                            <img src={icon} alt={streamingService} style={{ width: 30 }} />
                          )}
                          <Typography>
                            <a href={movie.streamingData[streamingService].us.link} target="_blank" rel="noreferrer">
                              {streamingService}
                            </a>
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </div>
  );
};

export default SavedMovies;
