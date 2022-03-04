import React, { useState } from "react";

import "./Searching.css";
interface ISearchingComponent {
  setSearchContent: React.Dispatch<React.SetStateAction<string>>;
  style?: object;
}
const Searching = ({ setSearchContent, style }: ISearchingComponent) => {
  const searchIco = require("../../img/search.png");
  const [searchText, setSearchText] = useState<string>("");

  const search = () => {
    setSearchContent(searchText);
  };

  return (
    <div style={style} className="Searching">
      <div onClick={() => search()} className="searchBt">
        <img src={searchIco} alt="searchIco" />
      </div>
      <form
        action="submit"
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
      >
        <input
          type="text"
          name="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search free high-resolution photos"
          id="search"
        />
        <input type="submit" value=" " />
      </form>
    </div>
  );
};

export default Searching;
