import React from "react";

import "./AnimesItem.scss";

const AnimesItem = ({ animeData }) => {
 
  if (!animeData || animeData.length === 0) {
    return <p>Aparecerá aqui...</p>
  }
  return (
    <div className="animes-item">
      <ul className="list-item">
        <li><p>Personagem: {animeData.character}</p></li>
        <li><p>Anime: {animeData.anime}</p></li>
        {animeData.quotes.map((quote, index) => (
          <li key={index}>
            <p> Citação {index + 1} - {quote}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimesItem;
