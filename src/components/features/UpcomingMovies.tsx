import React,{Component} from "react";
import IMovie from "../../model/IMovie";
import {LoadingStatus} from "../../model/types";
import LoadingIndicator from "../common/LoadingIndicator";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import MoviesList from "../movies-list/MoviesList";
import {getUpComingMoviesFromServer} from "../../services/movies";


type Props={};

type State={
    status : LoadingStatus,
    upcomingMovies : IMovie[],
    error? : Error | null

};

class UpcomingMovies extends Component<Props,State>{

    constructor(props: Props) {
        super(props);
        this.state = {
            status: 'LOADING',
            upcomingMovies: []
        };
    }
  

    render(){
        let el;
        const {status, upcomingMovies, error} = this.state;
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
                                        <FontAwesomeIcon icon={faCalendarCheck} className="me-5" />
                                            Coming Soon.... 
                                        </center>
                                    </h1>
                                </header>
                                <hr/>
                                <body>
                                    <MoviesList movies={upcomingMovies}/>
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
            const data = await getUpComingMoviesFromServer();
            this.setState(
                {
                    status:'LOADED',
                    upcomingMovies: data
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
export default UpcomingMovies;