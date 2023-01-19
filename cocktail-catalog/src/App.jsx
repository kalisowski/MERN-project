import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import CocktailInfo from './pages/CocktailInfo';
import AdminPage from './pages/AdminPage';
import AddPage from './pages/AddPage';
import CommentEdit from './pages/CommentEdit';
import Stats from './pages/StatsPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/cocktail">
            <Route path=":id">
              <Route path=":cid" element={<CommentEdit />} />
              <Route index element={<CocktailInfo />} />
            </Route>
          </Route>
          <Route path="/edit/:id" element={<AddPage />} />
          <Route path="/add" element={<AddPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
