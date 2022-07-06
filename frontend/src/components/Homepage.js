import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TextAnswer } from "./QuestionBlock";

const HomePage = () => {
  const [surveys, setSurveys] = useState([]);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useNavigate();
  useEffect(() => {
    getUser();
  });
  useEffect(() => {
    if (isLoggedIn) {
      getSurveys();
    }
  }, [isLoggedIn]);

  const getSurveys = async () => {
    await axios.get("http://localhost:5000/surveys").then((response) => {
      // console.log(response.data);
      setSurveys(response.data);
    });
  };

  const getUser = async () => {
    await axios.get("http://localhost:5000/login").then((response) => {
      // console.log(response.data);
      if (response.data.loggedIn) {
        setUsername(response.data.user.Name);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  };

  const logout = async () => {
    await axios.get("http://localhost:5000/logout").then((response) => {
      setUsername("");
      setIsLoggedIn(false);
    });
  };

  const obj = {
    a: {
      a: 1,
    },
    b: {
      b: 2,
    },
  };

  // getSurveys();
  // console.log(username)
  // console.log(surveys);

  const data = {
    type: "TextAnswer",
    q: {
      text: "The question",
      img: "img.png",
    },
    a: {
      text: "The answer",
    },
  };

  return (
    <div>
      <h1>Welcome user!</h1>
      {(isLoggedIn && (
        <div>
          <h1>{username}</h1>
          <button className="button" onClick={logout}>
            Logout
          </button>
        </div>
      )) || (
        <div>
          <Link to="/login" className="button is-primary">
            Login
          </Link>
          <br />
          <Link to="/register" className="button is-primary">
            Register
          </Link>
        </div>
      )}
      <br />
      <Link to="/create" className="button is-primary">
        New
      </Link>
      <br />

      <table className="table is-striped is-fullwidth">
        <tbody>
          {isLoggedIn &&
            surveys.map((survey, index) => (
              <tr
                key={survey.SID}
                onClick={() => history("/edit/" + survey.SID)}
              >
                <td>{index + 1}</td>
                <td>{survey.Title}</td>
                <td>{survey.OpenTill}</td>
                <td>{survey.UpdatedAt}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* <TextAnswer data={data} /> */}
      <button
        className="btn"
        onClick={() => {
          console.log(obj);
        }}
      >
        check
      </button>
    </div>
  );
};

export default HomePage;
