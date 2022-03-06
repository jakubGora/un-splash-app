import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import Searching from "../Searching/Searching";

import "./Home.css";

interface IHomeComponent {
  setSearchContent: React.Dispatch<React.SetStateAction<string>>;
}

const Home = ({ setSearchContent }: IHomeComponent) => {
  const [propos, setPropos] = useState<string[]>([]);
  const [bgPhoto, setBgPhoto] = useState<string | undefined>();
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
          setBgPhoto(result.response.results[0].cover_photo?.urls.full);
          setPropos(
            result.response.results
              .sort((b, a) => a.total_photos - b.total_photos)
              .map((e) => e.title)
          );
        }
      });
  }, []);

  return (
    <div
      style={{
        background: `linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(20, 20, 20, 0.4) 100%
    ), url(${
      bgPhoto
        ? bgPhoto
        : "https://images.unsplash.com/photo-1529686342540-1b43aec0df75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8aXNsYW5kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
    }) `,
      }}
      className="Home"
    >
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
