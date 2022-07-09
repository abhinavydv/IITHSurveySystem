import "./App.css";
import HomePage from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import EditSurvey from "./components/EditSurvey";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateSurvey } from "./components/CreateSurvey";
import TakeSurvey from "./components/TakeSurvey";
import EditViewSurvey from "./components/EditViewSurvey";
import ViewResponse from "./components/ViewResponse";
import ViewResponses from "./components/ViewResponses";

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
              {/* <Route path="/create" element={<EditSurvey create={true} />} /> */}
              <Route path="/create" element={<CreateSurvey />} />
              <Route path="/edit/:sid" element={<EditViewSurvey />} />
              {/* <Route path="/view/:rid" element={<ViewResponse />} /> */}
              <Route path="/take/:sid" element={<TakeSurvey />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
