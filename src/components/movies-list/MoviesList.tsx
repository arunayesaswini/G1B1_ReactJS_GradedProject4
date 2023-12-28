import IMovie from "../../model/IMovie";
import MoviesListItem from "./MoviesListItem";
import {Col, Row } from "react-bootstrap";



type Props = {
  movies: IMovie[],
};




const MoviesList = ({ movies }: Props) => {
  return (
    <div>
      <Row xs={1} md={2} lg={4}>
        {
          movies?.map(
            movie => (
              <Col key={movie.id} className="d-flex align-items-stretch my-3">
                <MoviesListItem
                  movie={movie}
                />
              </Col>
            )
          )
        }
      </Row>

    </div>
  );
}
export default MoviesList;