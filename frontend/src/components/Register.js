import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [passwd, setPasswd] = useState("");
  const history = useNavigate()
  const register = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/register", {
      uid: uid,
      name: name,
      passwd: passwd,
    });
    history("/");
  };

  return (
    <div>
      <form onSubmit={register}>
        <div className="field">
          <label className="label">Email</label>
          <input
            className="input"
            type="text"
            placeholder="Email ID"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">Name</label>
          <input
            className="input"
            type="text"
            placeholder="Email ID"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">Password</label>
          <input
            className="input"
            type="text"
            placeholder="Password"
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)}
          />
        </div>
        <div className="field">
          <button className="button is-primary">Save</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
