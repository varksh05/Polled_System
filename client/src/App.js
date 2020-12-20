import "./App.css";
import User from "./components/User";
import Wine from "./components/Wine";


function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <User />
          </div>
          <div className="col-lg"></div>
          <div className="col-lg-3">
            <Wine />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
