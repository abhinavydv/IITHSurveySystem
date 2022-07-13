import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoginRequest from "./LoginRequest";
import { back_ip, back_port } from "../urls";

const ViewResponses = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
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

  useEffect(() => {
    getUser();
  });

  const { sid } = useParams();

  const [responses, setResponses] = useState([]);
  //   const history = useNavigate();

  //   console.log(responses);

  const getResponses = async () => {
    await axios
      .get("http://" + back_ip + ":" + back_port + "/responses/" + sid)
      .then((response) => {
        // console.log(response.data);
        setResponses(response.data);
      });
  };
  useEffect(() => {
    getResponses();
  });

  return (
    <div>
      <div>
        {responses.map((response, i) => (
          // <div
          //   key={i}
          //   className="btn"
          //   onClick={() => {
          //     props.setView("ViewResponse");
          //     props.setRid(response.RID);
          //   }}
          // >
          //   {response.RID} {response.RespondedAt}
          // </div>
          <div
            className="sblock btn"
            key={i}
            onClick={() => {
              props.setView("ViewResponse");
              props.setRid(response.RID);
            }}
          >
            <div className="sblockleft">{i + 1}</div>

            <div className="sblockmiddle">{response.Respondant}</div>
            <div className="sblockright">
              <input
                className="input2"
                type="datetime-local"
                value={
                  response.RespondedAt.replace("T", " ").substring(0, 16) +
                  ":00"
                }
                readOnly={true}
              />
            </div>
          </div>
        ))}
      </div>
      <div>{responses.length == 0 && "No responses yet"}</div>
    </div>
  );
};

export default ViewResponses;
