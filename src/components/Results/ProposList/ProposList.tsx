import React from "react";

import "./ProposList.css";

interface IProposListComponent {
  setSearchContent: React.Dispatch<React.SetStateAction<string>>;
}

const ProposList = ({ setSearchContent }: IProposListComponent) => {
  return (
    <div className="ProposList">
      <div className="propo">Island</div>
      <div className="propo">Beach</div>
      <div className="propo">Sky</div>
      <div className="propo">Tropical</div>
      <div className="propo">Sea</div>
    </div>
  );
};

export default ProposList;
