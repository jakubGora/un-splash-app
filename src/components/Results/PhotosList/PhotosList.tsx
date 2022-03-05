import React, { useEffect, useState } from "react";
import { Photos } from "unsplash-js/dist/methods/search/types/response";
import { Basic } from "unsplash-js/dist/methods/users/types";
import { IPhoto, ITag } from "../../Interfaces/Interfaces";

import "./PhotosList.css";

interface IPhotosListComponent {
  photosPage?: Photos;
  setSearchContent: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPhotoId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const PhotosList = ({
  photosPage,
  setSearchContent,
  setCurrentPhotoId,
}: IPhotosListComponent) => {
  return (
    <div className="PhotosList">
      {photosPage?.results.map((photo) => (
        <div key={photo.id} className="photoElem">
          <img
            onClick={() => setCurrentPhotoId(photo.id)}
            src={photo.urls.regular}
            alt={photo.id}
          />

          <div className="tags">
            {photo.tags.map((e: ITag, i) => (
              <div
                onClick={() => setSearchContent(e.title)}
                key={i}
                className="tag"
              >
                {e.title.includes(" ")
                  ? e.title.substring(0, e.title.indexOf(" "))
                  : e.title}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotosList;
