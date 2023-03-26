import React from 'react';
import { Typography, Box, Card, CardMedia, CardContent, Button } from '@mui/material';
import StreamingService from '../StreamingService'; // import the StreamingService component

const MovieDetails = ({ title, posterURLs, streamingInfo, tagline, plot, genre, director, runtime, onSave }) => {
  console.log(onSave);
  const poster = posterURLs ? posterURLs['500'] : ''; // using 500 size for poster image
  const streamingServices = streamingInfo ? Object.keys(streamingInfo) : [];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h3" sx={{ mt: 3 }}>
        {title}
      </Typography>
      <Card sx={{ maxWidth: 350, mt: 3 }}>
        <CardMedia component="img" image={poster} alt={title} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {plot}
          </Typography>
          {streamingServices.length > 0 ? (
            <Box sx={{ mt: 2 }}>
              {streamingServices.map((service) => (
                <StreamingService
                  key={service}
                  name={service}
                  link={streamingInfo[service]["us"].link}
                />
              ))}
            </Box>
          ) : (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                Streaming Info Not Available
              </Typography>
            </Box>
          )}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={() => { onSave({ title, posterURLs, streamingInfo, tagline, plot, genre, director, runtime }); console.log({ title, posterURLs, streamingInfo, tagline, plot, genre, director, runtime }) }}>
              Save
            </Button>
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
