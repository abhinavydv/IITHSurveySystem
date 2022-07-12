import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/rating.css";
// import "../../public/css/"

export const QuestionBlock = (props) => {
  if (props.type == "Title") {
    return (
      <TitleDescription
        edit={props.edit}
        data={props.data}
        setEditable={props.setEditable}
      />
    );
  } else if (props.type == "TextAnswer") {
    return (
      <TextAnswer
        edit={props.edit}
        data={props.data}
        setEditable={props.setEditable}
      />
    );
  } else if (props.type == "MultipleChoiceSingleCorrect") {
    return (
      <MultipleChoiceSingleCorrect
        edit={props.edit}
        data={props.data}
        setEditable={props.setEditable}
      />
    );
  } else if (props.type == "MultipleChoiceMultipleCorrect") {
    return (
      <MultipleChoiceMultipleCorrect
        edit={props.edit}
        data={props.data}
        setEditable={props.setEditable}
      />
    );
  } else if (props.type == "Date") {
    return (
      <Date
        edit={props.edit}
        data={props.data}
        setEditable={props.setEditable}
      />
    );
  } else if (props.type == "Time") {
    return (
      <Time
        edit={props.edit}
        data={props.data}
        setEditable={props.setEditable}
      />
    );
  } else if (props.type == "Rating") {
    return (
      <Rating
        edit={props.edit}
        data={props.data}
        setEditable={props.setEditable}
      />
    );
  }
};

export const TitleDescription = (props) => {
  // console.log(props.edit);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [edit, setEdit] = useState(false);
  const data = props.data;
  if (title != data.title.text) {
    setTitle(data.title.text);
  }

  if (description != data.description.text) {
    setDescription(data.description.text);
  }

  // if (data.title.text == "") {
  //   data.title.text = "Needed!";
  // }
  // if (data.description.text == "") {
  //   data.description.text = "Needed";
  // }

  if (edit != props.edit) {
    setEdit(props.edit);
  }

  // return (
  //   <div id="title">
  //     <div>
  //       {(edit && (
  //         <input
  //           value={title}
  //           onChange={(e) => {
  //             setTitle(e.target.value);
  //             data.title.text = e.target.value;
  //           }}
  //         />
  //       )) || <div>{title || "Title here"}</div>}
  //     </div>
  //     <div>
  //       {(edit && (
  //         <input
  //           value={description}
  //           onChange={(e) => {
  //             setDescription(e.target.value);
  //             data.description.text = e.target.value;
  //           }}
  //         />
  //       )) || <p>{description || "description here"}</p>}
  //     </div>
  //   </div>
  // );

  return (
    <div className="qblock">
      <div className="">
        {(edit && (
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              // aria-label="Username"
              // aria-describedby="basic-addon1"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                data.title.text = e.target.value;
              }}
            />
          </div>
        )) || (
          <h1>
            {(title != "" && (
              <span className="label label-default">{title}</span>
            )) || <span className="label label-default faded">Title</span>}
          </h1>
        )}
        {(edit && (
          <div className="input-group">
            <textarea
              className="form-control"
              aria-label="With textarea"
              placeholder="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                data.description.text = e.target.value;
                // console.log(e);
              }}
            />
          </div>
        )) ||
          (description != "" && (
            <span className="label label-default">{description}</span>
          )) || <span className="label label-default faded">Description</span>}
      </div>
    </div>
  );
};

export const TextAnswer = (props) => {
  /*
    data = {
      qid: "TheID",
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
  // console.log(props.edit);
  const [edit, setEdit] = useState(false);
  const [textAnswer, setTextAnswer] = useState("");
  const [textQuestion, setTextQuestion] = useState("");
  const [questionImage, setQuestionImage] = useState("");
  const data = props.data;

  if (textAnswer != data.answer.text) {
    setTextAnswer(data.answer.text);
  }

  if (textQuestion != data.question.text) {
    setTextQuestion(data.question.text);
  }

  if (edit != props.edit) {
    setEdit(props.edit);
  }

  return (
    <div className="qblocktail">
      <div className="input-group">
        <textarea
          className="form-control"
          aria-label="With textarea"
          placeholder="Answer"
          rows={2}
          readOnly={true}
        ></textarea>
      </div>
    </div>
  );
};

const Option = (props) => {
  const edit = props.edit;
  const data = props.data;
  const [text, setText] = useState();
  if (text != data.text) setText(data.text);

  return (
    (edit && (
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <input
              type={props.type}
              checked={false}
              readOnly
              aria-label="Radio button for following text input"
            />
          </div>
        </div>
        <input
          type="text"
          className="form-control"
          name={props.qid}
          aria-label="Text"
          placeholder="Option"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            data.text = e.target.value;
          }}
        />
        {!props.removeCross && (
          <div className="input-group-append">
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => {
                props.removeOption(data.oid);
              }}
            >
              X
            </button>
          </div>
        )}
      </div>
    )) || (
      <div className="form-check">
        <input
          className="form-check-input"
          type={props.type}
          name="flexRadioDefault"
          id="flexRadioDefault1"
          checked={false}
          readOnly
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          {text}
        </label>
      </div>
    )
  );
};

export const MultipleChoiceSingleCorrect = (props) => {
  const [edit, setEdit] = useState(false);
  const [questionImage, setQuestionImage] = useState("");
  const [textQuestion, setTextQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const data = props.data;
  const [maxOid, setMaxOid] = useState(3);
  // console.log(data.question);

  if (textQuestion != data.question.text) setTextQuestion(data.question.text);
  if (options.length != data.options.length) setOptions(data.options);
  if (edit != props.edit) setEdit(props.edit);

  const addOption = () => {
    data.options.push({
      oid: maxOid,
      text: "Other option",
      image: "",
    });
    setMaxOid(maxOid + 1);
    setOptions(data.options);
  };

  const removeOption = (oid) => {
    data.options = data.options.filter((option) => {
      return option.oid != oid;
    });
    setOptions(data.options);
    // console.log(data);
    // console.log(options);
  };

  return (
    <div className="qblocktail">
      <div className="form-check">
        {/* </div> */}
        <div>
          {/* <div className="option-block-left">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              readOnly={true}
            />
          </div>
          <div className="option-block-middle">
            {edit && (
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-label="With textarea"
                  placeholder="Answer"
                  rows={2}
                  readOnly={true}
                ></input>
              </div>
            )}
          </div> */}
          {/* <div className="option-block-right"> */}
          {options.map((op, i) => (
            <Option
              type="radio"
              data={op}
              qid={data.qid}
              edit={edit}
              removeOption={removeOption}
              key={i}
              removeCross={options.length == 1}
            />
          ))}

          {edit && (
            <div className="btn buttons" onClick={() => addOption()}>
              <img src="/images/add_option.png" height="25" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const MultipleChoiceMultipleCorrect = (props) => {
  const [edit, setEdit] = useState(false);
  const [questionImage, setQuestionImage] = useState("");
  const [textQuestion, setTextQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const data = props.data;
  const [maxOid, setMaxOid] = useState(3);
  // console.log(data.question);

  if (textQuestion != data.question.text) setTextQuestion(data.question.text);
  if (options.length != data.options.length) setOptions(data.options);
  if (edit != props.edit) setEdit(props.edit);

  const addOption = () => {
    data.options.push({
      oid: maxOid,
      text: "Other option",
      image: "",
      checked: false,
    });
    setMaxOid(maxOid + 1);
    setOptions(data.options);
  };

  const removeOption = (oid) => {
    data.options = data.options.filter((option) => {
      return option.oid != oid;
    });
    setOptions(data.options);
    // console.log(data);
    // console.log(options);
  };

  return (
    <div className="qblocktail">
      <div className="form-check">
        {options.map((op, i) => (
          <Option
            type="checkbox"
            data={op}
            qid={data.qid}
            edit={edit}
            removeOption={removeOption}
            key={i}
            removeCross={options.length == 1}
          />
        ))}
        {edit && (
          <div className="btn buttons" onClick={() => addOption()}>
            <img src="/images/add_option.png" height="25" />
          </div>
        )}
      </div>
    </div>
  );
};

const Date = (props) => {
  const [edit, setEdit] = useState(false);
  const [textQuestion, setTextQuestion] = useState("");
  const [questionImage, setQuestionImage] = useState("");
  const [date, setDate] = useState("");
  const data = props.data;
  if (textQuestion != data.question.text) {
    setTextQuestion(data.question.text);
  }
  if (edit != props.edit) {
    setEdit(props.edit);
  }
  if (date != data.date) setDate(data.date);

  return (
    <div className="qblocktail">
      <input type="date" value={date} readOnly />
    </div>
  );
};
const Time = (props) => {
  const [edit, setEdit] = useState(false);
  const [textQuestion, setTextQuestion] = useState("");
  const [questionImage, setQuestionImage] = useState("");
  const [time, setTime] = useState("");
  const data = props.data;
  if (textQuestion != data.question.text) {
    setTextQuestion(data.question.text);
  }
  if (edit != props.edit) {
    setEdit(props.edit);
  }
  if (time != data.time) setTime(data.time);

  return (
    <div>
      <input type="time" value={time} readOnly />
    </div>
  );
};

const Rating = (props) => {
  const [edit, setEdit] = useState(false);
  const [textQuestion, setTextQuestion] = useState("");
  const [questionImage, setQuestionImage] = useState("");
  const [rating, setRating] = useState(0);
  const [style, setStyle] = useState({});
  const data = props.data;
  if (textQuestion != data.question.text) {
    setTextQuestion(data.question.text);
  }
  if (edit != props.edit) {
    setEdit(props.edit);
  }
  if (rating != data.time) setRating(data.time);

  return (
    <div>
      <div>
        <input
          className="rating"
          max="5"
          // onInput={() => {
          //   this.style.setProperty("--value", this.valueAsNumber);
          // }}
          step="1"
          style={style}
          type="range"
          value={rating}
          // onChange={(e) => {
          //   setRating(e.target.value);
          //   // console.log(e.target.value);
          //   setStyle({ "--value": e.target.value });
          // }}
          readOnly
        />
      </div>
    </div>
  );
};

export const Question = (props) => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  if (edit != props.edit) {
    setEdit(props.edit);
  }
  // console.log(props);
  if (props.qn)
    if (text != props.qn.text) {
      setText(props.qn.text);
    }
  return (
    <div className="qblockhead">
      {(edit && (
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Question"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              props.qn.text = e.target.value;
            }}
          />
        </div>
      )) ||
        (text && <span className="label label-default">{text}</span>) || (
          <span className="label label-default fade">Question</span>
        )}
    </div>
  );
};

export const OptionRight = (props) => {
  return (
    <div>
      <div className="qblockright">
        {/* <br /> */}
        <div className="block1">
          <div className="input-group mb-3">
            <select
              className="custom-select type-selector"
              id="inputGroupSelect01"
              onChange={(e) => {
                props.changeQuestionType(props.qid, e.target.value);
              }}
            >
              <option value="Title">Title</option>
              <option value="TextAnswer">Text</option>
              <option value="MultipleChoiceSingleCorrect">Single Choice</option>
              <option value="MultipleChoiceMultipleCorrect">
                Multiple Choice
              </option>
              <option value="Date">Date</option>
              <option value="Time">Time</option>
              <option value="Rating">Rating</option>
            </select>
          </div>
        </div>
        <div className="block2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={() => {
                props.data.required = true;
              }}
            />
            <span className="form-check-label" htmlFor="flexCheckDefault" />
            Required
            <span />
          </div>
        </div>
        <div className="block3">
          <a href="#" className="btn"></a>
        </div>
        <div className="copy-delete-div">
          <div className="btn buttons copy-button">
            <img
              src="/images/copy_icon.png"
              height="25px"
              onClick={() => props.copyQuestionBlock(props.qid)}
            />
          </div>
          <div className="buttons delete-button">
            <img
              className="btn "
              src="/images/delete_icon.png"
              height="40px"
              onClick={() => {
                props.deleteQuestionBlock(props.qid);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
