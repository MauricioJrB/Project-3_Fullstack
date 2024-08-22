import React from "react";

import "./AnimesItem.scss";

const AnimesItem = ({ animeData }) => {
  if (!animeData) {
    return <p>Aparecerá aqui...</p>;
  }

  return (
    <div className="animes-item">
      <ul className="list-item">
        <li><p>Personagem: {animeData.character}</p></li>
        <li><p>Anime: {animeData.anime}</p></li>
        <li><p>Citação: {animeData.quote}</p></li>
      </ul>
    </div>
  );
};

export default AnimesItem;
