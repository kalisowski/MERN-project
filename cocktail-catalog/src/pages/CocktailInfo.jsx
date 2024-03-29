import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AddComment from '../components/AddComment';

function CocktailInfo() {
  const [rating, setRating] = useState(0);
  const [cocktail, setCocktail] = useState();
  const [comments, setComments] = useState();
  const adminstate = localStorage.getItem('user');
  const { id } = useParams();

  let navigate = useNavigate();
  const handleClick = (e) => {
    navigate(`${e}`);
  };

  useEffect(() => {
    getCocktail();
    getComments();
    getRating();
    //eslint-disable-next-line
  }, []);

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

  //function deleting the comment
  const deleteComment = async (commentid) => {
    const url = `${process.env.REACT_APP_API_COMMENTS}` + id + '/' + commentid;
    axios.delete(url).then((res) => {
      toast.success('Comment deleted!');
      setComments(res.data);
    });
  };

  const getRating = () => {
    const url = `${process.env.REACT_APP_API_RATING}/${id}`;
    axios.get(url).then((res) => {
      setRating(res.data);
    });
  };

  const addRating = async (rating) => {
    axios.defaults.withCredentials = true;
    const url = `${process.env.REACT_APP_API_RATING}` + id;
    axios
      .post(url, {
        rating: rating,
      })
      .then((res) => {
        toast.success('Rating added!');
        setRating(res.data.rating);
      })
      .catch((err) => {
        toast.error('You are rating too often!');
      });
  };

  return (
    <div className="flex flex-col items-center justify-center">
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
                <div className="card w-96 bg-primary shadow-xl m-5">
                  <div className="card-body">
                    <h1 className="text-3xl">Ingredients:</h1>
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
                <div>
                  <center>
                    <p className="mb-3">Average rating: {rating.toFixed(2)}</p>
                  </center>

                  <div className="rating rating-lg">
                    <input
                      type="radio"
                      name="rating-8"
                      className="mask mask-star-2 bg-orange-400"
                      selected
                      onClick={() => {
                        addRating(1);
                      }}
                    />
                    <input
                      type="radio"
                      name="rating-8"
                      className="mask mask-star-2 bg-orange-400"
                      onClick={() => {
                        addRating(2);
                      }}
                    />
                    <input
                      type="radio"
                      name="rating-8"
                      className="mask mask-star-2 bg-orange-400"
                      onClick={() => {
                        addRating(3);
                      }}
                    />
                    <input
                      type="radio"
                      name="rating-8"
                      className="mask mask-star-2 bg-orange-400"
                      onClick={() => {
                        addRating(4);
                      }}
                    />
                    <input
                      type="radio"
                      name="rating-8"
                      className="mask mask-star-2 bg-orange-400"
                      onClick={() => {
                        addRating(5);
                      }}
                    />
                  </div>
                </div>

                <div className="d-flex"></div>
                <div>
                  <Link to="/">
                    <button className="btn bg-primary">Take me back!</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {comments && (
        <div className="card flex items-center flex-col w-1/2 bg-neutral mt-10 p-10">
          <center>
            <AddComment id={id} setComments={setComments} />
            <h1 className="text-4xl mt-5">Comments:</h1>
          </center>
          {comments.length === 0 ? (
            <p>There are no comments yet!</p>
          ) : (
            comments.map((comment, id) => {
              return (
                <div className="flex" key={id}>
                  <div className="card w-96 bg-primary shadow-xl m-5">
                    <div className="card-body">
                      <h1 className="card-title text-xl">
                        Comment: {comment.comment}
                      </h1>
                      <p className="text-l">Author: {comment.author}</p>
                      <p className="p-2 text-l bg-neutral">{comment.text}</p>
                    </div>
                  </div>
                  <div className="h-max ">
                    {adminstate && (
                      <div className="flex flex-col mt-5">
                        <div
                          className="btn btn-error mt-5"
                          onClick={() => deleteComment(comment._id)}
                        >
                          Delete
                        </div>
                        <div
                          className="btn btn-accent mt-5"
                          onClick={() => handleClick(comment._id)}
                        >
                          Edit
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default CocktailInfo;
