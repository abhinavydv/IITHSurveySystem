import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ResponseBlock } from "./ResponseBlock";
import { back_ip, back_port } from "../urls";

const ViewResponse = (props) => {
  const rid = props.rid;
  const [response, setResponse] = useState([]);

  const getResponse = async () => {
    await axios
      .get("http://" + back_ip + ":" + back_port + "/response/" + rid)
      .then((response) => {
        setResponse(response.data.data);
        // console.log(response.data.data);
      });
  };

  useEffect(() => {
    getResponse();
  });

  return (
    <div>
      Responses
      <div>
        {response.map((response_i, i) => (
          <div key={i}>
            <ResponseBlock
              type={response_i.type}
              data={response_i}
              viewOnly={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewResponse;
