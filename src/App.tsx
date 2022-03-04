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
  const unsplash = createApi({
    accessKey: "O2KidtvrQddWvNnlKqOsytn-2Qe0kL5IjL5PL70vYDU",
  });

  useEffect(() => {
    unsplash.search
      .getPhotos({
        query: searchContent,
        page: 1,
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
          console.log(photo);
        }
      });
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
        ></Result>
      )}
    </div>
  );
}

export default App;
