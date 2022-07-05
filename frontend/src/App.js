import "./App.css";
import HomePage from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import EditSurvey from "./components/EditSurvey";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <Routes>
              <Route exact path="/" element={<HomePage />} />

              <Route path="/login" element={<Login />} />

              <Route path="/register" element={<Register />} />
              <Route path="/create" element={<EditSurvey create={true} />} />
              <Route path="/edit/:sid" element={<EditSurvey />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
