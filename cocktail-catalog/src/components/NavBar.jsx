import React, { useState, useEffect } from 'react';
import _ from 'underscore';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineClear } from 'react-icons/ai';
import { logoutAdmin, reset } from '../reducers/authSlice';
import { useDispatch } from 'react-redux';

function NavBar(props) {
  const dispatch = useDispatch();
  const { updateCocktails, updateLoadingState, main, admin } = props;
  const [search, setSearch] = useState('');

  const debouncedSearch = _.debounce(async (controller) => {
    updateLoadingState(true);
    try {
      const url = `${process.env.REACT_APP_API_COCKTAILS}search?name=${search}`;
      const res = await fetch(url, {
        signal: controller.signal,
      });
      const data = await res.json();
      updateCocktails(data);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.log(error);
    }
    updateLoadingState(false);
  }, 500);

  useEffect(() => {
    const abortController = new AbortController();
    debouncedSearch(abortController);
    return () => {
      abortController.abort();
    };
    //eslint-disable-next-line
  }, [search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setSearch('');
  };

  const logOut = () => {
    dispatch(logoutAdmin());
    dispatch(reset());
  };

  return (
    <div className="navbar bg-primary flex-none flex-wrap">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl flex-initial ">
          Cocktails
        </a>
        {admin && (
          <>
            <div className="flex-1">
              <a
                href="/add"
                className="btn btn-ghost normal-case text-xl flex-initial "
              >
                Add new cocktail
              </a>
            </div>
          </>
        )}
      </div>
      {main && (
        <div className="flex-none flex max-w-full">
          <input
            type="text"
            placeholder="Search"
            className="form-control flex-auto input input-bordered min-w-0"
            onChange={handleSearchChange}
            value={search}
          />
          <button
            className="btn-ghost btn-circle btn flex-initial shrink-0 mr-3 mx-3"
            onClick={handleSearch}
          >
            <AiOutlineClear size="2.5em" />
          </button>
          {admin && (
            <div className="btn" onClick={logOut}>
              <p className="mr-2">Log Out</p>
              <FiLogOut />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NavBar;
