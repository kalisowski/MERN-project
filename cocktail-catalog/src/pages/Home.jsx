import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Card from '../components/shared/Card';

function Home() {
  const url = `${process.env.REACT_APP_API_COCKTAILS}`;
  const [cocktails, setCocktails] = useState([]);

  const getCocktails = async (controller) => {
    try {
      const response = await fetch(url, {
        signal: controller.signal,
      });
      const data = await response.json();
      setCocktails(data.cocktails);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.log(error);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    getCocktails(abortController);
    return () => {
      abortController.abort();
    };
    // eslint disable next line is used to disable the warning that useEffect is missing a dependency
    //eslint-disable-next-line
  }, []);

  const updateCocktails = (newCocktails) => {
    setCocktails(newCocktails);
  };

  return (
    <div>
      <NavBar updateCocktails={updateCocktails} getCocktails={getCocktails} />
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 m-10 justify-self-center justify-items-center">
        {cocktails.map((cocktail) => {
          return (
            <Card
              key={cocktail._id}
              id={cocktail._id}
              name={cocktail.name}
              image={cocktail.image}
              category={cocktail.category}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
