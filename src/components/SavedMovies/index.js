import React from 'react';
import { Typography, Box, Card, CardMedia, CardContent, IconButton, Chip, Avatar } from '@mui/material';
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
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  savedMoviesContainer: {
    height: '80vh', 
    overflowY: 'auto',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
}));

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
  const classes = useStyles();


  return (
    <div className={classes.savedMoviesContainer}>

    <Box sx={{ overflowX: 'scroll', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%' }}>
    
        <Box sx={{ display: 'flex', mt: 2 }}>
          {savedMovies.map((movie) => {
            console.log('movie:', movie);
            return (
<Card key={movie.title} sx={{ maxWidth: 250, flexShrink: 0, m: 2, width: "500px" }}>
                <IconButton onClick={() => onRemoveMovie(movie)}>
                  <Delete />
                </IconButton>
                <CardMedia
  component="img"
  image={movie.Poster}
  alt={movie.Title}
  sx={{
    height: 250,
    width: "100%",
    objectFit: 'contain',
  }}
/>             <CardContent sx={{ textAlign: 'center', height: 180 }}>
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
      <Chip
        key={streamingService}
        sx={{ mb: 1 }}
        avatar={icon && (
          <Avatar sx={{ width: 30, height: 30 }}>
          <img src={icon} alt={streamingService} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
        </Avatar>
        )}
        label={(
          <Typography variant="body2" component="a" href={movie.streamingData[streamingService].us.link} target="_blank" rel="noreferrer">
            {streamingService}
          </Typography>
        )}
      />
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
    </div>
  );
  
};

export default SavedMovies;