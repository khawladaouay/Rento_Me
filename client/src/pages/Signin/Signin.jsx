import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./signin.css";

const Signin = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      console.log(res)

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center  vh-100">
      <div className="bg-white border p-3 rounded w-25">
        <h2>Login</h2>
      <div className="m-3">
        <label>
          <strong>Username</strong>
        </label>
      <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="form-control rounded-0"
        />
      </div>
        <div className="m-3">
        <label htmlFor="password">
          <strong>Password</strong>
        </label>
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="form-control rounded-0"
        />
        </div>
        <button disabled={loading} onClick={handleClick} className="btn btn-success w-100">
          Login
        </button>
        <br></br>
        <br />
        <label>Don't have an account register here!</label><Link to="/signup">Register</Link>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Signin;