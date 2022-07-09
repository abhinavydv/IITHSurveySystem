import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoginRequest from "./LoginRequest";
import { ResponseBlock } from "./ResponseBlock";
import { back_ip, back_port } from "../urls";

const TakeSurvey = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  useEffect(() => {
    getUser();
  });
  const getUser = async () => {
    await axios.get("http://" + back_ip + ":" + back_port + "/login").then((response) => {
      // console.log(response.data);
      if (response.data.loggedIn) {
        setIsLoggedIn(true);
        setUser(response.data.user.UID);
      } else {
        setIsLoggedIn(false);
      }
    });
  };

  const { sid } = useParams();
  //   const [surveys, setSurvey] = useState([]);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    if (responses.length == 0) {
      getResponses();
    }
  });

  const getResponses = async () => {
    await axios.get("http://" + back_ip + ":" + back_port + "/survey/" + sid).then((response) => {
      setResponses(response.data.data);
    });
  };

  const submitResponse = async () => {
    await axios
      .post("http://" + back_ip + ":" + back_port + "/response", {
        response: responses,
        metadata: {
          sid: sid,
          uid: user,
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  if (!isLoggedIn) return <LoginRequest />;

  return (
    <div>
      Responses
      <div>
        {responses.map((response, i) => (
          <div key={i}>
            <ResponseBlock
              type={response.type}
              data={response}
              viewOnly={props.viewOnly}
            />
          </div>
        ))}
      </div>
      <button onClick={submitResponse}>Submit</button>
      <br />
      <button
        onClick={() => {
          console.log(responses);
        }}
      >
        Check
      </button>
    </div>
  );
};

export default TakeSurvey;
