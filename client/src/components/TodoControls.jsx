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
        <button
          onClick={handleToggleSearch}
          className="search-toggle-btn"
          aria-label="Toggle Search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>

        <button
          onClick={toggleSortOrder}
          className="sort-btn"
          aria-label="Toggle Sort Order">
          Sort by Due Date (
          {sortOrder === "asc" ? "Oldest First" : "Newest First"})
          <FontAwesomeIcon icon={faSort} style={{ marginLeft: "6px" }} />
        </button>
      </div>

      {showSearch && (
        <div className="search-inputs" style={{ marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Search by title..."
            value={titleSearch}
            onChange={(e) => setTitleSearch(e.target.value)}
            className="search-input"
            aria-label="Search by title"
          />
          <input
            type="text"
            placeholder="Search by description..."
            value={descSearch}
            onChange={(e) => setDescSearch(e.target.value)}
            className="search-input"
            aria-label="Search by description"
            style={{ marginLeft: "8px" }}
          />
        </div>
      )}
    </div>
  );
};
