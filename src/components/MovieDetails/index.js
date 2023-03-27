import React from 'react';
import { Typography, Box, Card, CardMedia, CardContent, Button } from '@mui/material';
import StreamingService from '../StreamingService';



const MovieDetails = ({ title, posterURLs, streamingInfo, tagline, plot, genre, director, runtime, onSave }) => {
  const poster = posterURLs ? posterURLs['500'] : '';
  const streamingServices = streamingInfo ? Object.keys(streamingInfo) : [];


  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      maxWidth: '800px',
      margin: 'auto',
      padding: '20px',
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      backgroundColor: '#FFFFFF'
    }}>
      <Typography variant="h3" sx={{ mt: 3 }}>
        {title}
      </Typography>
      <Card sx={{ maxWidth: 350, mt: 3, borderRadius: '10px', overflow: 'hidden' }}>
        <Box sx={{ position: 'relative', paddingTop: '150%' }}>
          <CardMedia component="img" image={poster} alt={title} sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
        </Box>
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
                  link={streamingInfo[service]['us'].link}
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
      <Typography variant="h5" fontWeight="bold" align="center" sx={{ mt: 3 }}>
  Movie Info:
</Typography>
  <Typography variant="body1">
    <strong>Genre:</strong> {genre}
  </Typography>
  <Typography variant="body1">
    <strong>Director:</strong> {director}
  </Typography>
  <Typography variant="body1">
    <strong>Runtime:</strong> {runtime}
  </Typography>
</Box>
    </Box>
  );
};

export default MovieDetails;
