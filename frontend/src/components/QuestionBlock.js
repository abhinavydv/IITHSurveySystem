import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
  }
};

export const TitleDescription = (props) => {
  // console.log(props.edit);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [edit, setEdit] = useState(false);
  const data = props.data;
  if (title == "" || description == "") {
    setTitle(data.title.text);
    setDescription(data.description.text);
  }

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
        )) || <div>{title}</div>}
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
        )) || <p>{description}</p>}
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

  if (textAnswer == "" || textQuestion == "") {
    setTextAnswer(data.answer.text);
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
      )) || <div>{textQuestion}</div>}
      <div>
        <img src={questionImage} />
      </div>
      <div>
        {(edit && (
          <input
            value={textAnswer}
            onChange={(e) => {
              setTextAnswer(e.target.value);
              data.answer.text = e.target.value;
            }}
          />
        )) || <div>{textAnswer}</div>}
      </div>
    </div>
  );
};

export const MultipleChoiceSingleCorrect = (props) => {
  const [edit, setEdit] = useState(false);
  const [questionImage, setQuestionImage] = useState("");
  const [textQuestion, setTextQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState("");
  const data = props.data;
  const [maxOid, setMaxOid] = useState(3);
  // console.log(data.question);

  if (textQuestion == "") setTextQuestion(data.question.text);
  if (options.length == 0) setOptions(data.options);

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

  const optionSelected = async (option) => {
    console.log(option);
  };

  return (
    <div id={data.qid}>
      <div>{textQuestion}</div>

      <img src={questionImage} />

      {options.map((option, i) => (
        <div key={i}>
          <input
            type="radio"
            id={data.qid + "op_" + option.oid}
            name={data.qid}
            onClick={optionSelected}
          />
          {option.text}
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
