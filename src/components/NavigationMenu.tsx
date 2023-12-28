
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { Button, Form } from 'react-bootstrap';

const NavigationMenu = () => {

  return (
    <Navbar bg="light" expand="lg"  className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand
          style={
            {
              color: 'goldenrod',
              fontWeight: 'bold',
            }
          }
        >
          <FontAwesomeIcon
            icon={faFilm}
            style={{ color: 'mediumslateblue' }}
            className='me-2'
          />
          Movies on Tip
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/movies-coming" style={{ color: 'darkviolet' }}>Coming Soon</Nav.Link>
            <Nav.Link href="/movies-in-theaters" style={{ color: 'darkviolet' }}>Movies in Theaters</Nav.Link>
            <Nav.Link href="/top-rated-india" style={{ color: 'darkviolet' }}>Indian Top Rated</Nav.Link>
            <Nav.Link href="/top-rated-movies" style={{ color: 'darkviolet' }}>Top Rated Movies</Nav.Link>
            <Nav.Link href="/favourite" style={{ color: 'darkviolet' }}>Favourite Movies</Nav.Link>
          </Nav>
          <Form className='d-flex' style={{position: 'absolute',right: '0'}}>
            <Form.Control type="text" placeholder="Search" className="mr-sm-2 me-2" />
            <Button variant="primary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );


};

export default NavigationMenu;