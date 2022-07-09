import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const LoginRequest = (props) => {
  return (
    <div>
      <Link to="/login"> Login </Link> to continue
    </div>
  );
};

export default LoginRequest;
