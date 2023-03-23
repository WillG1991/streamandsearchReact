import React from 'react';
import { Typography, Box, Card, CardMedia, CardContent } from '@mui/material';
import StreamingWhere from '../StreamingWhere'; // import the StreamingWhere component


const MovieDetails = ({ title, posterURLs, streamingInfo, tagline, plot, genre, director, runtime }) => {
    console.log(streamingInfo);
  const poster = posterURLs ? posterURLs['500'] : ''; // using 500 size for poster image
  const streamingServices = streamingInfo ? Object.keys(streamingInfo) : [];

  for (const service in streamingInfo) {
    console.log(service);    
  }
  for (const service in streamingInfo) {
    console.log(`${service}: ${streamingInfo[service]["us"].link}`);
  }

  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h3" sx={{ mt: 3 }}>
        {title}
      </Typography>
      <Card sx={{ maxWidth: 500, mt: 3 }}>
        <CardMedia component="img" image={poster} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {tagline}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {plot}
          </Typography>
          <Box sx={{ mt: 2 }}>
          </Box>
        </CardContent>
      </Card>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h5">Movie Info</Typography>
        <Typography variant="body1">Genre: {genre}</Typography>
        <Typography variant="body1">Director: {director}</Typography>
        <Typography variant="body1">Runtime: {runtime}</Typography>
      </Box>
    </Box>
  );
};

export default MovieDetails;
