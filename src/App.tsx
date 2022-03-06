import React, { useEffect, useState } from "react";
import { unsplash } from "./API/Unsplash";
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

  useEffect(() => {
    window.scrollTo(0, 0);
    unsplash.search
      .getPhotos({
        query: searchContent,
        page: page,
        perPage: 10,
      })
      .then((result) => {
        if (!result.errors) {
          setPhotosPage(result.response);
          const photo = result.response;
          setTotalPages(photo.total_pages);
        }
      });
  }, [searchContent, page]);

  useEffect(() => {
    setPage(1);
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
