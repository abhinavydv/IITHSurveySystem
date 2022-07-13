import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TextAnswer } from "./QuestionBlock";
import { back_ip, back_port } from "../urls";
import "./css/styles.css";

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
    await axios
      .get("http://" + back_ip + ":" + back_port + "/surveys")
      .then((response) => {
        // console.log(response.data);
        setSurveys(response.data);
      });
  };

  const getUser = async () => {
    await axios
      .get("http://" + back_ip + ":" + back_port + "/login")
      .then((response) => {
        // console.log(response.data);
        if (response.data.loggedIn) {
          setUsername(response.data.user.Name);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          history("/login");
        }
      });
  };

  const logout = async () => {
    await axios
      .get("http://" + back_ip + ":" + back_port + "/logout")
      .then((response) => {
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

  // if (!isLoggedIn) {
  //   return history("/login");
  // }

  return (
    // <div>
    //   <h1>Welcome user!</h1>
    //   {(isLoggedIn && (
    //     <div>
    //       <h1>{username}</h1>
    //       <button className="button" onClick={logout}>
    //         Logout
    //       </button>
    //     </div>
    //   )) || (
    //     <div>
    //       <Link to="/login" className="button is-primary">
    //         Login
    //       </Link>
    //       <br />
    //       <Link to="/register" className="button is-primary">
    //         Register
    //       </Link>
    //     </div>
    //   )}
    //   <br />
    //   <Link to="/create" className="button is-primary">
    //     New
    //   </Link>
    //   <br />

    //   <table className="table is-striped is-fullwidth">
    //     <tbody>
    //       {isLoggedIn &&
    //         surveys.map((survey, index) => (
    //           <tr
    //             key={survey.SID}
    //             onClick={() => history("/edit/" + survey.SID)}
    //           >
    //             <td>{index + 1}</td>
    //             <td>{survey.Title}</td>
    //             <td>{survey.OpenTill}</td>
    //             <td>{survey.UpdatedAt}</td>
    //           </tr>
    //         ))}
    //     </tbody>
    //   </table>
    //   {/* <TextAnswer data={data} /> */}
    //   <button
    //     className="btn"
    //     onClick={() => {
    //       console.log(obj);
    //     }}
    //   >
    //     check
    //   </button>
    // </div>
    <div>
      {/* <div className="topnav">
        {username}
        <a href="#logout">Log out</a>
        <img
          className="img1 btn"
          src="/images/logo.png"
          alt="IITH logo"
          onClick={() => {
            history("");
          }}
        />
        <h1>IITH SURVEY SYSTEM</h1>
      </div> */}
      <div className="nblock">
        <div className="nblockleft">
          <Link to="/">
            <img
              className="btn"
              src="../images/logo.png"
              height="60"
              alt="IITH logo"
            />
          </Link>
        </div>
        <div className="nblockmiddle">
          <h1>IITH Survey System</h1>
        </div>
        <div className="nblockright">
          hi {username}!
          <br />
          <span
            className="links btn"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </span>
        </div>
      </div>
      <div className="">
        {/* <div>
          <h2>Start a new survey</h2>
        </div> */}
        {/* <br /> */}
        <div className="new-survey" title="Create New Survey">
          <button className="btn ">
            <a href="/create">
              <img className="img2" src="/images/plus.png" alt="add" />
            </a>
          </button>
        </div>
      </div>
      {/* <h2>Recent Forms</h2> */}
      {surveys.map((survey, i) => (
        <div
          className="sblock btn"
          key={i}
          onClick={() => {
            history("/edit/" + survey.SID);
          }}
        >
          <div className="sblockleft">{i + 1}</div>

          <div className="sblockmiddle">{survey.Title}</div>
          <div className="sblockright">
            <input
              className="input2"
              type="datetime-local"
              value={
                survey.UpdatedAt.replace("T", " ").substring(0, 16) + ":00"
              }
              readOnly={true}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
