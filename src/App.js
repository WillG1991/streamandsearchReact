import React, { useState } from "react";
import "./App.css";
import StreamingWhere from "./components/StreamingWhere";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieInfo, setMovieInfo] = useState({});

  const searchMovie = async () => {
    try {
      console.log(process.env.REACT_APP_OMDB_API_KEY); // log the value of the API key
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&t=${movieTitle}`
      );
      const data = await response.json();
      console.log('Response:', data); // log the response to the console

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '89c588b05bmsh60e709fda358096p14890cjsn1969f0e5a15f',
          'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
      };
      
      fetch(`https://streaming-availability.p.rapidapi.com/get/basic?country=us&imdb_id=${data.imdbID}&output_language=en`, options)
        .then(response => response.json())
        .then((response) => {
          console.log(response);
          setMovieInfo({ ...data, streamingData: response.streamingInfo });
          console.log(response.streamingInfo)
          
        });
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovie();
  };

  const handleChange = (e) => {
    setMovieTitle(e.target.value);
  };





  return (
    <div className="App">
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <h1 className="title is-1">Search & Stream</h1>
              <h2 className="subtitle">
                You search it, we'll tell you where it streams.
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <input
                      className="input is-medium"
                      type="text"
                      placeholder="Enter a movie or TV show title"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="control">
                    <button className="button is-primary is-medium">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>


      <MovieDetails
        title={movieInfo.Title}
        posterURLs={{ 500: movieInfo.Poster }}
        streamingInfo={movieInfo.streamingData} // pass the streamingInfo data from the second API
        plot={movieInfo.Plot}
        genre={movieInfo.Genre}
        director={movieInfo.Director}
        runtime={movieInfo.Runtime}
      />  
    </div>
  );
}

export default App;
