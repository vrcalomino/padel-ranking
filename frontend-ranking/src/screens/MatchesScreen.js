import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/Matches.css";

const MatchesScreen = () => {
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    axios
      .get("https://backend-padel.onrender.com/api/ranking/matches")
      .then((result) => {
        console.log(result.data);
        setMatches(matches.concat(result.data));
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card-container">
      {matches.map((match) => {
        console.log(match);
        const j1e1 = match.coupleOne[0].split(" ")[1];
        const j2e1 = match.coupleOne[1].split(" ")[1];
        const j1e2 = match.coupleTwo[0].split(" ")[1];
        const j2e2 = match.coupleTwo[1].split(" ")[1];
        return (
          <div className="card" key={match._id}>
            <div className="row-one">
              <p className="place">{match.place.toUpperCase()}</p>
              <p className="date">{match.date.slice(0, 10)}</p>
            </div>
            <div className="players">
              <div className="team-one">
                <p>
                  {j1e1}
                  <br />
                  {j2e1}
                </p>
                <p className="set-one">
                  {match.firstSet[0]}{" "}
                  <span className="space">{match.secondSet[0]}</span>{" "}
                  {match.thirdSet[0]}
                </p>
              </div>
              <div className="team-two">
                {j1e2}
                <br />
                {j2e2}
                <p className="set-two">
                  {match.firstSet[1]}{" "}
                  <span className="space">{match.secondSet[1]}</span>{" "}
                  {match.thirdSet[1]}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default MatchesScreen;
