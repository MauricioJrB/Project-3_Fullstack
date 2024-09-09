import { useEffect, useState, useCallback, useMemo, useContext } from "react";
import { useAlert } from "react-alert";
import GetAnime from "./GetAnime";
import AnimesItem from "./AnimesItem";
import AddAnime from "./AddAnime";
import { AuthContext } from "../contexts/UserContext";
import axios from 'axios';

import "./Animes.scss";

const Animes = () => {
  const [animes, setAnimes] = useState([]);

  const alert = useAlert();
  const { authToken } = useContext(AuthContext);

  const fetchAnimes = useCallback( async (character) => {
    try {
      const { data } = await axios.get(`https://localhost:3001/api/animes/${character}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      console.log("Get do anime", data)

      setAnimes(data.anime);

      alert.success("Encontrado com sucesso!");

    } catch (_error) {
      alert.error("Não foi possível recuperar o personagem.");
    }
  }, [alert, authToken]);

  const animeData = useMemo(() => {
    if (!animes || animes.length === 0) return { character: "", anime: "", quote: [] };
    const firstAnime = animes[0];
    return {
      character: firstAnime.character || "",
      anime: firstAnime.anime || "",
      quote: firstAnime.quote || "" 
    };
  }, [animes]);
  
  useEffect(() => {
    fetchAnimes();
  }, [fetchAnimes]);

  return (
    <div className="animes-container">
      <h1>Anime Facts API</h1>
      <h2>Adicione aqui</h2>
      <AddAnime />
      <h3>Busque frases que você inseriu de seu personagem de anime favorito!</h3>
      <GetAnime fetchAnimes={fetchAnimes}  />
      <AnimesItem animeData={animeData} />
    </div>
  );
};

export default Animes;
