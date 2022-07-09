import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/rating.css";

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

  return (
    <div id="title">
      <div>
        {(edit && (
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              data.title.text = e.target.value;
            }}
          />
        )) || <div>{title || "Title here"}</div>}
      </div>
      <div>
        {(edit && (
          <input
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              data.description.text = e.target.value;
            }}
          />
        )) || <p>{description || "description here"}</p>}
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
    <div>
      {(edit && (
        <input
          value={textQuestion}
          onChange={(e) => {
            setTextQuestion(e.target.value);
            data.question.text = e.target.value;
          }}
        />
      )) || <div>{textQuestion || "Question Here"}</div>}
      <div>
        <img src={questionImage} />
      </div>
      <div>
        {(edit && <input value="" readOnly />) || (
          <div>{textAnswer || "Short answer text"}</div>
        )}
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
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          data.text = e.target.value;
        }}
      />
    )) ||
    text
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
    <div id={data.qid}>
      {(edit && (
        <input
          value={textQuestion}
          onChange={(e) => {
            setTextQuestion(e.target.value);
            data.question.text = e.target.value;
          }}
        />
      )) || <div>{textQuestion || "Question Here"}</div>}

      <img src={questionImage} />

      {options.map((option, i) => (
        <div key={i}>
          <input
            type="radio"
            id={data.qid + "op_" + option.oid}
            name={data.qid}
            checked={false}
            readOnly
          />
          <Option edit={edit} data={option} />
          {options.length == 1 || (
            <button
              onClick={(e) => {
                removeOption(option.oid);
              }}
            >
              X
            </button>
          )}
          <br />
        </div>
      ))}
      <div>
        <button onClick={addOption}>Add option</button>
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
    <div id={data.qid}>
      {(edit && (
        <input
          value={textQuestion}
          onChange={(e) => {
            setTextQuestion(e.target.value);
            data.question.text = e.target.value;
          }}
        />
      )) || <div>{textQuestion || "Question Here"}</div>}

      <img src={questionImage} />

      {options.map((option, i) => (
        <div key={i}>
          <input
            type="checkbox"
            id={data.qid + "op_" + option.oid}
            checked={false}
            readOnly
          />
          <Option edit={edit} data={option} />
          {options.length == 1 || (
            <button
              onClick={(e) => {
                removeOption(option.oid);
              }}
            >
              X
            </button>
          )}
          <br />
        </div>
      ))}
      <div>
        <button onClick={addOption}>Add option</button>
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
    <div>
      {(edit && (
        <input
          value={textQuestion}
          onChange={(e) => {
            setTextQuestion(e.target.value);
            data.question.text = e.target.value;
          }}
        />
      )) || <div>{textQuestion || "Question Here"}</div>}
      <div>
        <img src={questionImage} />
      </div>
      <div>
        <input type="date" value={date} readOnly />
      </div>
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
      {(edit && (
        <input
          value={textQuestion}
          onChange={(e) => {
            setTextQuestion(e.target.value);
            data.question.text = e.target.value;
          }}
        />
      )) || <div>{textQuestion || "Question Here"}</div>}
      <div>
        <img src={questionImage} />
      </div>
      <div>
        <input type="time" value={time} readOnly />
      </div>
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
      {(edit && (
        <input
          value={textQuestion}
          onChange={(e) => {
            setTextQuestion(e.target.value);
            data.question.text = e.target.value;
          }}
        />
      )) || <div>{textQuestion || "Question Here"}</div>}
      <div>
        <img src={questionImage} />
      </div>
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
