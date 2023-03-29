import React, { useState } from 'react';
import { Typography, Box, Card, CardMedia, CardContent, IconButton, Backdrop } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import StreamingService from '../StreamingService';
import StarIcon from '@mui/icons-material/Star';




const MovieDetails = ({ title, posterURLs, streamingInfo, plot, genre, director, runtime, onSave }) => {
  const [isSaved, setIsSaved] = useState(false);

  const poster = posterURLs ? posterURLs['500'] : '';
  const streamingServices = streamingInfo ? Object.keys(streamingInfo) : [];

  const [showMovieInfo, setShowMovieInfo] = useState(false);

  const toggleMovieInfo = () => {
    setShowMovieInfo(!showMovieInfo);
  };

  const handleSave = () => {
    onSave(title);
    setIsSaved(true);
  };


  return (

<Card sx={{ maxWidth: 300, width: '100%', overflow: 'hidden', position: 'relative', margin: 'auto', paddingTop: 1, paddingBottom: 1, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
  {title}
  <IconButton onClick={handleSave} sx={{ position: 'absolute', top: 0, right: 0 }}>
      <StarIcon sx={{ color: isSaved ? 'yellow' : 'inherit' }} />
    </IconButton>
</Typography>
        <Backdrop open={showMovieInfo} onClick={toggleMovieInfo} sx={{ zIndex: 1, color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.8)', position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
          <Box sx={{ mt: '20%', mx: 'auto', width: '80%', textAlign: 'center' }}>
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
        </Backdrop>
        <Box sx={{ position: 'relative', paddingTop: '80%' }}>
          <CardMedia
            component="img"
            image={poster}
            alt={title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
            }}
          />
        </Box>
        <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: 'inherit' } }}>
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
  
  <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>

  <IconButton onClick={toggleMovieInfo} sx={{ ml: 1 }}>
    <KeyboardArrowUpIcon />
  </IconButton>
</Box>
        </CardContent>
      </Card>
  
  );
};

export default MovieDetails;
