import React, { useState } from "react";
import "./App.css";
import MovieDetails from "./components/MovieDetails";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '8px',
    maxWidth: '80%',
    maxHeight: '80%',
    padding: '24px',
    margin: 'auto',
    outline: 'none',
    overflow: 'auto'
  }
};

function App() {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieInfo, setMovieInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMovieInfo({});
    searchMovie();
  };

  const handleChange = (e) => {
    setMovieTitle(e.target.value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  {/* Modal to display movie not found message */}
  <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Movie not found"
  className="modal"
  overlayClassName="overlay"
  style={customStyles}
>
  <h2 className="modal-title">Movie not found</h2>
  <p className="modal-message">Check spelling and please try again!</p>
  <button className="modal-button" onClick={closeModal}>OK</button>
</Modal>
</div>
);
}

export default App;
