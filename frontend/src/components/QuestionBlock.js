import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const TextAnswer = (props) => {
  /*
    * data = {
      type: "TextAnswer",
      q: {
        text: "The text",
        img: "Url of the image",
      },
      a: {
        text: "The answer"
      }
    }
  */
  //   console.log(props);
  // props.obj.a = 5;
  const [edit, setEdit] = useState(false)
  const [textAnswer, setTextAnswer] = useState("");
  const [textQuestion, setTextQuestion] = useState("");
  const [questionImage, setTextImage] = useState("");
  const data = props.data;
  

  return (
    <div>
      <hr />
      <p>{textQuestion}</p>
      <p>
        <img src={questionImage} />
      </p>
      <hr />
      <p>
        {(edit && <input />) || <p>{textAnswer}</p>}
      </p>
      <hr />
    </div>
  );
};
