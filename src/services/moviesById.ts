import axios from 'axios';
import IMovie from '../model/IMovie';

const getMoviesComingFromServerById = (id : number) => {
    return axios.get<IMovie>(`http://localhost:3000/movies-coming/${id}`)
    .then(res => res.data)
};
const getMoviesInTheatersFromServerById = (id : number) => {
    return axios.get<IMovie>(`http://localhost:3000/movies-in-theaters/${id}`)
    .then(res => res.data)
};
const getTopRatedIndiaMoviesFromServerById =(id : number) => {
    return axios.get<IMovie>(`http://localhost:3000/top-rated-india/${id}`)
    .then(res => res.data)
};

const getTopRatedMoviesFromServerById =(id : number) => {
    return axios.get<IMovie>(`http://localhost:3000/top-rated-movies/${id}`)
    .then(res => res.data)
};


const getfavouriteMoviesFromServerById =(id : number) => {
    return axios.get<IMovie>(`http://localhost:3000/favourite/${id}`)
    .then(res => res.data)
};

export {
    getMoviesComingFromServerById,
    getMoviesInTheatersFromServerById,
    getTopRatedIndiaMoviesFromServerById,
    getTopRatedMoviesFromServerById,
    getfavouriteMoviesFromServerById

};