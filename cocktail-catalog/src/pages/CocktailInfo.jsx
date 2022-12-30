import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function CocktailInfo() {
  const [cocktail, setCocktail] = useState();
  const [comments, setComments] = useState();

  const { id } = useParams();

  const getCocktail = () => {
    const url = `${process.env.REACT_APP_API_COCKTAILS}cocktail/${id}`;
    axios.get(url).then((res) => {
      setCocktail(res.data);
    });
  };

  const getComments = () => {
    const url = `${process.env.REACT_APP_API_COMMENTS}/${id}`;
    axios.get(url).then((res) => {
      setComments(res.data);
    });
  };

  getCocktail();
  getComments();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {cocktail && (
        <div className="flex items-center">
          <div className="card w-100 bg-primary shadow-xl m-5">
            <figure>
              <img src={cocktail.image} alt="obrazek" />
            </figure>
            <div className="card-body">
              <h1 className="card-title text-4xl">
                Drink name: {cocktail.name}
              </h1>
              <p className="text-2xl">Type: {cocktail.category}</p>
              <p className="text-2xl">Used glass: {cocktail.glass}</p>
            </div>
          </div>
          <div className="mockup-window border bg-primary">
            <div className="flex flex-col justify-center px-4 py-16 bg-base-200">
              <h1 className=" flex text-4xl">Instructions:</h1>
              <div>
                <ul>
                  {cocktail.instructions.map((instruction, id) => {
                    return (
                      <li className="text-2xl" key={id}>
                        - {instruction}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="flex items-center justify-evenly">
                <div className="card w-60 bg-primary shadow-xl m-5">
                  <div className="card-body">
                    <h1 className="text-3xl">Ingridients:</h1>
                    <ul>
                      {cocktail.ingredients.map((ingredient, id) => {
                        return (
                          <li className="text-2xl" key={id}>
                            - {ingredient}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="">
                  <Link to="/">
                    <button className="btn bg-primary">Take me back!</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        {comments && (
          <div className="flex flex-col h-0 mt-10">
            <h1 className="text-4xl">Comments:</h1>
            {comments.length === 0 ? (
              <p>There are no comments yet!</p>
            ) : (
              comments.map((comment, id) => {
                return (
                  <div className="card w-100 bg-primary shadow-xl m-5" key={id}>
                    <div className="card-body">
                      <h1 className="card-title text-4xl">
                        Comment: {comment.comment}
                      </h1>
                      <p className="text-2xl">Author: {comment.author}</p>
                      <p className="text-2xl">Rating: {comment.rating}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CocktailInfo;
