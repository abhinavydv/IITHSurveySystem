import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { QuestionBlock } from "./QuestionBlock";

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

const EditSurvey = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  useEffect(() => {
    getUser();
  });
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

  const { sid } = useParams();
  // console.log(sid);
  // console.log(props);
  const [surveys, setSurvey] = useState([]);
  // console.log(surveys);
  const create = props.create;
  const [editable, setEditable] = useState(1);
  const [openFrom, setOpenFrom] = useState("");
  const [openTill, setOpenTill] = useState("");
  if (create && surveys.length == 0) {
    setSurvey([templates.Title, templates.TextAnswer]);
    // console.log(surveys);
  }

  const [maxQid, setMaxQid] = useState(3);
  // console.log(maxQid);

  const addQuestionBlock = () => {
    const survey = JSON.parse(JSON.stringify(templates.TextAnswer));
    survey.qid = maxQid;
    setMaxQid(maxQid + 1);
    // console.log(survey);
    // console.log(getQid());
    setSurvey(surveys.concat([survey]));
  };

  const getIndexFromQid = (qid) => {
    var ind = 0;
    var fl = false;
    surveys.forEach((survey) => {
      // console.log(survey.qid, qid);
      if (!fl) {
        if (survey.qid == qid) {
          console.log(qid, ind);
          fl = true;
        }
        ind++;
      }
    });
    return ind - 1;
  };

  const changeQuestionType = (qid, newType) => {
    console.log(qid, newType, getIndexFromQid(qid));
    const ind = getIndexFromQid(qid);
    var surveys2 = JSON.parse(JSON.stringify(surveys));
    surveys2[ind] = templates[newType];
    surveys2[ind].qid = qid;
    // console.log(surveys2);
    setSurvey(surveys2);
  };

  const deleteQuestionBlock = (qid) => {
    setSurvey(
      surveys.filter((survey) => {
        return survey.qid != qid;
      })
    );
  };

  useEffect(() => {
    if (sid) {
      getSurvey();
    }
  });

  const getSurvey = async () => {
    await axios.get("/survey/" + sid).then((response) => {
      setSurvey(response);
    });
  };

  const submitSurvey = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/survey", {
        data: surveys,
        uid: user,
        openFrom: openFrom,
        openTill: openTill,
      })
      .then((response) => {
        console.log(response);
      });
  };

  // const a = "ab";

  // console.log(surveys);

  if (!isLoggedIn) {
    return (
      <div>
        <Link to="/login">Please login to continue</Link>
      </div>
    );
  }
  return (
    <div id="The surveys">
      <label htmlFor="openFrom">Open From</label>
      <input
        type="datetime-local"
        id="openFrom"
        name="openFrom"
        onChange={(e) => setOpenFrom(e.target.value)}
      />
      <br />
      <label htmlFor="openTill">Open Till</label>
      <input
        type="datetime-local"
        id="openTill"
        name="openTill"
        onChange={(e) => setOpenTill(e.target.value)}
      />
      <br />
      <br />
      {surveys.map((survey, i) => (
        <div
          id={"questionBlock" + i}
          key={i}
          onClick={(e) => {
            setEditable(survey.qid);
          }}
        >
          <QuestionBlock
            type={survey.type}
            data={survey}
            edit={editable == survey.qid}
            setEditable={setEditable}
          />
          {survey.qid != 1 && (
            <div>
              <select
                onChange={(e) => {
                  changeQuestionType(survey.qid, e.target.value);
                }}
              >
                <option value="TextAnswer">Text Answer</option>
                <option value="Title">Title</option>
              </select>
              <button onClick={(e) => deleteQuestionBlock(survey.qid)}>
                delete
              </button>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={(e) => {
          addQuestionBlock();
        }}
      >
        Add
      </button>
      <button onClick={submitSurvey}>Submit</button>
    </div>
  );
};

export default EditSurvey;
