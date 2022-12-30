import React, { useState, useEffect } from 'react';
import SearchSvg from './assets/Search.jsx';
import _ from 'underscore';

function NavBar(props) {
  const { updateCocktails, updateLoadingState } = props;
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

  return (
    <div className="navbar bg-primary flex-none flex-wrap">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl flex-initial ">
          Cocktails
        </a>
      </div>
      <div className="flex-none gap-2 flex max-w-full">
        <input
          type="text"
          placeholder="Search"
          className="form-control flex-auto input input-bordered min-w-0"
          onChange={handleSearchChange}
          value={search}
        />
        <button
          className="btn-ghost btn-circle btn flex-initial shrink-0 mr-5 mx-3"
          onClick={handleSearch}
        >
          <SearchSvg />
        </button>
      </div>
    </div>
  );
}

export default NavBar;
