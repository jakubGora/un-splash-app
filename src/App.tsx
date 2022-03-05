import React, { useEffect, useState } from "react";

import "./App.css";
import Home from "./components/Home/Home";
import Result from "./components/Results/Result";
import { IPhoto } from "./components/Interfaces/Interfaces";
import { createApi } from "unsplash-js";
import { Photos } from "unsplash-js/dist/methods/search/types/response";

function App() {
  const [searchContent, setSearchContent] = useState<string>("");
  const [photosPage, setPhotosPage] = useState<Photos>();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const unsplash = createApi({
    accessKey: "O2KidtvrQddWvNnlKqOsytn-2Qe0kL5IjL5PL70vYDU",
  });

  useEffect(() => {
    unsplash.search
      .getPhotos({
        query: searchContent,
        page: page,
        perPage: 10,
        color: "green",
        orientation: "portrait",
      })
      .then((result) => {
        if (result.errors) {
          // handle error here
          console.log("error occurred: ", result.errors[0]);
        } else {
          setPhotosPage(result.response);
          const photo = result.response;
          setTotalPages(photo.total_pages);
        }
      });
  }, [searchContent, page]);
  useEffect(() => {
    setPage(1);
    window.scrollTo(0, 0);
  }, [searchContent]);

  return (
    <div className="App">
      {!searchContent ? (
        <Home setSearchContent={setSearchContent}></Home>
      ) : (
        <Result
          searchContent={searchContent}
          setSearchContent={setSearchContent}
          photosPage={photosPage}
          setPage={setPage}
          page={page}
          totalPages={totalPages}
        ></Result>
      )}
    </div>
  );
}

export default App;
