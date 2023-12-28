import axios from 'axios';
import IMovie from '../model/IMovie';


const getUpComingMoviesFromServer = () => {
    return axios.get<IMovie[]>("http://localhost:3000/movies-coming")
    .then(res => res.data)
};

const getMoviesInTheatersFromServer = () => {
    return axios.get<IMovie[]>("http://localhost:3000/movies-in-theaters")
    .then(res => res.data)
};

const getTopRatedIndiaMoviesFromServer =() => {
    return axios.get<IMovie[]>("http://localhost:3000/top-rated-india")
    .then(res => res.data)
};

const getTopRatedMoviesFromServer =() => {
    return axios.get<IMovie[]>("http://localhost:3000/top-rated-movies")
    .then(res => res.data)
};

const getFavouriteMoviesFromServer =() => {
    return axios.get<IMovie[]>("http://localhost:3000/favourite")
    .then(res => res.data)
};


const pushFavouriteMoviesToServer =(favouriteMovie : Omit<IMovie, 'id'>) => {
    return axios.post<IMovie>(
        "http://localhost:3000/favourite",
        favouriteMovie,
        {
            headers : {
                "Content-Type" : "application/json"
            }
        }

    )
    .then(res => res.data)
};


export {
    getUpComingMoviesFromServer,
    getMoviesInTheatersFromServer,
    getTopRatedIndiaMoviesFromServer,
    getTopRatedMoviesFromServer,
    getFavouriteMoviesFromServer,
    pushFavouriteMoviesToServer
};


 