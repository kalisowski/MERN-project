import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import CocktailInfo from './components/shared/CocktailInfo';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route exact path="/cocktail/:id" element={<CocktailInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
