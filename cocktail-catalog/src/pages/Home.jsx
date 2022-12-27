import React, { useState, useEffect } from 'react';
// import Form from './components/Form';
import NavBar from '../components/NavBar';
import Card from '../components/shared/Card';

function Home() {
  const [cocktails, setCocktails] = useState([]);

  const getCocktails = async () => {
    const response = await fetch('http://localhost:5000/api/cocktails');
    const data = await response.json();
    setCocktails(data.cocktails);
  };

  useEffect(() => {
    getCocktails();
  }, []);

  return (
    <div>
      <NavBar />
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
      {/* <Form /> */}
    </div>
  );
}

export default Home;
