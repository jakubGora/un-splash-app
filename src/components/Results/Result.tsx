import React, { useEffect, useState } from "react";
import { Photos } from "unsplash-js/dist/methods/search/types/response";
import Searching from "../Searching/Searching";
import PhotoDetails from "./PhotoDetails/PhotoDetails";
import PhotosList from "./PhotosList/PhotosList";
import ProposList from "./ProposList/ProposList";
import { unsplash } from "../../API/Unsplash";
import "./Result.css";

interface IResultComponent {
  searchContent: string;
  setSearchContent: React.Dispatch<React.SetStateAction<string>>;
  photosPage?: Photos;
  setCurrentPageNr: React.Dispatch<React.SetStateAction<number>>;
  currentPageNr: number;
  totalPages: number;
}

const Result = ({
  searchContent,
  setSearchContent,
  photosPage,
  setCurrentPageNr,
  currentPageNr,
  totalPages,
}: IResultComponent) => {
  const [propos, setPropos] = useState<string[]>([]);
  const [currentPhotoId, setCurrentPhotoId] = useState<string>();
  const styleSearching = {
    backgroundColor: "#dedede",
    borderRadius: "2rem",
    height: "2.5rem",
    width: "80%",
  };

  const upperFirstLetter = (str: string) => {
    return str.replace(str[0], str[0].toUpperCase());
  };

  useEffect(() => {
    unsplash.topics
      .list({
        page: 1,
        perPage: 12,
      })
      .then((result) => {
        if (!result.errors) {
          setPropos(
            result.response.results
              .sort((b, a) => a.total_photos - b.total_photos)
              .map((e) => e.title)
          );
        }
      });
  }, []);

  return (
    <div className="Result">
      {currentPhotoId ? (
        <PhotoDetails
          currentPhotoId={currentPhotoId}
          setCurrentPhotoId={setCurrentPhotoId}
        ></PhotoDetails>
      ) : null}
      <Searching
        setSearchContent={setSearchContent}
        style={styleSearching}
      ></Searching>
      <div className="content">
        <h1>{upperFirstLetter(searchContent)}</h1>
        <ProposList
          propos={propos}
          setSearchContent={setSearchContent}
        ></ProposList>
        <PhotosList
          setSearchContent={setSearchContent}
          photosPage={photosPage}
          setCurrentPhotoId={setCurrentPhotoId}
        ></PhotosList>
      </div>
      <div className="sitesNr">
        <button
          onClick={() => {
            setCurrentPageNr((e) => (e > 1 ? e - 1 : e));
          }}
        >
          {"<"}
        </button>
        <div className="num">
          {currentPageNr ? currentPageNr : 1}/{totalPages}
        </div>
        <button
          onClick={() => {
            setCurrentPageNr((e) => (e < totalPages ? e + 1 : e));
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Result;
