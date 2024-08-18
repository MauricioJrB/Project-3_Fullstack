import { useState} from "react";
import { FaSearch } from "react-icons/fa";
import { useAlert } from "react-alert";

import "./GetAnime.scss";
import "./Button.scss";

import Input from "./Input";
import Button from "./Button";

const GetAnime = ({ fetchAnimes }) => {
  const [character, setCharacter] = useState("");

  const alert = useAlert();

  const onChange = (e) => {
    setCharacter(e.target.value);
  };

  const handleAnimeGet = async () => {
    try {
      if (character.length === 0) {
        return alert.error("A busca precisa de um personagem para ser encontrado!");
      }
     
      await fetchAnimes(character);

      if (character.length === 0) {
        return alert.error("Personagem não encontrado!");
      }

      setCharacter("");
      
    } catch (_error) {
      alert.error("Personagem não encontrado! Digite novamente.");
    }
  };

  return (
    <div className="getanime-container">
      <Input
        label={"Digite o nome do personagem..."}
        value={character}
        onChange={onChange}
        onEnterPress={handleAnimeGet}
      />
      <Button onClick={handleAnimeGet} >
         Buscar <FaSearch size={18} className="icon-search"/>
      </Button>
    </div>
  );
};

export default GetAnime;

