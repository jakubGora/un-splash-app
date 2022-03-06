import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import { Full } from "unsplash-js/dist/methods/photos/types";

import "./PhotoDetails.css";

interface IPhotoDetailsComponent {
  currentPhotoId: string;
  setCurrentPhotoId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const PhotoDetails = ({
  currentPhotoId,
  setCurrentPhotoId,
}: IPhotoDetailsComponent) => {
  const [details, setDetails] = useState<Full>();
  const [zoom, setZoom] = useState<boolean>(false);
  const monthNames = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];
  const likeIco = require("../../../img/like.png");
  const plusIco = require("../../../img/plus (2).png");
  const localIco = require("../../../img/tool.png");
  const infoIco = require("../../../img/info.png");
  const shareIco = require("../../../img/share.png");
  const closeIco = require("../../../img/close.png");
  const calendarIco = require("../../../img/calendar.png");
  const unsplash = createApi({
    accessKey: "O2KidtvrQddWvNnlKqOsytn-2Qe0kL5IjL5PL70vYDU",
  });

  const getDateFormat = (date: string | undefined) => {
    if (date) {
      const dat = new Date(date);
      return monthNames[dat.getMonth() - 1] + " " + dat.getFullYear();
    }
  };

  useEffect(() => {
    unsplash.photos.get({ photoId: currentPhotoId }).then((result) => {
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
      <div>
        <div className="content">
          <div className="top">
            <div className="user">
              <img src={details?.user.profile_image.small} alt="img" />
              <div>
                <h2>{details?.user.name}</h2>
                <p>@{details?.user.username}</p>
              </div>
            </div>
            <div className="buttonsTop">
              <button>
                <img src={likeIco} alt="like" />
              </button>
              <button>
                <img src={plusIco} alt="plus" />
              </button>
            </div>
          </div>

          <div
            style={{
              backgroundImage: `url(${details?.urls.full})`,
              backgroundSize: `${zoom ? "cover" : "contain"}`,
              cursor: `${zoom ? "zoom-out" : "zoom-in"}`,
            }}
            onClick={() => setZoom(!zoom)}
            className="photo"
          ></div>

          <div className="bottom">
            <div className="loc">
              <div>
                <img src={localIco} alt="info" />
                <p>
                  {details?.location.name
                    ? details?.location.name
                    : "Brak informacji"}
                </p>
              </div>
              <div>
                <img src={calendarIco} alt="info" />
                <p>
                  {" "}
                  {details?.created_at
                    ? getDateFormat(details?.created_at)
                    : "Brak informacji"}
                </p>
              </div>
            </div>
            <div className="buttonsBottom">
              <button>
                <img src={shareIco} alt="share" />
                Share
              </button>
              <button>
                <img src={infoIco} alt="info" />
                Info
              </button>
            </div>
          </div>
        </div>

        <button onClick={() => setCurrentPhotoId(undefined)} className="X">
          <img src={closeIco} alt="info" />
        </button>
      </div>
    </div>
  );
};

export default PhotoDetails;
