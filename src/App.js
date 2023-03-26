import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Box,
  Button,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import {Search as SearchIcon,} from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";
import MovieDetails from "./components/MovieDetails";
import SavedMovies from "./components/SavedMovies";
import Modal from "react-modal";

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
  }
}));

function App() {
  // Declare state variables for movie title, movie info, and modal open status
  const [movieTitle, setMovieTitle] = useState("");
  const [movieInfo, setMovieInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedMovies, setSavedMovies] = useState(
    JSON.parse(localStorage.getItem('savedMovies')) || []
  );

  console.log('Saved movies:', savedMovies);

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
      setIsModalOpen(true);
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

// Define function to close modal
const closeModal = () => {
  setIsModalOpen(false);
};

// Use the custom styles defined above
const classes = useStyles();

return (
  <div className={classes.root}>
    <Box className={classes.section}>
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h1" align="center" gutterBottom>
              Search & Stream
            </Typography>
            <Typography variant="h4" align="center" gutterBottom>
              You search it, we'll tell you where it streams.
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
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
                  style={{ width: "100%" }}
                />
              </Box>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
    {movieInfo.Title ? (
      <MovieDetails
        title={movieInfo.Title}
        posterURLs={{ 500: movieInfo.Poster }}
        streamingInfo={movieInfo.streamingData}
        plot={movieInfo.Plot}
        genre={movieInfo.Genre}
        director={movieInfo.Director}
        runtime={movieInfo.Runtime}
        onSave={() => saveMovie(movieInfo)} // new prop to save the movie
      />
    ) : null}

    {/* Render the SavedMovies component */}
    <SavedMovies savedMovies={savedMovies} onRemoveMovie={removeMovie} />
        <Modal    isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Movie not found"
      className={classes.smallModal}
    >
      <Typography variant="h2" className={classes.modalTitle}>
        Movie not found
      </Typography>
      <Typography variant="h4" className={classes.modalMessage}>
        Check spelling and please try again!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.modalButton}
        onClick={closeModal}
      >
        OK
      </Button>
    </Modal>
  </div>
);
    };
export default App;
