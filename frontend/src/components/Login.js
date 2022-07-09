import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { back_ip, back_port } from "../urls";

axios.defaults.withCredentials = true;

const Login = () => {
  const [uid, setUid] = useState("");
  const [passwd, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const history = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    await axios
      .post("http://" + back_ip + ":" + back_port + "/login", {
        uid: uid,
        passwd: passwd,
      })
      .then((response) => {
        console.log(response);
        if (response.data.loggedIn) {
          history("/");
        } else {
          setLoginError(true);
        }
      });
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
      {loginError && <div>Wrong username or password</div>}
    </div>
  );
};

export default Login;
