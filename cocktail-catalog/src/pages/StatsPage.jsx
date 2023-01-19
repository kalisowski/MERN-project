import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Stats() {
  const [cocktailStats, setCocktailStats] = useState(null);
  const [commentStats, setCommentStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  let pendingRequests = 0;

  const getStats = async () => {
    pendingRequests++;
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_STATS + 'count-category'
      );
      setCocktailStats(response.data[0]);
    } catch (error) {
      setError(error);
    } finally {
      pendingRequests--;
      if (pendingRequests === 0) {
        setIsLoading(false);
      }
    }
  };

  const getCommentStats = async () => {
    pendingRequests++;
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_STATS + 'count-comments'
      );
      setCommentStats(response.data);
    } catch (error) {
      setError(error);
    } finally {
      pendingRequests--;
      if (pendingRequests === 0) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getStats();
    getCommentStats();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold my-5">Stats:</h1>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        <div className="text-red-500">{error.message}</div>
      ) : cocktailStats.categories && commentStats ? (
        <div className="mockup-window border bg-base-300 w-1/3">
          <div className="flex flex-col justify-center px-4 py-16 bg-neutral">
            <div className="flex flex-row justify-center">
              <div className="stats shadow-xl m-5">
                <div className="stat">
                  <div className="stat-title">Total cocktails in database:</div>
                  <div className="stat-value">
                    {cocktailStats.total} cocktails
                  </div>
                </div>
              </div>
              <div className="stats shadow-xl m-5">
                <div className="stat">
                  <div className="stat-title">Total comments in database:</div>
                  <div className="stat-value">
                    {commentStats.totalComments[0].count} comments
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-evenly">
              <div className="overflow-x-auto">
                <div className="overflow-x-auto shadow-xl mt-5">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>Comments:</th>
                        <th>Cocktail Name</th>
                        <th>Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commentStats.commentsByCocktail.map((stat, index) => (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>{stat._id}</td>
                          <td>{stat.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <table className="table w-full mt-10">
                    <thead>
                      <tr>
                        <th>Categories:</th>
                        <th>Category</th>
                        <th>Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cocktailStats.categories.map((stat, index) => (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>{stat.category}</td>
                          <td>{stat.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        'No stats yet'
      )}
      <div className="mt-5">
        <Link to="/">
          <button className="btn bg-primary">Take me back!</button>
        </Link>
      </div>
    </div>
  );
}

export default Stats;
