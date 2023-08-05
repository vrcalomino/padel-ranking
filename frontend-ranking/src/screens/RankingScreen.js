import { Link } from "react-router-dom";
import "../styles/Ranking.css";
import { useEffect, useState } from "react";
import axios from "axios";
const RankingScreen = () => {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    axios
      .get("https://backend-padel.onrender.com/api/ranking/players")
      .then((response) => {
        setPlayers(players.concat(response.data));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <table id="tabla">
        <thead>
          <tr>
            <th className="ranking-th">NOMBRE</th>
            <th className="ranking-th">PARTIDOS TOTALES</th>
            <th className="ranking-th">G</th>
            <th className="ranking-th">P</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
            return (
              <tr key={player._id}>
                <td className="ranking-td">
                  <Link className="perfil" to={`/players/${player._id}`}>
                    {player.name}
                  </Link>
                </td>
                <td className="ranking-td">{player.playedMatches}</td>
                <td className="ranking-td">{player.wonMatches}</td>
                <td className="ranking-td">{player.lostMatches}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default RankingScreen;
