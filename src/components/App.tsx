
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import MoviePage from './MoviePage';


function App() {

  return (

    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} 
      closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <MoviePage />
    </>

  );
}

export default App;
