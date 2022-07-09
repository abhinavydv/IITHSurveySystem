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
        } else {
          setIsLoggedIn(false);
        }
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
      <div>
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
      </div>
      <div>
        {view == "EditSurvey" && <EditSurvey sid={sid} />}
        {view == "ViewResponses" && (
          <ViewResponses sid={sid} setView={setView} setRid={setRid} />
        )}
        {view == "ViewResponse" && <ViewResponse rid={rid} />}
      </div>
    </div>
  );
};

export default EditViewSurvey;
