import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import { Full } from "unsplash-js/dist/methods/photos/types";

import "./PhotoDetails.css";

interface IPhotoDetailsComponent {
  currentPhotoId: string | undefined;
}

const PhotoDetails = ({ currentPhotoId }: IPhotoDetailsComponent) => {
  const [details, setDetails] = useState<Full>();

  const unsplash = createApi({
    accessKey: "O2KidtvrQddWvNnlKqOsytn-2Qe0kL5IjL5PL70vYDU",
  });

  useEffect(() => {
    unsplash.photos.get({ photoId: "mtNweauBsMQ" }).then((result) => {
      if (result.errors) {
        // handle error here
      } else {
        console.log(result.response);
        setDetails(result.response);
      }
    });
  }, [currentPhotoId]);

  return (
    <div className="PhotoDetails">
      <button>{"<"}</button>
      <div className="content">
        <div className="top">
          <div className="user">
            <img src={details?.user.profile_image.small} alt="img" />
            <div>
              <h2>{details?.user.name}</h2>
              <p>{details?.user.twitter_username}</p>
            </div>
          </div>
          <div className="buttonsTop">
            <button>Like</button>
            <button>Add</button>
          </div>
        </div>

        <div className="photo">
          <img src={details?.urls.full} alt="photo" />
        </div>

        <div className="bottom">
          <div className="loc">
            {details?.location.city ? details?.location.city + ", " : ""}
            {details?.location.country}
          </div>
          <div className="buttonsBottom">
            <button>Share</button>
            <button>Info</button>
          </div>
        </div>
      </div>
      <button>{">"}</button>
    </div>
  );
};

export default PhotoDetails;
