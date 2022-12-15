import React from 'react';
import { useState } from 'react';
import SearchSvg from './assets/Search.jsx';
function NavBar() {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    console.log(search);
    setSearch('');
  };

  const handleSeachChange = (e) => {
    setSearch(e.target.value);
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
          onChange={handleSeachChange}
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
