import { Link, Route, Routes } from "react-router-dom";
import RankingScreen from "./screens/RankingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import "./styles/App.css";
import MatchesScreen from "./screens/MatchesScreen";
import UploadMatchScreen from "./screens/uploadMatchScreen";

function App() {
  
  return (
    <div>
      <nav id="barra">
        <ul>
          <li>
            <Link to="/">
              <img
                alt="pelota de tenis"
                id="pelota"
                src="https://www.transparentpng.com/thumb/tennis-ball/gaMKtR-tennis-ball-icon-clipart.png"
              />
            </Link>
          </li>
          <li>
            <Link to="/" className="perfil" id="titulo">
              LAUQUEN PADEL
            </Link>
          </li>
          <li>
            <Link className="perfil" id="historial" to="/matches">
              HISTORIAL
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route element={<RankingScreen />} path="/" />
        <Route element={<ProfileScreen />} path={`/players/:id`} />
        <Route element={<MatchesScreen />} path="/matches" />
        <Route element={<UploadMatchScreen />} path="/upload" />
      </Routes>
    </div>
  );
}

export default App;
