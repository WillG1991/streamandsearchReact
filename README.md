# Search & Stream App

This React-based app lets users search for a movie or TV show and find out where it can be streamed. It uses the OMDb and Streaming Availability APIs to fetch movie information and streaming data. Additionally, the app uses local storage to allow users to add and remove favorite movies for future reference.

## Installation

To install this application, follow these steps:

Clone the repository
bash
Copy code
git clone https://github.com/your-username/search-and-stream.git
Install dependencies by running npm install

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Getting Started

To get started with this application, follow these steps:

Obtain API keys for OMDb and Streaming Availability APIs
Create a .env file in the root directory of the project and add the following environment variables:
makefile
Copy code
REACT_APP_OMDB_API_KEY=<your OMDb API key>
REACT_APP_X_RAPIDAPI_KEY=<your Streaming Availability API key>
Run the application by running npm start

### Dependencies

This application utilizes the following dependencies:

react
@material-ui/core
@material-ui/icons
react-modal

### Features
This application features a search bar where users can enter a movie or TV show title. Once the user submits the search, the application fetches information about the movie using the OMDb API. If the movie is found, it then fetches streaming data for the movie using the Streaming Availability API. If the movie cannot be found, the application displays a modal with an error message. If the movie is found and streaming data is available, the application displays a component with the movie details, including the title, poster, streaming options, plot, genre, director, and runtime.


