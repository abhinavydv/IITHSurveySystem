import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditSurvey from "./EditSurvey";
import LoginRequest from "./LoginRequest";
import TakeSurvey from "./TakeSurvey";
import ViewResponse from "./ViewResponse";
import ViewResponses from "./ViewResponses";
import { back_ip, back_port } from "../urls";

const EditViewSurvey = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const history = useNavigate();
  useEffect(() => {
    getUser();
  });
  const getUser = async () => {
    await axios
      .get("http://" + back_ip + ":" + back_port + "/login")
      .then((response) => {
        // console.log(response.data);
        if (response.data.loggedIn) {
          setIsLoggedIn(true);
          setUser(response.data.user.UID);
          setUsername(response.data.user.Name);
        } else {
          setIsLoggedIn(false);
        }
      });
  };

  const logout = async () => {
    await axios
      .get("http://" + back_ip + ":" + back_port + "/logout")
      .then((response) => {
        setUsername("");
        setIsLoggedIn(false);
      });
  };

  const getSummary = async () => {
    await axios
      .get("http://" + back_ip + ":" + back_port + "/summary/" + sid)
      .then((response) => {
        console.log(response.data);
      });
  };

  const [view, setView] = useState("EditSurvey");
  const { sid } = useParams();
  const [rid, setRid] = useState("");

  if (!isLoggedIn) return <LoginRequest />;

  return (
    <div>
      {/* <div>
        <button
          onClick={(e) => {
            setView("EditSurvey");
          }}
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            setView("ViewResponses");
          }}
        >
          Responses
        </button>
        <button
          onClick={(e) => {
            getSummary();
          }}
        >
          Summary
        </button>
      </div> */}
      <div className="nblock">
        <div
          className="nblockleft"
          onClick={() => {
            history("");
          }}
        >
          <a href="/">
            <img
              className="btn"
              src="../images/logo.png"
              height="60"
              alt="IITH logo"
            />
          </a>
        </div>
        <div className="nblockmiddle">
          <h1>IITH Survey System</h1>
        </div>
        <div className="nblockright">
          hi {username}!
          <br />
          <span
            className="links btn"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </span>
        </div>
      </div>
      <div>
        <nav className="navbar navbar-static-top">
          <a
            className={"links " + (view == "EditSurvey" ? "selected" : "")}
            href="#"
            onClick={() => {
              setView("EditSurvey");
            }}
          >
            Edit
          </a>
          <a
            className={"links " + (view == "Link" ? "selected" : "")}
            href="#"
            onClick={() => {
              setView("Link");
            }}
          >
            Link
          </a>
          <a
            className={"links " + (view == "ViewResponses" ? "selected" : "")}
            href="#"
            onClick={() => {
              setView("ViewResponses");
            }}
          >
            Responses
          </a>
          {/* <a
            className="links"
            href="#"
            onClick={() => {
              setView("ViewResponses");
              console.log("aa");
            }}
          >
            Summary
          </a> */}
        </nav>
      </div>

      <div>
        {view == "EditSurvey" && <EditSurvey sid={sid} />}
        {view == "ViewResponses" && (
          <ViewResponses sid={sid} setView={setView} setRid={setRid} />
        )}
        {view == "ViewResponse" && <ViewResponse rid={rid} />}
        {view == "Link" && (
          <p>{"http://" + window.location.host + "/take/" + sid}</p>
        )}
      </div>
    </div>
  );
};

export default EditViewSurvey;
