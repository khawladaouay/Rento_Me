import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Signup(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");

    const navigate = useNavigate();

    function handleSubmit(event) {
      event.preventDefault();
      const data = {
        username: userName,
        email: email,
        password: password,
      };
      axios
        .post("/auth/register", data)
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", JSON.stringify(res.data.token));
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return(
        <div className="d-flex justify-content-center align-items-center  vh-100">
            <div className="border p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label htmlFor="email">
                            <strong>Name</strong>
                        </label>
                        <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        className="form-control rounded-0"
                        />
                    </div>
                    <div className="m-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}

                        required
                        className="form-control rounded-0"
                        />
                    </div>
                    <div className="m-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-control rounded-0"
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        Register
                    </button>
                    <br></br>
                    <br />
                    <label>Have already an account?</label><Link to="/login">Login here</Link>
                </form>

            </div>

        </div>
    );
}

export default Signup;