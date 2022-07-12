import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
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
    // <div>
    //   <form onSubmit={login}>
    //     <div className="field">
    //       <label className="label">Username</label>
    //       <input
    //         className="input"
    //         type="text"
    //         placeholder="Email ID"
    //         value={uid}
    //         onChange={(e) => setUid(e.target.value)}
    //       />
    //     </div>
    //     <div className="field">
    //       <label className="label">Password</label>
    //       <input
    //         className="input"
    //         type="text"
    //         placeholder="Password"
    //         value={passwd}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </div>
    //     <div className="field">
    //       <button className="button is-primary">Save</button>
    //     </div>
    //   </form>
    //   {loginError && <div>Wrong username or password</div>}
    // </div>
    <div>
      <br />
      <div className="login_page">
        <form onSubmit={login}>
          <div className="form-outline mb-4">
            <input
              type="email"
              className="form-control"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              placeholder="Email"
            />
            <label className="form-label" htmlFor="form2Example1">
              Email address
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              value={passwd}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
          </div>

          {loginError && <div>Wrong username or password</div>}

          <button
            type="button"
            className="btn is-primary btn-primary btn-block mb-4"
            onClick={login}
          >
            Sign in
          </button>

          <div className="text-center">
            <p>
              Not a member? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
