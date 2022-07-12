import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const ResponseBlock = (props) => {
  if (props.type == "Title") {
    return <TitleDescription data={props.data} viewOnly={props.viewOnly} />;
  } else if (props.type == "TextAnswer") {
    return <TextAnswer data={props.data} viewOnly={props.viewOnly} />;
  } else if (props.type == "MultipleChoiceSingleCorrect") {
    return (
      <MultipleChoiceSingleCorrect
        data={props.data}
        viewOnly={props.viewOnly}
      />
    );
  } else if (props.type == "MultipleChoiceMultipleCorrect") {
    return (
      <MultipleChoiceMultipleCorrect
        data={props.data}
        viewOnly={props.viewOnly}
      />
    );
  } else if (props.type == "Date") {
    return <Date data={props.data} viewOnly={props.viewOnly} />;
  } else if (props.type == "Time") {
    return <Time data={props.data} viewOnly={props.viewOnly} />;
  } else if (props.type == "Rating") {
    return <Rating data={props.data} viewOnly={props.viewOnly} />;
  }
};

export const TitleDescription = (props) => {
  // console.log(props.edit);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //   const [edit, setEdit] = useState(false);
  const data = props.data;
  if (title != data.title.text) {
    setTitle(data.title.text);
  }

  if (description != data.description.text) {
    setDescription(data.description.text);
  }

  //   if (edit != props.edit) {
  //     setEdit(props.edit);
  //   }

  return (
    <div id="title">
      <h1>
        {(title != "" && (
          <span className="label label-default">{title}</span>
        )) || <span className="label label-default faded">Title</span>}
      </h1>
      {description != "" && (
        <span className="label label-default">{description}</span>
      )}
    </div>
  );
};

export const TextAnswer = (props) => {
  const [textAnswer, setTextAnswer] = useState("");
  const [textQuestion, setTextQuestion] = useState("");
  const data = props.data;

  if (textAnswer != data.answer.text) {
    setTextAnswer(data.answer.text);
  }

  if (textQuestion != data.question.text) {
    setTextQuestion(data.question.text);
  }

  //   if (edit != props.edit) {
  //     setEdit(props.edit);
  //   }

  return (
    <div>
      {
        <input
          value={textAnswer}
          onChange={(e) => {
            setTextAnswer(e.target.value);
            data.answer.text = e.target.value;
          }}
          readOnly={props.viewOnly}
        />
      }
    </div>
  );
};

export const MultipleChoiceSingleCorrect = (props) => {
  //   const [edit, setEdit] = useState(false);
  const [questionImage, setQuestionImage] = useState("");
  const [textQuestion, setTextQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState("");
  const data = props.data;
  // console.log(data.question);

  if (textQuestion != data.question.text) setTextQuestion(data.question.text);
  if (options != data.options) setOptions(data.options);
  if (selected != data.chosen) setSelected(data.chosen);
  // console.log(selected, data.selected);

  const optionSelected = async (oid) => {
    setSelected(oid);
    data.chosen = oid;
  };

  return (
    <div id={data.qid}>
      {options.map((option, i) => (
        <div key={i}>
          <input
            type="radio"
            id={data.qid + "op_" + option.oid}
            name={data.qid}
            checked={option.oid == selected}
            onChange={(e) => {
              optionSelected(option.oid);
            }}
            readOnly={props.viewOnly}
          />
          {option.text}
          <br />
        </div>
      ))}
    </div>
  );
};

const CheckedInput = (props) => {
  const [checked, setChecked] = useState(false);
  if (checked != props.data.checked) {
    setChecked(props.data.checked);
  }

  // var value = props.oid in props.selected;
  // useEffect(() => {
  //   const value = props.data.chosen.findIndex((o) => o == props.oid) != -1;
  //   console.log(value, checked);

  //   if (checked != value) setChecked(value);
  // });

  return (
    <input
      type="checkbox"
      id={props.qid + "op_" + props.oid}
      checked={checked}
      onChange={(e) => {
        if (!props.viewOnly) {
          if (checked) {
            props.removeChosen(props.oid);
            props.data.checked = false;
            setChecked(false);
          } else {
            props.addChosen(props.oid);
            props.data.checked = true;
            setChecked(true);
          }
        }
        // console.log(e.target, checked);
        // console.log(
        //   props.data.chosen,
        //   props.oid,
        //   props.data.chosen.findIndex((o) => o == props.oid) != -1
        // );
      }}
      readOnly
    />
  );
};

export const MultipleChoiceMultipleCorrect = (props) => {
  //   const [edit, setEdit] = useState(false);
  const [questionImage, setQuestionImage] = useState("");
  const [textQuestion, setTextQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const data = props.data;
  // console.log(data.question);

  if (textQuestion != data.question.text) setTextQuestion(data.question.text);
  if (options != data.options) setOptions(data.options);
  // if (selected != data.chosen) setSelected(data.chosen);
  // console.log(selected, data.selected);

  const addChosen = (oid) => {
    data.chosen.push(oid);
    // setSelected(data.chosen);
    // console.log("Added", data.chosen);
  };

  const removeChosen = (oid) => {
    data.chosen = data.chosen.filter((o) => {
      return o != oid;
    });
    // setSelected(data.chosen);
    // console.log("removed", data.chosen);
  };

  return (
    <div id={data.qid}>
      {options.map((option, i) => (
        <div key={i}>
          {/* <input
            type="checkbox"
            id={data.qid + "op_" + option.oid}
            name={data.qid}
            checked={contains(selected, option.oid)}
            onClick={(e) => {
              if (!props.viewOnly) {
                if (e.target.value == false) removeChosen(option.oid);
                else addChosen(option.oid);
              }
            }}
            readOnly
          /> */}
          <CheckedInput
            oid={option.oid}
            qid={data.qid}
            addChosen={addChosen}
            removeChosen={removeChosen}
            viewOnly={props.viewOnly}
            data={option}
          />
          {option.text}
          <br />
        </div>
      ))}
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
      <input
        type="date"
        value={date}
        onChange={(e) => {
          if (!props.readOnly) {
            setDate(e.target.value);
            data.date = e.target.value;
          }
        }}
      />
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
      <input
        type="time"
        value={time}
        onChange={(e) => {
          if (!props.readOnly) {
            setTime(e.target.value);
            data.time = e.target.value;
            // console.log(e.target.value);
          }
        }}
        // readOnly
      />
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
  if (rating != data.rating) {
    setRating(data.rating);
    setStyle({ "--value": data.rating });
  }
  // console.log(data.rating);

  return (
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
        onChange={(e) => {
          if (!props.readOnly) {
            setRating(e.target.value);
            // console.log(e.target.value);
            setStyle({ "--value": e.target.value });
            data.rating = e.target.value;
          }
        }}
        readOnly={props.readOnly}
      />
    </div>
  );
};

export const Question = (props) => {
  // console.log(props);
  return (
    <div className="qblockhead">
      {(props.qn.question && props.qn.question.text != "" && (
        <span className="label label-default">{props.qn.question.text}</span>
      )) || <span className="label label-default fade">Question</span>}
    </div>
  );
};
