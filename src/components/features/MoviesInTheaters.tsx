import React,{Component} from "react";
import IMovie from "../../model/IMovie";
import {LoadingStatus} from "../../model/types";
import LoadingIndicator from "../common/LoadingIndicator";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMasksTheater} from "@fortawesome/free-solid-svg-icons";
import MoviesList from "../movies-list/MoviesList";
import {getMoviesInTheatersFromServer} from "../../services/movies";

type Props={};

type State={
    status : LoadingStatus,
    moviesInTheaters : IMovie[],
    error? : Error | null

};

class MoviesInTheaters extends Component<Props,State>{

    constructor (props : Props){
        super(props);
        this.state={
            status : 'LOADED',
            moviesInTheaters : []
        };
    }
   

    render(){
        let el;
        const {status, moviesInTheaters,error} = this.state;
        switch(status){
            case 'LOADING':
                el=(
                    <LoadingIndicator 
                    size="large"
                    message="We are fetching Movies. Please wait..."
                    />
                );
            break;
            case 'LOADED':
                    el=(
                        <main>
                            <section className="my-2">
                                <header style={{color: "royalblue"}}>
                                    <h1>
                                        <center>
                                        <FontAwesomeIcon icon={faMasksTheater}  className="me-3" />
                                            Moives in Theaters
                                        </center>
                                    </h1>
                                </header>
                                <hr/>
                                <body>
                                    <MoviesList movies={moviesInTheaters}/>
                                </body>
                            </section>
                        </main>
                    );
            break;
            case 'ERROR_LOADING':
                el=(
                    <Alert variant="danger">
                        {error?.message}
                    </Alert>
                );                
            break;
            
        }
        return el;
    }

    async componentDidMount(){
        this.setState({
            status:'LOADING'
        });
        try {
            const data = await getMoviesInTheatersFromServer();
            this.setState(
                {
                    status:'LOADED',
                    moviesInTheaters : data
                }
            );
            
        } catch (error) {
            this.setState({
                status : 'ERROR_LOADING',
                error : error as Error
            }
            );
        }
    }
    

}
export default MoviesInTheaters;