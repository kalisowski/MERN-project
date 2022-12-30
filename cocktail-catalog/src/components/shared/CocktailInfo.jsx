import React, { useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function CocktailInfo() {
  const [cocktail, setCocktail] = useState();
  const { id } = useParams();

  const getCocktail = () => {
    const url = `${process.env.REACT_APP_API_COCKTAILS}/cocktail/${id}`;
    axios.get(url).then((res) => {
      setCocktail(res.data);
    });
  };

  getCocktail();

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
              <h1 className="text-4xl">Instructions:</h1>
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
                  <button className="btn bg-primary">
                    <Link to="/">Take me back!</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CocktailInfo;
