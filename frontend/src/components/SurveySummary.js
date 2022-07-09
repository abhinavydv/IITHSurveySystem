import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { back_ip, back_port } from "../urls";

const SurveySummary = (props) => {
  const { sid } = useParams();

  const [summary, setSummary] = useState([]);

  useEffect(() => {
    if (summary.length == 0) {
        await axios.get("http://"+ back_ip + ": " + back_port + "/summary/"+sid).then((response) => {
            setSummary(response.data.data);
        })
    }
  });

  return (
    <div>
        {summary.map((s) => (
            <div>
                
            </div>
        ))}
    </div>
  );
};
