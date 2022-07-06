import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const templates = {
  Title: {
    qid: 1,
    type: "Title",
    title: {
      text: "The Title!",
    },
    description: {
      text: "The Description!",
    },
    required: false,
  },
  TextAnswer: {
    qid: 2,
    type: "TextAnswer",
    question: {
      text: "The Question?",
      image: "path/to/image.png",
    },
    answer: {
      text: "The Answer here",
      image: "path/to/image.png",
    },
    required: false,
  },
};

export const CreateSurvey = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [SID, setSID] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const history = useNavigate();
  // useEffect(() => {
  //   getUser();
  // });
  const getUser = async () => {
    await axios.get("http://localhost:5000/login").then((response) => {
      // console.log(response.data);
      if (response.data.loggedIn) {
        setIsLoggedIn(true);
        setUser(response.data.user.UID);
      } else {
        setIsLoggedIn(false);
      }
    });
  };

  const submitSurvey = async () => {
    // e.preventDefault();
    await axios
      .post("http://localhost:5000/survey", {
        data: surveys,
        metadata: {
          uid: user,
          openFrom: "2000-01-01",
          openTill: "2030-12-31",
        },
      })
      .then((response) => {
        console.log(response);
        setSID(response.data.SID);
      });
  };

  const [surveys, setSurvey] = useState([]);

  if (surveys.length == 0) {
    setSurvey([templates.Title, templates.TextAnswer]);
    // console.log(surveys);
  }

  useEffect(() => {
    getUser();
    if (!submitted && isLoggedIn && user) {
      setSubmitted(true);
      submitSurvey();
    }
    if (SID) {
      return history("/edit/" + SID);
    }
  });
  return <div></div>;
};
