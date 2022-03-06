import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";

import "./Searching.css";
interface ISearchingComponent {
  setSearchContent: React.Dispatch<React.SetStateAction<string>>;
  style?: object;
}
const Searching = ({ setSearchContent, style }: ISearchingComponent) => {
  const searchIco = require("../../img/search.png");
  const [searchText, setSearchText] = useState<string>("");
  const [photoSet, setPhotoSet] = useState<string[]>([]);
  const [helpBarActive, setHelpBarActive] = useState<boolean>(false);
  const closeIco = require("../../img/close.png");
  const unsplash = createApi({
    accessKey: "O2KidtvrQddWvNnlKqOsytn-2Qe0kL5IjL5PL70vYDU",
  });
  function search() {
    setSearchContent(searchText);
  }

  useEffect(() => {
    if (searchText.length >= 3)
      unsplash.search
        .getCollections({
          query: searchText,
          page: 1,
          perPage: 50,
        })
        .then((result) => {
          if (result.errors) {
            // handle error here
            console.log("error occurred: ", result.errors[0]);
          } else {
            const photo = result.response.results
              .map((e) => {
                if (
                  e.title
                    .toLocaleLowerCase()
                    .includes(searchText.toLocaleLowerCase())
                )
                  return e.title.toLocaleLowerCase();
                else {
                  return "";
                }
              })
              .filter(
                (e) =>
                  e && e.toLocaleLowerCase() !== searchText.toLocaleLowerCase()
              )
              .sort((a, b) => a.length - b.length);
            const photoSet = new Set(photo);
            let array = Array.from(photoSet);
            setPhotoSet(array);
          }
        });
  }, [searchText]);

  return (
    <div
      onBlur={() => setTimeout(() => setHelpBarActive(false), 300)}
      style={style}
      className="Searching"
    >
      <form
        action="submit"
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
      >
        <div onClick={() => search()} className="searchBt">
          <img src={searchIco} alt="searchIco" />
        </div>
        <input
          type="text"
          name="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search free high-resolution photos"
          id="search"
          autoComplete="off"
          autoFocus
          onFocus={() => setHelpBarActive(true)}
        />

        <input type="submit" value="" />
        {searchText ? (
          <button onClick={() => setSearchText("")}>
            <img src={closeIco} alt="closeIco" />
          </button>
        ) : (
          ""
        )}
      </form>
      <div className="help">
        {helpBarActive && searchText.length >= 3
          ? photoSet.map((e, i) =>
              i < 5 ? (
                <div
                  key={i}
                  className="helpElem"
                  onClick={() => {
                    setSearchText(e);
                    setSearchContent(e);
                  }}
                >
                  {e}
                </div>
              ) : (
                ""
              )
            )
          : ""}
        {helpBarActive && searchText.length >= 3 && photoSet.length === 0 ? (
          <div className="helpElemNull">Brak podpowiedzi :(</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Searching;
