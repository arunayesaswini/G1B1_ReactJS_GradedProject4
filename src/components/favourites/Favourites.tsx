import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFavouriteMoviesFromServer, pushFavouriteMoviesToServer } from "../../services/movies";
import IMovie from '../../model/IMovie';
import axios from 'axios';
import { Button } from 'react-bootstrap';


type Props = {
    movie: IMovie
};


const Favourites = ({ movie }: Props) => {
    const [favouriteMovies, setFavouriteMovies] = useState<IMovie[]>([]);

    useEffect(() => {
        //fetching favourite movies from server
        getFavouriteMoviesFromServer().then(data => setFavouriteMovies(data))
    }, []);

    const addToFavourites = (movie: IMovie) => {

        // Checking if the movie is already in favourites
        if (favouriteMovies.some((fav) => fav.id === movie.id)) {
            showToast(`${movie.title} is already in favourites`, 'info');
            return;
        }
        //updating local state 

        const updatedMovies = [...favouriteMovies, { ...movie, isFavourite: !movie.isFavourite }];
        setFavouriteMovies(updatedMovies);

        //updating the server
        pushFavouriteMoviesToServer(movie).then(() => {
            showToast(`${movie.title} added to favourites`, 'success');
        }).catch(() => {
            //handling error if needed
            showToast('Failed to add movie to favourites', 'danger');
            //Rollback the local state if there is an error
            setFavouriteMovies(favouriteMovies.filter(fav => fav.id !== movie.id));
        });

    };

    const deleteFromFavourites = (movie: IMovie) => {

        //updating the local state
        const updatedFavouriteMoives = favouriteMovies.filter(fav => fav.id !== movie.id);
        setFavouriteMovies(updatedFavouriteMoives);
        //updating the server
        axios.delete(`http://localhost:3000/favourite/${movie.id}`)
            .then(() => {
                showToast(`${movie.title} removed from favourites`, 'danger')
            })
            .catch(() => {
                //handling error 
                showToast('Failed to remove movie to favourites', 'danger');
                // Finding the movie to add it back to local state
                const movieToAddBack = favouriteMovies.find((fav) => fav.id === movie.id);

                // Adding the movie back to local state if found
                if (movieToAddBack) {
                    setFavouriteMovies([...favouriteMovies, movieToAddBack]);
                }
            });
    }

    const showToast = (message: string, variant: 'success' | 'danger' | 'info') => {

        if (variant === 'success') {
            toast.success(message, {
                position: toast.POSITION.TOP_RIGHT,
                className: `d-inline-block m-1 toast-${variant}`
            });

        } else if (variant === 'danger') {
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT,
                className: `d-inline-block m-1 toast-${variant}`
            });

        } else {
            toast.info(message, {
                position: toast.POSITION.TOP_RIGHT,
                className: `d-inline-block m-1 toast-${variant}`
            });
        }

    };

    const handleButtonClick = () => {
        if (movie.isFavourite) {
            deleteFromFavourites(movie);
        } else {
            addToFavourites(movie);
        }
        // Update the isFavourite property in the local state
        setFavouriteMovies((prevMovies) =>
            prevMovies.map((prevMovie) =>
                prevMovie.id === movie.id ? { ...prevMovie, isFavourite: !prevMovie.isFavourite } : prevMovie
            )
        );
    };

    return (
        <div>
            <Button
                variant={movie.isFavourite ? "danger" : "outline-danger"}
                onClick={handleButtonClick}
                title={movie.isFavourite ? "Remove from Favorites" : "Add to Favorites"}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                </svg>
            </Button>{''}
            <ToastContainer />
        </div>
    );

};

export default Favourites;