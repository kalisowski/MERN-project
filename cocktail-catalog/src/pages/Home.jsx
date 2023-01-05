import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Card from '../components/shared/Card';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../reducers/authSlice';

function Home() {
  const url = `${process.env.REACT_APP_API_COCKTAILS}`;
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const adminstate = localStorage.getItem('user');
    console.log(adminstate);
    if (adminstate) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [user]);

  const getCocktails = async (controller) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        signal: controller.signal,
      });
      const data = await response.json();
      setCocktails(data.cocktails);
      setLoading(false);
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
    // wyłączenie irytującego ostrzeżenia o braku zależności w tablicy
    //eslint-disable-next-line
  }, []);

  const updateCocktails = (newCocktails) => {
    setCocktails(newCocktails);
  };

  const updateLoadingState = (newLoadingState) => {
    setLoading(newLoadingState);
  };

  return (
    <div>
      <NavBar
        updateCocktails={updateCocktails}
        getCocktails={getCocktails}
        updateLoadingState={updateLoadingState}
        main={true}
        admin={admin}
      />
      {loading ? (
        <div className="flex items-center justify-center h-screen text-3xl font-bold">
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          {cocktails.length === 0 ? (
            <div className="flex items-center justify-center h-screen text-3xl font-bold">
              There are no cocktails to display
            </div>
          ) : (
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
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
