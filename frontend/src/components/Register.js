import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { back_ip, back_port } from "../urls";

const Register = () => {
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [passwd, setPasswd] = useState("");
  const [rePasswd, setRePasswd] = useState("");
  const [passwdUnmatch, setPasswdUnmatch] = useState(false);
  const [notFilled, setNotFilled] = useState(false);
  const history = useNavigate();
  const register = async (e) => {
    e.preventDefault();
    if (passwd != rePasswd) {
      setPasswdUnmatch(true);
      return;
    }
    if (name == "" || uid == "" || passwd == "") {
      setNotFilled(true);
      return;
    }
    await axios.post("http://" + back_ip + ":" + back_port + "/register", {
      uid: uid,
      name: name,
      passwd: passwd,
    });
    history("/");
  };

  return (
    // <div>
    //   <form onSubmit={register}>
    //     <div className="field">
    //       <label className="label">Email</label>
    //       <input
    //         className="input"
    //         type="text"
    //         placeholder="Email ID"
    //         value={uid}
    //         onChange={(e) => setUid(e.target.value)}
    //       />
    //     </div>
    //     <div className="field">
    //       <label className="label">Name</label>
    //       <input
    //         className="input"
    //         type="text"
    //         placeholder="Email ID"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //       />
    //     </div>
    //     for<div className="field">
    //       <label className="label">Password</label>
    //       <input
    //         className="input"
    //         type="text"
    //         placeholder="Password"
    //         value={passwd}
    //         onChange={(e) => setPasswd(e.target.value)}
    //       />
    //     </div>
    //     <div className="field">
    //       <button className="button is-primary">Save</button>
    //     </div>
    //   </form>
    // </div>

    <div className="login_page">
      <form>
        <div className="form-outline mb-4">
          <input
            type="text"
            id="registerName"
            className="form-control"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label className="form-label" htmlFor="registerName">
            Name
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="email"
            id="registerEmail"
            className="form-control"
            value={uid}
            onChange={(e) => {
              setUid(e.target.value);
            }}
          />
          <label className="form-label" htmlFor="registerEmail">
            Email
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="registerPassword"
            className="form-control"
            value={passwd}
            onChange={(e) => {
              setPasswd(e.target.value);
            }}
          />
          <label className="form-label" htmlFor="registerPassword">
            Password
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="registerRepeatPassword"
            className="form-control"
            value={rePasswd}
            onChange={(e) => {
              setRePasswd(e.target.value);
            }}
          />
          <label className="form-label" htmlFor="registerRepeatPassword">
            Repeat password
          </label>
        </div>

        {(passwdUnmatch && (
          <p>Password and re-entered passwords don't match</p>
        )) ||
          (notFilled && <p>All fields are mandatory</p>)}

        <button onClick={register} className="btn btn-primary btn-block mb-3">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
