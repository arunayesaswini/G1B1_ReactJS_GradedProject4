import React from 'react';


import NavigationMenu from './NavigationMenu';
import { Container } from 'react-bootstrap';
import MoviesInTheaters from './features/MoviesInTheaters';
import UpcomingMovies from './features/UpcomingMovies';
import TopRatedIndianMovies from './features/TopRatedIndianMovies';
import TopRatedMovies from './features/TopRatedMovies';
import FavouriteMovies from './features/FavouriteMovies';
import MoviesListItem from './movies-list/MoviesListItem';
import IMovie from '../model/IMovie';
import LoadingIndicator from './common/LoadingIndicator';
import Rating from './common/Rating';
import MoviesList from './movies-list/MoviesList';
import MovieDetails from './movie-details/MovieDetails';



function App() {
  return (
    <div className="App">
      <NavigationMenu />
      <Container>
        {/* <UpcomingMovies/> */}
        {/* <MoviesInTheaters/> */}
        {/* <TopRatedIndianMovies/> */}
        {/* <TopRatedMovies/> */}
        {/* <FavouriteMovies/> */}
      </Container>
    </div>
  );
}

export default App;
