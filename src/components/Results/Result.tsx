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
}

const Result = ({
  searchContent,
  setSearchContent,
  photosPage,
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
        <PhotosList photosPage={photosPage}></PhotosList>
      </div>
    </div>
  );
};

export default Result;
