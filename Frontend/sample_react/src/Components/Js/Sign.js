import React, { useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import reg from '../reg.png'
import '../Css/Sign.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Sign() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [repeatPass, setRepeatPass] = useState("");

    // error messages
    const [nameErr, setNameErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passErr, setPassErr] = useState("");
    const [repeatErr, setRepeatErr] = useState("");

    const [exitUser,setexitUser]=useState();

    function handleSubmit() {

        let valid = true;

        // Reset all errors
        setNameErr("");
        setEmailErr("");
        setPassErr("");
        setRepeatErr("");

        // Name validation
        if (!name.trim()) {
            setNameErr("Please enter your name");
            valid = false;
        }

        // Email validation
        const mailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            setEmailErr("Please enter your email");
            valid = false;
        } else if (!mailCheck.test(email)) {
            setEmailErr("Enter a valid email");
            valid = false;
        }

        // Password validation
        if (!pass) {
            setPassErr("Please enter password");
            valid = false;
        } else if (pass.length < 6) {
            setPassErr("Password must be at least 6 characters");
            valid = false;
        }

        // Repeat Password validation
        if (!repeatPass) {
            setRepeatErr("Please repeat your password");
            valid = false;
        } else if (pass !== repeatPass) {
            setRepeatErr("Passwords do not match");
            valid = false;
        }

        if (!valid) return;

        // alert("Registration successful!");
        userCreated();
    }
    const userDetails = {
        userName: name,
        email: email,
        password: pass,
        repeatPassword: repeatPass
    };

    const userCreated = async () => {
        const userDetails = {
            userName: name,
            email: email,
            password: pass,
            repeatPassword: repeatPass
        };
        try {
            const response = await axios.post('https://product-warranty-db-backend.onrender.com/create', userDetails)
            console.log(response);
            
            if (response.data.success) {
                alert(response.data.message);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userEmail",response.dataemail);
                console.log(response.data);
                navigate("/");
            }else{
                // console.log(response.data.message);
                alert(response.data.message);
            }
        }
        catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                alert(error.response.data.message);
                setexitUser(error.response.data.message);
                return;
               }
               else{ 
                alert("Server Error");
                  }
            console.error('Error:', error);
        }
    }

   
    return (
        <div>
            <div className="singContainer">

                <div className="textBox">
                    <div className="textHead">
                        <h2>Hello, Friend!</h2>
                    </div>
                    <div className="textPara">
                        <img src={reg} alt="regImage" />
                        <p>Enter your personal details and start journey with us</p>
                    </div>
                    <div className="createAccount">
                        <p> Have an account? <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Login</span></p>
                    </div>
                </div>

                <div className="signBox">
                    <h2>Sign Up</h2>

                    <div className="formInput">

                        {/* NAME */}
                        <div className="userName">
                            <input
                                type="text"
                                placeholder="User Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <FaUserCheck />
                        </div>
                        {nameErr && <p className="err">{nameErr}</p>}

                        {/* EMAIL */}
                        <div className="userEmail">
                            <input
                                type="text"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <FaMailBulk />
                        </div>
                        {emailErr && <p className="err">{emailErr}</p>}
                        {exitUser && <p className="err">{exitUser}</p>}

                        {/* PASSWORD */}
                        <div className="userPassword">
                            <input
                                type="password"
                                placeholder="Password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />
                            <MdOutlinePassword />
                        </div>
                        {passErr && <p className="err">{passErr}</p>}

                        {/* REPEAT PASSWORD */}
                        <div className="repeatPassword">
                            <input
                                type="password"
                                placeholder="Repeat Your Password"
                                value={repeatPass}
                                onChange={(e) => setRepeatPass(e.target.value)}
                            />
                            <MdOutlinePassword />
                        </div>
                        {repeatErr && <p className="err">{repeatErr}</p>}

                    </div>

                    <div className="signBtn">
                        <button onClick={handleSubmit}>Register</button>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default Sign;
