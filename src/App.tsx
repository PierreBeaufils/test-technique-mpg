import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Datas Mon Petit Gazon</p>
        <Link to="/players" className="underline text-blue-400">
          Accéder à la liste des joueurs
        </Link>
      </header>
    </div>
  );
}

export default App;
