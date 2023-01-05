import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Card({ id, name, image, category }) {
  const { user } = useSelector((state) => state.auth);
  let navigate = useNavigate();
  const handleClick = () => {
    let path = `/cocktail/${id}`;
    navigate(path);
  };

  const handleDelete = () => {
    console.log('delete');
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
          {user && (
            <>
              <button className="btn btn-error" onClick={handleDelete}>
                Delete
              </button>
              <button className="btn btn-accent">Edit</button>
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
