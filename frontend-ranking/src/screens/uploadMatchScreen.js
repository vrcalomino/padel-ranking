import { useEffect, useState } from "react";
import "../styles/UploadMatch.css";
import axios from "axios";

const PlayerSelection = ({ players, playerValue, setPlayerValue }) => {
  return (
    <select
      required
      value={playerValue}
      onChange={(e) => setPlayerValue(e.target.value)}
    >
      {players.map((player) => {
        return (
          <option value={player.name} key={player._id}>
            {player.name}
          </option>
        );
      })}
    </select>
  );
};
const UploadMatchScreen = () => {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    axios
      .get("https://backend-padel.onrender.com/api/ranking/players")
      .then((response) => {
        setPlayers(players.concat(response.data));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [place, setPlace] = useState("");
  const [coupleOnePersonOne, setCoupleOnePersonOne] = useState("");
  const [coupleOnePersonTwo, setCoupleOnePersonTwo] = useState("");
  const [coupleTwoPersonOne, setCoupleTwoPersonOne] = useState("");
  const [coupleTwoPersonTwo, setCoupleTwoPersonTwo] = useState("");
  const [firstSetGameOne, setFirstSetGameOne] = useState(0);
  const [firstSetGameTwo, setFirstSetGameTwo] = useState(0);
  const [secondSetGameOne, setSecondSetGameOne] = useState(0);
  const [secondSetGameTwo, setSecondSetGameTwo] = useState(0);
  const [thirdSetGameOne, setThirdSetGameOne] = useState(0);
  const [thirdSetGameTwo, setThirdSetGameTwo] = useState(0);
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMatch = {
      date: date,
      place: place,
      coupleOne: [coupleOnePersonOne, coupleOnePersonTwo],
      coupleTwo: [coupleTwoPersonOne, coupleTwoPersonTwo],
      firstSet: [firstSetGameOne, firstSetGameTwo],
      secondSet: [secondSetGameOne, secondSetGameTwo],
      thirdSet: [thirdSetGameOne, thirdSetGameTwo],
    };
    console.log(newMatch);
    const addMatch = async () => {
      try {
        await axios.post(
          "https://backend-padel.onrender.com/api/ranking/matches",
          newMatch
        );
        console.log("Partido agregado exitosamente.");
        e.target.reset();
        setPlace("");
        setCoupleOnePersonOne("");
        setCoupleOnePersonTwo("");
        setCoupleTwoPersonOne("");
        setCoupleTwoPersonTwo("");
        setFirstSetGameOne(0);
        setFirstSetGameTwo(0);
        setSecondSetGameOne(0);
        setSecondSetGameTwo(0);
        setThirdSetGameOne(0);
        setThirdSetGameTwo(0);
        setDate("");
      } catch (error) {
        console.log("Error al agregar el partido:", error);
      }
    };

    addMatch();
  };

  return (
    <form id="upload-form" onSubmit={handleSubmit}>
      <label>
        Lugar
        <br />{" "}
        <input
          required
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
      </label>
      <label>
        Pareja 1 integrante 1<br />
        <PlayerSelection
          players={players}
          playerValue={coupleOnePersonOne}
          setPlayerValue={setCoupleOnePersonOne}
        />
      </label>
      <label>
        Pareja 1 integrante 2<br />
        <PlayerSelection
          players={players}
          playerValue={coupleOnePersonTwo}
          setPlayerValue={setCoupleOnePersonTwo}
        />
      </label>
      <label>
        Pareja 2 integrante 1<br />
        <PlayerSelection
          players={players}
          playerValue={coupleTwoPersonOne}
          setPlayerValue={setCoupleTwoPersonOne}
        />
      </label>
      <label>
        Pareja 2 integrante 2<br />
        <PlayerSelection
          players={players}
          playerValue={coupleTwoPersonTwo}
          setPlayerValue={setCoupleTwoPersonTwo}
        />
      </label>
      <label>
        PRIMER SET{" "}
        <input
          required
          value={firstSetGameOne}
          onChange={(e) => setFirstSetGameOne(e.target.value)}
          type="number"
          min={0}
          max={7}
        />
        <input
          required
          value={firstSetGameTwo}
          onChange={(e) => setFirstSetGameTwo(e.target.value)}
          type="number"
          min={0}
          max={7}
        />
      </label>
      <label>
        SEGUNDO SET{" "}
        <input
          required
          value={secondSetGameOne}
          onChange={(e) => setSecondSetGameOne(e.target.value)}
          type="number"
          min={0}
          max={7}
        />
        <input
          required
          value={secondSetGameTwo}
          onChange={(e) => setSecondSetGameTwo(e.target.value)}
          type="number"
          min={0}
          max={7}
        />
      </label>
      <label>
        TERCER SET{" "}
        <input
          value={thirdSetGameOne}
          onChange={(e) => setThirdSetGameOne(e.target.value)}
          type="number"
          min={0}
          max={7}
        />
        <input
          value={thirdSetGameTwo}
          onChange={(e) => setThirdSetGameTwo(e.target.value)}
          type="number"
          min={0}
          max={7}
        />
      </label>
      <label>
        {" "}
        FECHA{" "}
        <input
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
        />
      </label>
      <button type="submit">Subir</button>
    </form>
  );
};
export default UploadMatchScreen;
