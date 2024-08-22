import React, { useContext, useState } from 'react'
import { useAlert } from 'react-alert';
import Input from './Input';
import Button from './Button';
import { FaPlus } from 'react-icons/fa';
import { AuthContext } from '../contexts/UserContext';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import './AddAnime.scss'

const AddAnime = () => {
  const [anime, setAnime] = useState("");
  const [character, setCharacter] = useState("");
  const [quote, setQuote] = useState("");

  const alert = useAlert();
  const { authToken } = useContext(AuthContext);

  const decodedToken = jwtDecode(authToken);
  const userId = decodedToken.id;

  const handleAnimeAdd = async () => {

    if (!anime || !character || !quote) return alert.error("Todos os campos são obrigatórios");

    try {
      const response = await axios.post('https://localhost:3001/api/animes', {
        character,
        anime,
        quote,
        owner: userId
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      console.log("Resposta da API:", response.data)

      alert.success("Adicionado com sucesso.");

      setAnime("");
      setCharacter("");
      setQuote("");

    } catch (e) {
      alert.error("Erro ao adicionar.")
    }
  }

  return (
    <div className='add-anime-container'>
      <Input
        label={"Nome do anime..."}
        value={anime}
        onChange={(e) => setAnime(e.target.value)}
        onEnterPress={handleAnimeAdd}
      />
      <Input 
        label={"Personagem..."}
        value={character}
        onChange={(e) => setCharacter(e.target.value)}
        onEnterPress={handleAnimeAdd}
      />
      <Input
        label={"Citação..."}
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        onEnterPress={handleAnimeAdd}
      />
      <div className='button-add'>
        <Button onClick={handleAnimeAdd}>
          Adicionar <FaPlus color='#ffffff'/>
        </Button>
      </div>
    </div>
  )
}

export default AddAnime
