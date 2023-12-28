import React, { useState, useEffect } from "react";
import IMovie from "../../model/IMovie";
import { LoadingStatus } from "../../model/types"; 
import { Alert, Badge, Col, Row } from "react-bootstrap";
import LoadingIndicator from "../common/LoadingIndicator";
import './movieDetails.css';


type Props = {
};


const gameNightMovie = {
    "id": 1,
    "title": "Game Night",
    "year": "2018",
    "genres": [
      "Action",
      "Comedy",
      "Crime"
    ],
    "ratings": [
      2,
      10,
      1,
      10,
      6,
      2,
      5,
      2,
      9,
      7,
      5,
      3,
      7,
      7,
      1,
      4,
      5,
      9,
      2,
      8,
      10,
      8,
      1,
      10,
      7,
      10,
      8,
      6,
      7,
      6
    ],
    "poster": "MV5BMjQxMDE5NDg0NV5BMl5BanBnXkFtZTgwNTA5MDE2NDM@._V1_SY500_CR0,0,337,500_AL_.jpg",
    "contentRating": "11",
    "duration": "PT100M",
    "releaseDate": "2018-02-28",
    "averageRating": 0,
    "originalTitle": "",
    "storyline": "A group of friends who meet regularly for game nights find themselves trying to solve a murder mystery.",
    "actors": [
      "Rachel McAdams",
      "Jesse Plemons",
      "Jason Bateman"
    ],
    "imdbRating": 8.5,
    "isFavourite": false,
    "posterurl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjQxMDE5NDg0NV5BMl5BanBnXkFtZTgwNTA5MDE2NDM@._V1_SY500_CR0,0,337,500_AL_.jpg"
  };

const MovieDetails = (props : Props) =>{
    const [status, setStatus] = useState<LoadingStatus>('LOADING');
    const [movie, setMovie] = useState<IMovie | null>(null);
    const [error, setError] = useState<Error | null>(null);

      const fetchMovie = () => {
        setTimeout(()=>{
            setMovie( gameNightMovie );
            setStatus('LOADED');
        }, 3000);
    };

    useEffect( fetchMovie , []); 


let loading_element;

switch (status) {

    case 'LOADING':
        loading_element = (
            <LoadingIndicator
                size="large"
                message="We are fetching the details of Movies. Please wait..."
            />

        );
        break;
    case 'LOADED':
        const {
            title,
            year,
            genres,
            contentRating,
            duration,
            releaseDate,
            averageRating,
            storyline,
            actors,
            imdbRating,
            posterurl
        } = movie as IMovie;
        loading_element = (
            <Row>
                <Col xs={12}>
                    <a href="/">back to home</a>
                    <hr/>
                </Col>
                <Col xs={12} lg={4}>
                    <img
                     src = {posterurl}
                     alt = {title}
                     className="w-100"
                     />
                </Col>
                <Col xs={12} lg={8}>
                    <Row>
                    <div className=" my-2">
                    <h1 className="me-2">{title} ({year})</h1>
                    </div>
                    </Row>
                    <Row>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>IMDB Rating</td>
                                    <td>
                                        <Badge pill bg="warning" text="dark">
                                            {imdbRating}
                                        </Badge>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Content Rating</td>
                                    <td>{contentRating}</td>
                                </tr>
                                <tr>
                                    <td>Average Rating</td>
                                    <td>{averageRating}</td>
                                </tr>
                                <tr>
                                    <td>Duration</td>
                                    <td>{duration}</td>
                                </tr>
                                <tr>
                                    <td>Genres</td>
                                    <td>
                                        <div>
                                            {genres.map((genre, index) => (
                                                <span key={index} className="me-2">
                                                    {genre}
                                                    {index < genres.length - 1 ? ',' : ''}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Actors</td>
                                    <td>
                                        <div>
                                            {actors.map((actor, index) => (
                                                <span key={index} className="me-2">
                                                    {actor}
                                                    {index < actors.length - 1 ? ', ' : ''}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Release Date</td>
                                    <td>{releaseDate}</td>
                                </tr>
                                <tr>
                                    <td>Story Line</td>
                                    <td>{storyline}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Row>
                </Col>
            </Row>
        );
        break;
    case 'ERROR_LOADING':
        loading_element = (
            <Alert variant="danger" className="my-3">
                {error?.message}
            </Alert>
        );
        break;
}
return loading_element;
    };

export default MovieDetails;