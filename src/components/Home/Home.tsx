import React from "react";
import Searching from "../Searching/Searching";

import "./Home.css";

interface IHomeComponent {
  setSearchContent: React.Dispatch<React.SetStateAction<string>>;
}

const Home = ({ setSearchContent }: IHomeComponent) => {
  return (
    <div className="Home">
      <div className="content">
        <h1>Unsplash</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt
          mollitia consectetur qui dignissimos a asperiores?
        </p>
        <Searching setSearchContent={setSearchContent}></Searching>
        <p>Trending: flower, walpaper...</p>
      </div>
    </div>
  );
};

export default Home;
