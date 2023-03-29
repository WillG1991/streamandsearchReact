import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Box,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import {Search as SearchIcon,} from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";
import MovieDetails from "./components/MovieDetails";
import { useMediaQuery } from '@material-ui/core';
import SavedMoviesSection from "../src/components/SavedMovieSection"
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {  Favorite as FavoriteIcon } from '@material-ui/icons';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  searchField: {
    width: '200%',
  },
  clearButton: {
    visibility: 'hidden',
    transition: 'visibility 0s, opacity 0.5s linear',
  },
  clearButtonVisible: {
    visibility: 'visible',
  },
  smallModal: {
    width: 300,
    height: 200,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    outline: "none",
    borderRadius: 10,
    padding: theme.spacing(2),
  },
  bottomNavigation: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    
  },
  savedMoviesSection: {
    height: "80vh"
  },
  
}));


function App() {
  // Declare state variables for movie title, movie info, and modal open status
  const [movieTitle, setMovieTitle] = useState("");
  const [movieInfo, setMovieInfo] = useState({});
  const [view, setView] = useState("search");
  const [savedMovies, setSavedMovies] = useState(
    JSON.parse(localStorage.getItem('savedMovies')) || []
  );

  console.log('Saved movies:', savedMovies);


  const matches = useMediaQuery('(max-width: 600px)');

const searchStreamStyle = {
  fontSize: matches ? '1.5rem' : '4rem',
};

const searchStreamStyles = {
  fontSize: matches ? '.5rem' : '3rem',
};

 // Retrieve saved movies from local storage when the component mounts
 useEffect(() => {
  const savedMoviesFromLocalStorage = JSON.parse(localStorage.getItem('savedMovies'));
  if (savedMoviesFromLocalStorage) {
    setSavedMovies(savedMoviesFromLocalStorage);
  }
}, []);

// Define function to save movie to local storage
const saveMovie = (movie) => {
  console.log('Movie saved:', movie);

// Check for duplicate movies
const isDuplicate = savedMovies.some((savedMovie) => savedMovie.imdbID === movie.imdbID);
if (isDuplicate) {
  // Show a notification to the user that the movie is already in their favorites
  window.alert('This movie is already on your favorites list.');
  return;
}

const updatedSavedMovies = [...savedMovies, movie];
setSavedMovies(updatedSavedMovies);
localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
};

const removeMovie = (movie) => {
  const updatedSavedMovies = savedMovies.filter((m) => m.imdbID !== movie.imdbID);
  setSavedMovies(updatedSavedMovies);
  localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
};

  

  // Define function to search for movie using API
const searchMovie = async () => {
  try {
    console.log(process.env.REACT_APP_OMDB_API_KEY); // log the value of the API key
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&t=${movieTitle}`
    );
    const data = await response.json();
    console.log('Response:', data); // log the response to the console

    if (data.Response === "False") {
      window.alert("Movie not found. Check spelling and please try again!");
    } else {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_X_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
      };

      // Fetch streaming data for the movie
      fetch(`https://streaming-availability.p.rapidapi.com/get/basic?country=us&imdb_id=${data.imdbID}&output_language=en`, options)
        .then(response => response.json())
        .then((response) => {
          console.log(response);
          setMovieInfo({ ...data, streamingData: response.streamingInfo });
          console.log(response.streamingInfo)
        });
    }
  } catch (error) {
    console.error(error);
  }
};


// Define function to handle form submission
const handleSubmit = (e) => {
  e.preventDefault();
  setMovieInfo({});
  searchMovie();
};

// Define function to handle changes to movie title input
const handleChange = (e) => {
  setMovieTitle(e.target.value);
};


// Use the custom styles defined above
const classes = useStyles();

return (
  <div className={classes.root}>
    {view === "search" && (
      <Box className={classes.section} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h1" align="center" gutterBottom style={searchStreamStyle}>
                Search & Stream
              </Typography>
              <Typography variant="h4" align="center" gutterBottom style={searchStreamStyles}>
                You search it, we'll tell you where it streams.
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
                <TextField
  className={classes.searchInput}
  variant="outlined"
  placeholder="Enter a movie or TV show title"
  onChange={handleChange}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          color="primary"
          aria-label="search"
          type="submit"
        >
          <SearchIcon />
        </IconButton>
      </InputAdornment>
    )
  }}
  style={{ width: "100%", height: "60px" }} // set height property
/>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
    )}
    {movieInfo.Title && view === "search" && (
      <Box padding={4}>
  {movieInfo.Title && view === "search" && (
    <MovieDetails
      title={movieInfo.Title}
      posterURLs={{ 500: movieInfo.Poster }}
      streamingInfo={movieInfo.streamingData}
      plot={movieInfo.Plot}
      genre={movieInfo.Genre}
      director={movieInfo.Director}
      runtime={movieInfo.Runtime}
      onSave={() => saveMovie(movieInfo)}
    />
  )}
</Box>

    )}

    {view === "favorites" && (
      <SavedMoviesSection
        savedMovies={savedMovies}
        removeMovie={removeMovie}
        className={classes.savedMoviesSection}
      />
    )}

    <BottomNavigation
      value={view}
      onChange={(event, newValue) => setView(newValue)}
      showLabels
      className={classes.bottomNavigation}
    >
      <BottomNavigationAction label="Search" value="search" icon={<SearchIcon />} />
      <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
    </BottomNavigation>
  </div>
);

    };
export default App;
