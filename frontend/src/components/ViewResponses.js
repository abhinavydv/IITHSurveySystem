import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoginRequest from "./LoginRequest";
import { back_ip, back_port } from "../urls";

const ViewResponses = (props) => {
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
          <div
            key={i}
            onClick={() => {
              props.setView("ViewResponse");
              props.setRid(response.RID);
            }}
          >
            {response.RID} {response.RespondedAt}
          </div>
        ))}
      </div>
      <div>{responses.length == 0 && "No responses yet"}</div>
    </div>
  );
};

export default ViewResponses;
