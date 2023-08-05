import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Profile.css";

const ProfileScreen = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState("");
  const [matchesPlayed, setMatchesPlayed] = useState([]);

  useEffect(() => {
    axios
      .get(`https://backend-padel.onrender.com/api/ranking/players/${id}`)
      .then((playerObtained) => {
        setPlayer(playerObtained.data);
        const playedMatches = playerObtained.data.pastMatches;
        playedMatches.forEach((matchId) => {
          axios
            .get(
              `https://backend-padel.onrender.com/api/ranking/matches/${matchId}`
            )
            .then((match) => {
              setMatchesPlayed(matchesPlayed.concat(match.data));
            });
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1>PERFIL DE JUGADOR</h1>
      <div class="wrapper">
        <p class="two" id="nombre">
          {player.name}
        </p>
        <img
          alt="imagen-generica"
          class="one"
          id="jugador"
          src="https://static.vecteezy.com/system/resources/previews/011/787/599/original/handsome-and-smart-businessman-in-suit-and-white-shirt-relaxing-on-isolatred-on-yellow-background-copy-space-free-png.png"
        />
        <p class="two" id="posicion">
          {player.position}
        </p>
        <p class="two" id="altura">
          1,80
        </p>
        <p class="two" id="nacimiento">
          25/03/2002
        </p>
        <p class="three">
          Jugados
          <br />
          {player.playedMatches}
        </p>
        <p class="four">
          Ganados
          <br />
          {player.wonMatches}
        </p>
        <p class="five">
          Perdidos
          <br />
          {player.lostMatches}
        </p>
      </div>
      <h2>PARTIDOS</h2>
      <table id="tabla-2">
        <thead>
          <tr>
            <th className="partidos">FECHA</th>
            <th className="partidos">LUGAR</th>
            <th className="partidos">EQUIPO 1</th>
            <th className="partidos">EQUIPO 2</th>
            <th className="partidos">RESULTADO</th>
          </tr>
        </thead>
        <tbody>
          {matchesPlayed.map((match) => {
            return (
              <tr key={match._id}>
                <td>
                  <Link
                    id="fecha"
                    className="clasificacion"
                    to={`/matches/${match._id}`}
                  >
                    {match.date.slice(0, 10)}
                  </Link>
                </td>
                <td className="clasificacion">{match.place}</td>
                <td className="clasificacion">
                  {match.coupleOne[0]}
                  <br />
                  {match.coupleOne[1]}
                </td>
                <td className="clasificacion">
                  {match.coupleTwo[0]}
                  <br />
                  {match.coupleTwo[1]}
                </td>
                <td className="clasificacion">
                  {match.firstSet.join("-")} / {match.secondSet.join("-")} /{" "}
                  {match.thirdSet.join("-")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ProfileScreen;
