import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditSurvey = () => {
  const { sid } = useParams();
  console.log(sid);
  const [survey, setSurvey] = useState([]);

  useEffect(() => {
    getSurvey();
  });

  const getSurvey = async () => {
    await axios.get("/survey/"+sid).then((response)=>{
      setSurvey(response);
    });
  }


  return (
    <div>
      <h1>{sid}</h1>
    </div>
  );
};

export default EditSurvey;
