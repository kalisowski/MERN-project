import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cocktailContext from '../contexts/cocktailContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Card({ id, name, image, category, admin }) {
  const { cocktails, setCocktails } = useContext(cocktailContext);

  let navigate = useNavigate();
  const handleClick = () => {
    let path = `/cocktail/${id}`;
    navigate(path);
  };

  const deleteCocktail = async () => {
    const url = process.env.REACT_APP_API_COCKTAILS + 'cocktail/' + id;
    try {
      const response = await axios.delete(url);
      if (response.status === 200) {
        const newCocktails = cocktails.filter(
          (cocktail) => cocktail._id !== id
        );
        setCocktails(newCocktails);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.log(error);
    }
  };

  const handleDelete = () => {
    deleteCocktail();
    toast.success('Cocktail deleted');
  };

  return (
    <div className="card-comact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="obrazek" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{category}</p>
        <div className="card-actions justify-end">
          {admin && (
            <>
              <button className="btn btn-error" onClick={handleDelete}>
                Delete
              </button>

              <Link to={`/edit/${id}`}>
                <button className="btn btn-accent">Edit</button>
              </Link>
            </>
          )}
          <button className="btn btn-primary" onClick={handleClick}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
