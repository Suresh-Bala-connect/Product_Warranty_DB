import React, { useContext, useEffect, useState } from "react";
import '../Css/Nav.css';
import { Link, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { authContext } from "../../App";

function NavBar() {

    // const [userName] = useState(localStorage.getItem("user_Name"));
    // const tokenData = useContext(authContext);
    const {token,setToken}=useContext(authContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/");
        // window.location.reload();
    }

    useEffect(()=>{
        if(!token){
            navigate('/');
        }
    },[token,navigate]);

    const userName=localStorage.getItem("user_Name")
    const id=localStorage.getItem("userId")
    console.log("===",userName)
    console.log("===",id)

    return (
        token &&
        <div className="navBar">
            <div className="nabBox ">
                <div className="navHead">
                    <h2>Product Warranty + Services Reminder,{userName}</h2>
                </div>
                <div className="navRight">
                    <button onClick={() => navigate("/dash")}>Dashboard</button>
                    <button onClick={() => navigate("/productList")}>ProductList</button>
                    {/* <button>Product</button> */}
                    <button onClick={() => navigate("/addProduct")}>Add Product</button>
                    {/* <button>Add Product</button> */}
                    {/* <button> Add Services Product</button> */}
                    {/* <button onClick={() => navigate("/addServiceProduct")}>Add Service Product</button> */}
                </div>
                <div className="logOut">
                    <button onClick={logout}>Log Out</button>
                </div>
            </div>

        </div>

        
    )
}

export default NavBar;