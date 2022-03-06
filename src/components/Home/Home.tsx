import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import Searching from "../Searching/Searching";

import "./Home.css";

interface IHomeComponent {
  setSearchContent: React.Dispatch<React.SetStateAction<string>>;
}

const Home = ({ setSearchContent }: IHomeComponent) => {
  const [propos, setPropos] = useState<string[]>([]);
  const unsplash = createApi({
    accessKey: "O2KidtvrQddWvNnlKqOsytn-2Qe0kL5IjL5PL70vYDU",
  });
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
    <div className="Home">
      <div className="content">
        <h1>Unsplash</h1>
        <p>
          The internet's source of freely-usable images. <br />
          Powered by creators everywhere.
        </p>
        <Searching setSearchContent={setSearchContent}></Searching>
        <p>
          Trending:{" "}
          {propos.map((e, i) =>
            i < 5 ? (
              <span key={i} onClick={() => setSearchContent(e)}>
                {e + ", "}
              </span>
            ) : (
              ""
            )
          )}
        </p>
      </div>
    </div>
  );
};

export default Home;
