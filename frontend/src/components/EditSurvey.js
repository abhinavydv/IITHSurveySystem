import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { OptionRight, Question, QuestionBlock } from "./QuestionBlock";
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
      image: "",
    },
    answer: {
      text: "",
      image: "",
    },
    required: false,
  },
  MultipleChoiceSingleCorrect: {
    qid: 3,
    type: "MultipleChoiceSingleCorrect",
    question: {
      text: "The Question for choices?",
      image: "",
    },
    options: [
      {
        oid: 1,
        text: "Choice 1",
        image: "",
      },
      {
        oid: 2,
        text: "Choice 2",
        image: "",
      },
    ],
    chosen: -1,
  },
  MultipleChoiceMultipleCorrect: {
    qid: 4,
    type: "MultipleChoiceMultipleCorrect",
    question: {
      text: "The Question for choices?",
      image: "",
    },
    options: [
      {
        oid: 1,
        text: "Choice 1",
        image: "",
        checked: false,
      },
      {
        oid: 2,
        text: "Choice 2",
        image: "",
        checked: false,
      },
    ],
    chosen: [],
  },
  Date: {
    qid: 5,
    type: "Date",
    question: {
      text: "Enter a date",
      image: "",
    },
    date: "",
    required: false,
  },
  Time: {
    qid: 6,
    type: "Time",
    question: {
      text: "Enter a time",
      image: "",
    },
    time: "",
    required: false,
  },
  Rating: {
    qid: 7,
    type: "Rating",
    question: {
      text: "Rate us",
      image: "",
    },
    rating: 3,
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

  const { sid } = useParams();
  // console.log(sid);
  // console.log(props);
  const [surveys, setSurvey] = useState([]);
  // console.log(surveys);
  const [editable, setEditable] = useState(2);
  const [openFrom, setOpenFrom] = useState("");
  const [openTill, setOpenTill] = useState("");

  const [maxQid, setMaxQid] = useState(3);
  // console.log(maxQid);

  const addQuestionBlock = () => {
    const survey = JSON.parse(JSON.stringify(templates.TextAnswer));
    survey.qid = surveys[surveys.length - 1].qid + 1;
    // console.log(surveys);
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
          // console.log(qid, ind);
          fl = true;
        }
        ind++;
      }
    });
    return ind - 1;
  };

  const changeQuestionType = (qid, newType) => {
    // console.log(qid, newType, getIndexFromQid(qid));
    const ind = getIndexFromQid(qid);
    var surveys2 = JSON.parse(JSON.stringify(surveys));
    surveys2[ind] = JSON.parse(JSON.stringify(templates[newType]));
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

  const copyQuestionBlock = (qid) => {
    const index = getIndexFromQid(qid);
    var surveys2 = JSON.parse(JSON.stringify(surveys));
    const copy = JSON.parse(JSON.stringify(surveys[index]));
    copy.qid = maxQid;
    setMaxQid(maxQid + 1);
    surveys2.splice(index, 0, copy);
    setSurvey(surveys2);
  };

  useEffect(() => {
    if (sid) {
      getSurvey();
    }
  });

  const getSurvey = async () => {
    if (surveys.length == 0) {
      await axios
        .get("http://" + back_ip + ":" + back_port + "/survey/" + sid)
        .then((response) => {
          setSurvey(response.data.data);
          // console.log(response.data.metadata);
          setOpenFrom(
            response.data.metadata.OpenFrom.substring(0, 16).replace("T", " ")
          );
          setOpenTill(
            response.data.metadata.OpenTill.substring(0, 16).replace("T", " ")
          );
        });
    }
  };

  const submitSurvey = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://" + back_ip + ":" + back_port + "/survey/" + (sid ? sid : ""),
        {
          data: surveys,
          metadata: {
            sid: sid,
            uid: user,
            openFrom: openFrom,
            openTill: openTill,
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
    alert("Survey submitted successfully!");
  };

  // const a = "ab";

  // console.log(surveys);

  // if (!isLoggedIn) {
  //   return (
  //     <div>
  //       <Link to="/login">Please login to continue</Link>
  //     </div>
  //   );
  // }
  // console.log(openFrom);

  return (
    <div id="TheSurvey">
      {/* <label htmlFor="openFrom">Open From</label>
      <input
        type="datetime-local"
        id="openFrom"
        name="openFrom"
        value={openFrom}
        onChange={(e) => {
          console.log(openFrom);
          setOpenFrom(
            e.target.value.replace("T", " ").substring(0, 16) + ":00"
          );
          // setOpenFromDate(new Date(openFrom));
          // console.log(openFromDate);
          // console.log(e.target.value.replace("T", " ") + ":00");
        }}
      />
      <br />
      <label htmlFor="openTill">Open Till</label>
      <input
        type="datetime-local"
        id="openTill"
        name="openTill"
        value={openTill}
        onChange={(e) =>
          setOpenTill(e.target.value.replace("T", " ").substring(0, 16) + ":59")
        }
      /> */}
      <div className="qblock">
        <div className="qblockleft">
          <form>
            <div className="form-row">
              <div className="col">
                Open from:{" "}
                <input
                  type="datetime-local"
                  value={openFrom}
                  onChange={(e) => {
                    console.log(openFrom);
                    setOpenFrom(
                      e.target.value.replace("T", " ").substring(0, 16) + ":00"
                    );
                  }}
                />
              </div>
              <div className="col">
                Open till:{" "}
                <input
                  type="datetime-local"
                  value={openFrom}
                  onChange={(e) => {
                    console.log(openTill);
                    setOpenTill(
                      e.target.value.replace("T", " ").substring(0, 16) + ":00"
                    );
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      {surveys.map((survey, i) => (
        <div
          id={"questionBlock" + i}
          key={i}
          onClick={(e) => {
            setEditable(survey.qid);
          }}
        >
          {(survey.type != "Title" && (
            <div className="qblock">
              <div className="qblockleft">
                <Question qn={survey.question} edit={editable == survey.qid} />
                <hr />
                <QuestionBlock
                  type={survey.type}
                  data={survey}
                  edit={editable == survey.qid}
                  setEditable={setEditable}
                />
              </div>
              {editable == survey.qid && (
                <div>
                  <OptionRight
                    qid={survey.qid}
                    changeQuestionType={changeQuestionType}
                    deleteQuestionBlock={deleteQuestionBlock}
                    data={survey}
                    copyQuestionBlock={copyQuestionBlock}
                  />
                </div>
              )}
            </div>
          )) || (
            <QuestionBlock
              type="Title"
              data={survey}
              edit={editable == survey.qid}
              setEditable={setEditable}
            />
          )}
          {/* {survey.qid != 1 && (
            <div>
              <select
                // defaultChecked={survey.type}
                defaultValue={survey.type}
                onChange={(e) => {
                  changeQuestionType(survey.qid, e.target.value);
                  // console.log(e);
                }}
              >
                <option value="TextAnswer">Text Answer</option>
                <option value="Title">Title</option>
                <option value="MultipleChoiceSingleCorrect">
                  Multiple Choice Single Correct
                </option>
                <option value="MultipleChoiceMultipleCorrect">
                  Multiple Choice Multiple Correct
                </option>
                <option value="Date">Date</option>
                <option value="Time">Time</option>
                <option value="Rating">Rating</option>
              </select>
              <button onClick={(e) => deleteQuestionBlock(survey.qid)}>
                delete
              </button>
            </div>
          )} */}
        </div>
      ))}
      <div className="submit-response">
        <div className="btn buttons" onClick={() => addQuestionBlock()}>
          <img src="/images/add_option.png" height="25" />
        </div>
      </div>
      <div className="submit-response">
        <button
          type="button"
          className="btn btn-primary"
          onClick={submitSurvey}
        >
          Submit
        </button>
      </div>
      {/* <button onClick={(e) => console.log(surveys)}>check</button> */}
    </div>
  );
};

export default EditSurvey;
