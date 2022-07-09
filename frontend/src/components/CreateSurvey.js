import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoginRequest from "./LoginRequest";
import { front_ip, front_port, back_ip, back_port } from "../urls";

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
  const date = new Date();
  // useEffect(() => {
  //   getUser();
  // });
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

  const submitSurvey = async () => {
    // e.preventDefault();
    await axios
      .post("http://" + back_ip + ":" + back_port + "/survey", {
        data: surveys,
        metadata: {
          uid: user,
          openFrom:
            date.getFullYear() +
            "-" +
            date.getMonth() +
            "-" +
            date.getDate() +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds(),
          openTill:
            date.getFullYear() +
            "-" +
            date.getMonth() +
            "-" +
            (date.getDate() + 1) +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds(),
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

  if (!isLoggedIn) return <LoginRequest />;

  return <div></div>;
};
