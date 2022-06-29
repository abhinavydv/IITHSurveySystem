import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Login = () => {
  const [uid, setUid] = useState("");
  const [passwd, setPassword] = useState("");
  const history = useNavigate();
  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", {
        uid: uid,
        passwd: passwd,
      })
      .then((response) => {
        console.log(response);
      });
    history("/");
  };

  return (
    <div>
      <form onSubmit={login}>
        <div className="field">
          <label className="label">Username</label>
          <input
            className="input"
            type="text"
            placeholder="Email ID"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">Password</label>
          <input
            className="input"
            type="text"
            placeholder="Password"
            value={passwd}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="field">
          <button className="button is-primary">Save</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
