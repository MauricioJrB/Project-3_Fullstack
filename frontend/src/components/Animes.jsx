import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { useAlert } from "react-alert";

import "./Animes.scss";

import GetAnime from "./GetAnime";
import AnimesItem from "./AnimesItem";

const Animes = () => {
  const [animes, setAnimes] = useState([]);

  const alert = useAlert();

  const fetchAnimes = useCallback( async (character) => {
    try {
      const {data} = await axios.get(`https://animechan.xyz/api/quotes/character?name=${character}`);

      setAnimes(data);

      alert.success("Encontrado com sucesso!");

    } catch (_error) {
      alert.error("Não foi possível recuperar o personagem.");
    }
  }, [alert]);

  const animeData = useMemo(() => {
    if (!animes || animes.length === 0) return [];
    return {
      character: animes[0].character,
      anime: animes[0].anime,
      quotes: animes.map(quote => quote.quote)
    };
  }, [animes]);
  
  useEffect(() => {
    fetchAnimes();
  }, [fetchAnimes]);

  return (
    <div className="animes-container">
      <h1>Anime Facts API</h1>
      <h2>Busque frases aleatórias de seu personagem de anime favorito!</h2>
      <GetAnime fetchAnimes={fetchAnimes}  />
      <AnimesItem animeData={animeData} />
    </div>
  );
};

export default Animes;
