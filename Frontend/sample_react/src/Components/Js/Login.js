// import React from "react";
import React, { useContext, useState ,useEffect } from "react";
// import { useState } from "react";
import '../Css/Login.css';
import { IoIosMailOpen } from "react-icons/io";
import { TbPasswordFingerprint } from "react-icons/tb";
import login from '../login.png'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authContext } from "../../App";

function Login() {

    const navigate = useNavigate();


    const { setToken } = useContext(authContext);
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");

    // error messages
    const [errUser, setErrUser] = useState("");
    const [errPass, setErrPass] = useState("");

    function handleLogin() {
        let valid = true;

        // Reset all errors
        setErrUser("");
        setErrPass("");

        if (userEmail.trim() === "") {
            setErrUser("Please enter your email");
            valid = false;
        }
        if (password === "") {
            setErrPass("Please enter your password");
            valid = false;
        }

        if (valid) {
            console.log("Logging in with:", { userEmail, password });
            // getAlluser();
            loginUser();
        }
    }

    const getAlluser = async () => {
        try {
            const response = await axios.get("https://product-warranty-db-backend.onrender.com/users")
            response.status === 200 && console.log("Users data:", response.data);
        }
        catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    const loginUser = async () => {
        try {
            const userDetails = {
                email: userEmail,
                password: password
            };
            console.log(userDetails);

            const response = await axios.post("https://product-warranty-db-backend.onrender.com/api/login", userDetails);
            console.log("------", response);

            if (response.data.success) {
                alert("Login Successful");
                console.log("response token", response.data.token);
                console.log("User ID",response.data.data._id )
                console.log("user_name",response.data.data.userName )
                console.log("User email",response.data.data.email )

                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId",response.data.data._id)
                localStorage.setItem("email",response.data.data.email)
                localStorage.setItem("user_Name",response.data.data.userName)
                // console.log(response.data);
                setToken(response.data.token);
                console.log("Logged in user data:", response.data);
                navigate("/dash");
            }
            else {
                alert("Invalid credentials");
            }
        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
                return;
            }
            else {
                alert("Server Error");
            }
            console.error("Error logging in:", error);
        }
    }
    // const { setToken } = useContext(authContext);

    useEffect(() => {
        // remove old token whenever login page loads
        localStorage.removeItem("token");
        setToken(null);
    }, []);
    return (
        <div>
            <div className="loginContainer">
                <div className="loginBox">
                    <div className="">
                        <h2>Hello</h2>
                        <p>Sign in to Your Account</p>
                    </div>
                    <div className="formInput">
                        <div className="userEmail">
                            <input type="text" placeholder="E -mail"
                                value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                            <IoIosMailOpen />
                        </div>
                        {errUser && <p className="err">{errUser}</p>}
                        <div className="userPassword">
                            <input type="password" placeholder="Password"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                            <TbPasswordFingerprint />
                        </div>
                        {errPass && <div className="err">{errPass}</div>}
                        <div className="forget">
                            <a href="#">Forget Password?</a>
                        </div>
                    </div>
                    <div className="loginBtn">
                        <button onClick={handleLogin}>Login In</button>
                    </div>
                    <div className="createAccount">
                        <p>Don't have an account? <span style={{ cursor: "pointer" }} onClick={() => navigate("/sign")}>Create Account</span></p>
                    </div>
                </div>
                <div className="textBox">
                    <div className="textHead">
                        <h2>Welcome Back!</h2>
                    </div>
                    <div className="textPara">
                        <img src={login} alt="loginImage" />
                        <p>To keep connected with us please login with your personal info</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;
