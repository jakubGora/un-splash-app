import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import { Basic } from "unsplash-js/dist/methods/collections/types";

import { unsplash } from "../../API/Unsplash";
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

  const mapFilterSort = (result: Basic[]) => {
    let date = result
      .map((e) =>
        e.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
          ? e.title.toLocaleLowerCase()
          : ""
      )
      .filter(
        (e) => e && e.toLocaleLowerCase() !== searchText.toLocaleLowerCase()
      )
      .sort((a, b) => a.length - b.length);

    let setData = new Set(date);
    let arrayData = Array.from(setData);
    return arrayData;
  };

  useEffect(() => {
    if (searchText.length >= 3)
      unsplash.search
        .getCollections({
          query: searchText,
          page: 1,
          perPage: 50,
        })
        .then((result) => {
          if (!result.errors) {
            const photos = mapFilterSort(result.response.results);
            setPhotoSet(photos);
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
          setSearchContent(searchText);
        }}
      >
        <div onClick={() => setSearchContent(searchText)} className="searchBt">
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
