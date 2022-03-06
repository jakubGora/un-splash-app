import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import { Photos } from "unsplash-js/dist/methods/search/types/response";
import Searching from "../Searching/Searching";
import PhotoDetails from "./PhotoDetails/PhotoDetails";
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
  const [propos, setPropos] = useState<string[]>([]);
  const [currentPhotoId, setCurrentPhotoId] = useState<string>();
  const styleSearching = {
    backgroundColor: "#dedede",
    borderRadius: "2rem",
    height: "2.5rem",
    width: "80%",
  };
  const unsplash = createApi({
    accessKey: "O2KidtvrQddWvNnlKqOsytn-2Qe0kL5IjL5PL70vYDU",
  });
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
        if (result.errors) {
          // handle error here
        } else {
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
