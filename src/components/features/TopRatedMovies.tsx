import React,{Component} from "react";
import IMovie from "../../model/IMovie";
import {LoadingStatus} from "../../model/types";
import LoadingIndicator from "../common/LoadingIndicator";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles} from "@fortawesome/free-solid-svg-icons";
import MoviesList from "../movies-list/MoviesList";
import {getTopRatedMoviesFromServer} from "../../services/movies";


type Props={};

type State={
    status : LoadingStatus,
    topRatedMovies : IMovie[],
    error? : Error | null

};

class TopRatedMovies extends Component<Props,State>{

    constructor(props : Props){
        super(props);
        this.state={
            status : 'LOADING',
            topRatedMovies : []
        };

    }
   

    render(){
        let el;
        const {status, topRatedMovies,error} = this.state;
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
                                <header style={{color:"#eacc0b"}}>
                                    <h1>
                                        <center>
                                        <FontAwesomeIcon icon={faWandMagicSparkles} className="me-3" />
                                            Top Rated Movies
                                        </center>
                                    </h1>
                                </header>
                                <hr/>
                                <body>
                                    <MoviesList movies={topRatedMovies}/>
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
            const data = await getTopRatedMoviesFromServer();
            this.setState(
                {
                    status:'LOADED',
                    topRatedMovies : data
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
export default TopRatedMovies;