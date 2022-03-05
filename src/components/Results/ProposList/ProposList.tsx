import React from "react";

import "./ProposList.css";

interface IProposListComponent {
  setSearchContent: React.Dispatch<React.SetStateAction<string>>;
  propos: string[];
}

const ProposList = ({ propos, setSearchContent }: IProposListComponent) => {
  return (
    <div className="ProposList">
      {propos.map((elem) => (
        <div onClick={() => setSearchContent(elem)} className="propo">
          {elem}
        </div>
      ))}
    </div>
  );
};

export default ProposList;
