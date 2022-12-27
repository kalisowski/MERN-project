import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ id, name, image, category }) {
  let navigate = useNavigate();
  const handleClick = () => {
    let path = `/cocktail/${id}`;
    navigate(path);
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
          <button className="btn btn-primary" onClick={handleClick}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
