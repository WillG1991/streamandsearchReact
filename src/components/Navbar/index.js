import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/saved-movies">Saved Movies</Link> {/* add link to SavedMovies page */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
