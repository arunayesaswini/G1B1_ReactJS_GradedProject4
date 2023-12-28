import React,{Component} from "react";
import IMovie from "../../model/IMovie";
import {LoadingStatus} from "../../model/types";
import LoadingIndicator from "../common/LoadingIndicator";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRankingStar} from "@fortawesome/free-solid-svg-icons";
import MoviesList from "../movies-list/MoviesList";
import {getTopRatedIndiaMoviesFromServer} from "../../services/movies";


type Props={};

type State={
    status : LoadingStatus,
    topRatedIndianMovies : IMovie[],
    error? : Error | null

};

class TopRatedIndianMovies extends Component<Props,State>{

    constructor(props: Props) {
        super(props);
        this.state = {
            status: 'LOADING',
            topRatedIndianMovies: []
        }
    }
    

    render(){
        let el;
        const {status, topRatedIndianMovies,error} = this.state;
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
                                <header  style={{color:"#d12e9d"}}>
                                    <h1>
                                        <center>
                                        <FontAwesomeIcon icon={faRankingStar} className="me-3" />
                                            Top Rated Indian Movies
                                        </center>
                                    </h1>
                                </header>
                                <hr/>
                                <body>
                                    <MoviesList movies={topRatedIndianMovies}/>
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
            const data = await getTopRatedIndiaMoviesFromServer();
            this.setState(
                {
                    status:'LOADED',
                    topRatedIndianMovies : data
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
export default TopRatedIndianMovies;