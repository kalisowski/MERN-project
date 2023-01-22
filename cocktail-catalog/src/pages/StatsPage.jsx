import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PieChart from '../components/PieChart';

function Stats() {
  const [cocktailStats, setCocktailStats] = useState(null);
  const [commentStats, setCommentStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryChartData, setCategoryChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [commentsChartData, setCommentsChartData] = useState({
    labels: [],
    datasets: [],
  });

  let pendingRequests = 0;

  const getStats = async () => {
    pendingRequests++;
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_STATS + 'count-category'
      );
      setCocktailStats(response.data[0]);

      const sortedCategories = response.data[0].categories.sort(
        (a, b) => b.count - a.count
      );
      const topFiveCategories = sortedCategories.slice(0, 5);
      const otherCategory = {
        category: 'Other',
        count: sortedCategories
          .slice(5)
          .reduce((acc, cur) => acc + cur.count, 0),
      };
      const data = [...topFiveCategories];
      if (otherCategory.count > 0) {
        data.push(otherCategory);
      }
      setCategoryChartData({
        labels: data.map((category) => category.category),
        datasets: [
          {
            label: 'Cocktails in Category',
            data: data.map((category) => category.count),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
          },
        ],
      });
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
      const sortedCocktails = response.data.commentsByCocktail.sort(
        (a, b) => b.count - a.count
      );
      const topFiveCocktails = sortedCocktails.slice(0, 5);
      const otherCocktail = {
        _id: 'Other',
        count: sortedCocktails
          .slice(5)
          .reduce((acc, cur) => acc + cur.count, 0),
      };
      const data = [...topFiveCocktails];
      if (otherCocktail.count > 0) {
        data.push(otherCocktail);
      }
      setCommentsChartData({
        labels: data.map((cocktail) => cocktail._id),
        datasets: [
          {
            label: 'Comments by Cocktail',
            data: data.map((cocktail) => cocktail.count),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
          },
        ],
      });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-row flex-wrap items-center justify-center h-screen">
      <div className="basis-full flex items-center justify-center">
        <h1 className="text-6xl font-bold">Stats:</h1>
      </div>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        <div className="text-red-500">{error.message}</div>
      ) : cocktailStats.categories && commentStats ? (
        <div className="mockup-window border bg-base-300">
          <div className="flex flex-col justify-center px-4 py-10 bg-neutral">
            <div className="flex flex-row justify-center">
              <div className="stats shadow-xl ml-10 my-5">
                <div className="stat">
                  <div className="stat-title">Total cocktails in database:</div>
                  <div className="stat-value">
                    {cocktailStats.total} cocktails
                  </div>
                </div>
              </div>
              <div className="stats shadow-xl ml-2 my-5">
                <div className="stat">
                  <div className="stat-title">Total comments in database:</div>
                  <div className="stat-value">
                    {commentStats.totalComments[0].count} comments
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-evenly">
              <div className="flex">
                <div className="overflow-y-auto h-80 w-96">
                  <table className="table">
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
                <div className="overflow-y-auto h-80 w-96 ml-2">
                  <table className="table">
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
      <div>
        <div className="w-80">
          <center>
            <h1 className="text-4xl font-bold mx-5">Category chart:</h1>
          </center>
          <PieChart chartData={categoryChartData} />
        </div>
        <div className="w-80 mt-10">
          <center>
            <h1 className="text-4xl font-bold mx-5">Comment chart:</h1>
          </center>
          <PieChart chartData={commentsChartData} />
        </div>
      </div>
      <div className="ml-5">
        <Link to="/">
          <button className="btn bg-primary">Take me back!</button>
        </Link>
      </div>
    </div>
  );
}

export default Stats;
