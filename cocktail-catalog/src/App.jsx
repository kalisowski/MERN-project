import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import CocktailInfo from './pages/CocktailInfo';
import AdminPage from './pages/AdminPage';
import AddPage from './pages/AddPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route exact path="/cocktail/:id" element={<CocktailInfo />} />
          <Route path="/add" element={<AddPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
