import React from 'react';
import { Typography, Box, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import netflixIcon from "../../assets/img/netflix.png"
import hboIcon from "../../assets/img/hbo.png"
import disneyIcon from "../../assets/img/disney.png"
import amazonIcon from "../../assets/img/amazon.png"
import appleIcon from "../../assets/img/apple.png"
import huluIcon from "../../assets/img/hulu.png"
import showtimeIcon from "../../assets/img/showtime.png"
import paramountIcon from "../../assets/img/paramount.png"
import otherIcon from "../../assets/img/other.png"

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
      case 'showtime':
        return showtimeIcon;
        case 'paramount':
          return paramountIcon;
    default:
      return otherIcon;
  }
};

const SavedMovies = ({ savedMovies, onRemoveMovie }) => {
  console.log('Saved movies:', savedMovies);

  return (
    <Box sx={{ overflowX: 'scroll', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography gutterBottom variant="h5" component="div" align="center" sx={{ pt: 10 }}>
            Your Saved Movies:
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', mt: 2 }}>
          {savedMovies.map((movie) => {
            console.log('movie:', movie);
            return (
              <Card key={movie.title} sx={{ maxWidth: 250, flexShrink: 0, m: 2 }}>
                <IconButton onClick={() => onRemoveMovie(movie)}>
                  <Delete />
                </IconButton>
                <CardMedia component="img" image={movie.Poster} alt={movie.Title} sx={{ height: 400 }} />
                <CardContent sx={{ textAlign: 'center', height: 180 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie.Title}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {Object.keys(movie.streamingData).length === 0 ? (
                      <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                        No Streaming Information Available
                      </Typography>
                    ) : (
                      <>
                        <Typography variant="body1">
                          Streaming Services:
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
                          {Object.keys(movie.streamingData).map((streamingService) => {
                            const icon = getIcon(streamingService);
                            return (
                              <Box key={streamingService} sx={{ display: 'flex', alignItems: 'center', gap: 1, textAlign: 'left', mb: 1 }}>
                                {icon && (
                                  <img src={icon} alt={streamingService} style={{ width: 30 }} />
                                )}
                                <Typography variant="body2">
                                  <a href={movie.streamingData[streamingService].us.link} target="_blank" rel="noreferrer">
                                    {streamingService}
                                  </a>
                                </Typography>
                              </Box>
                            );
                          })}
                        </Box>
                      </>
                    )}
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
  
};

export default SavedMovies;
