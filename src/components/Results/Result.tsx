import React from "react";
import { Photos } from "unsplash-js/dist/methods/search/types/response";
import Searching from "../Searching/Searching";
import PhotosList from "./PhotosList/PhotosList";
import ProposList from "./ProposList/ProposList";

import "./Result.css";

interface IResultComponent {
  searchContent: string;
  setSearchContent: React.Dispatch<React.SetStateAction<string>>;
  photosPage?: Photos;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  totalPages: number;
}

const Result = ({
  searchContent,
  setSearchContent,
  photosPage,
  setPage,
  page,
  totalPages,
}: IResultComponent) => {
  const style = {
    backgroundColor: "#dedede",
    borderRadius: "2rem",
    height: "2.5rem",
    width: "80%",
  };

  const upperFirstLetter = (str: string) => {
    return str.replace(str[0], str[0].toUpperCase());
  };

  return (
    <div className="Result">
      <Searching setSearchContent={setSearchContent} style={style}></Searching>
      <div className="content">
        <h1>{upperFirstLetter(searchContent)}</h1>
        <ProposList setSearchContent={setSearchContent}></ProposList>
        <PhotosList
          setSearchContent={setSearchContent}
          photosPage={photosPage}
        ></PhotosList>
      </div>
      <div className="sitesNr">
        <button
          onClick={() => {
            setPage((e) => (e > 1 ? e - 1 : e));
          }}
        >
          {"<"}
        </button>
        <div className="num">
          {page ? page : 1}/{totalPages}
        </div>
        <button
          onClick={() => {
            setPage((e) => (e < totalPages ? e + 1 : e));
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Result;
