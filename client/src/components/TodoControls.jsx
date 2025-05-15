import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const TodoControls = ({
  titleSearch,
  setTitleSearch,
  descSearch,
  setDescSearch,
  sortOrder,
  toggleSortOrder,
}) => {
  const [showSearch, setShowSearch] = useState(false);

  const handleToggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  return (
    <div className="controls">
      <div className="controls-buttons">
        <button onClick={handleToggleSearch} className="search-toggle-btn">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        </button>

        <button onClick={toggleSortOrder} className="sort-btn">
          Sort by Due Date (
          {sortOrder === "asc" ? "Oldest First" : "Newest First"})
          <FontAwesomeIcon icon={faSort} className="icon-spacing" />
        </button>
      </div>

      {showSearch && (
        <>
          <input
            type="text"
            placeholder="Search by title..."
            value={titleSearch}
            onChange={(e) => setTitleSearch(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Search by description..."
            value={descSearch}
            onChange={(e) => setDescSearch(e.target.value)}
            className="search-input"
          />
        </>
      )}
    </div>
  );
};
