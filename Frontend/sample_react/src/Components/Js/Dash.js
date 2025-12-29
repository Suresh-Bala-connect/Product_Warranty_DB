import React, { useEffect, useContext, useState } from "react";
import '../Css/Dash.css';
import { authContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dash() {
    const navigate = useNavigate();

    const { token } = useContext(authContext);
    const [product, setProduct] = useState([]); //Getting All Product

    const [upComing, setUpComing] = useState(false)
    const [actWarrantycount, setActWarranty] = useState(false)
    const [expWarrantycount, setExpWarranty] = useState(false)

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    useEffect(() => {
        if (token) {
            navigate('/dash');
        }
    }, [token, navigate]);
    const userId = localStorage.getItem("userId");
    const productList = async () => {
        try {
            const result = await axios.get(`http://localhost:5022/product/${userId}`)
            setProduct(result.data.data)
        }
        catch (err) {
            console.error(
                "Error fetching products:",
                err.response?.data || err.message
            )
        }
    }

    const newProduct = product.filter(
        pro => pro.typeOfProduct === "new"
    );

    const serviceProduct = product.filter(
        pro => pro.typeOfProduct === "Service"
    );

    const proLength = product.length;

    const today = new Date();

    const actWarranty = product.filter(item =>
        new Date(item.warrantyEndDate) > today
    )
    const actWarrantyLength = actWarranty.length;

    const expWarranty = product.filter(item =>
        new Date(item.warrantyEndDate) < today
    )
    const expWarrantyLength = expWarranty.length;

    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 20);
    console.log(futureDate);

    const upcomingExpiries = product.filter(item => {
        const expiry = new Date(item.warrantyEndDate);
        const isNotExpired = expiry > today;
        const isExpiringSoon = expiry <= futureDate;

        return isNotExpired && isExpiringSoon;
    })

    const expiryDate = upcomingExpiries.length

    function getTop3data(list, limit) {
        const today = new Date();

        const validProduct = list.filter((item) => {
            return (
                item.warrantyEndDate &&
                new Date(item.warrantyEndDate) > today
            )
        })

        const sortProdut = [...validProduct].sort((a, b) => {
            return (
                new Date(a.warrantyEndDate) - new Date(b.warrantyEndDate)
            )
        })

        const top3Data = sortProdut.slice(0, limit)

        return top3Data;
    }
    const top3NewProduct = getTop3data(newProduct, 3);
    const top3ServiceProduct = getTop3data(serviceProduct, 3);



    useEffect(() => {
        productList();
        // getNewProduct();
    }, [])

    // function totalProduct(){

    //     console.log(result)
    // }
    // totalProduct();



    // async function getNewProduct() {
    //     console.log("hello")
    //     try {
    //         const result = product.filter(pro => {
    //             return (
    //                 pro.typeOfProduct === "new"
    //             )
    //         })
    //         setNewProduct(result)
    //     }
    //     catch (err) {
    //         console.error(
    //             "Error fetching products:",
    //             err.response?.data || err.message
    //         )
    //     }
    // }


    // useEffect(() => {
    //     if (product.length > 0) {
    //         getNewProduct();
    //     }
    // }, [product]);

    // useEffect(() => {
    //     window.history.pushState(null, "", window.location.href);

    //     window.onpopstate = function () {
    //         window.history.go(1);
    //     };
    // }, []);
    return (
        <div className="container">
            <div className="dashContainer">
                {/* Dashboard Count */}
                <div className="dashCount">
                    <h3>Product Warranty + Service Remainder Digital Wallet</h3>
                    <div className="totalProducts">
                        <h2>TotalProducts</h2><br></br>
                        <h3>{proLength}</h3>
                    </div>
                    <div className="activeWarranties"
                        onClick={() => setActWarranty(true)}>
                        <h2>Active Warranty</h2><br></br>
                        <h3>{actWarrantyLength}</h3>
                    </div>
                    <div className="expiredWarranties"
                        onClick={() => setExpWarranty(true)}>
                        <h2>Expired Warranties</h2><br></br>
                        <h3>{expWarrantyLength} </h3>
                    </div>
                    <div className="upcomingExpiries"
                        onClick={() => setUpComing(true)}>
                        <h2>UpcomingExpiries</h2><br></br>
                        <h3>{expiryDate}</h3>
                    </div>
                </div>
                {/* Upcoming Warranty Expiry */}
                <h2>Upcoming Warranty Expiry</h2>
                <table className="warrantyTable">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Brand</th>
                            <th>Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            top3NewProduct.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.productName}</td>
                                    <td>{item.brandName}</td>
                                    <td>{item.warrantyEndDate?.split("T")[0]}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>

                {/* Recent Service Expiry */}
                <h2>Recent Service Expiry</h2>
                <table className="warrantyTable">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Service Date</th>
                            <th>Service Center</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            top3ServiceProduct.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.productName}</td>
                                    <td>{item.brandName}</td>
                                    <td>{item.warrantyEndDate?.split("T")[0]}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {/* UpComing Warranty */}
                {
                    upComing && (
                        <div className="modalOverlay">
                            <div className="modalBox">
                                <div className="modalHeader">
                                    <h2>Upcoming Warranty Expiries</h2>
                                    <button
                                        className="closeBtn"
                                        onClick={() => setUpComing(false)}>
                                        ✖
                                    </button>
                                </div>

                                <table className="warrantyTable">
                                    <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Brand</th>
                                            <th>Expiry Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            upcomingExpiries.length > 0 ? (
                                                upcomingExpiries.map(item => (
                                                    <tr key={item._id}>
                                                        <td>{item.productName}</td>
                                                        <td>{item.brandName}</td>
                                                        <td>{item.warrantyEndDate?.split("T")[0]}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" style={{ textAlign: "center" }}>
                                                        No upcoming expiries
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    )
                }
                {/* Expired Warranty */}
                {
                    actWarrantycount && (
                        <div className="modalOverlay">
                            <div className="modalBox">
                                <div className="modalHeader">
                                    <h2>Upcoming Warranty Expiries</h2>
                                    <button
                                        className="closeBtn"
                                        onClick={() => setActWarranty(false)}>
                                        ✖
                                    </button>
                                </div>
                                <table className="warrantyTable">
                                    <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Brand</th>
                                            <th>Expiry Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            actWarranty.length > 0 ? (
                                                actWarranty.map(item => (
                                                    <tr key={item._id}>
                                                        <td>{item.productName}</td>
                                                        <td>{item.brandName}</td>
                                                        <td>{item.warrantyEndDate?.split("T")[0]}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" style={{ textAlign: "center" }}>
                                                        No upcoming expiries
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    )
                }
                {/* Active Warranty */}
                {
                    expWarrantycount && (
                        <div className="modalOverlay">
                            <div className="modalBox">
                                <div className="modalHeader">
                                    <h2>Upcoming Warranty Expiries</h2>
                                    <button
                                        className="closeBtn"
                                        onClick={() => setExpWarranty(false)}>
                                        ✖
                                    </button>
                                </div>
                                <table className="warrantyTable">
                                    <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Brand</th>
                                            <th>Expiry Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            expWarranty.length > 0 ? (
                                                expWarranty.map(item => (
                                                    <tr key={item._id}>
                                                        <td>{item.productName}</td>
                                                        <td>{item.brandName}</td>
                                                        <td>{item.warrantyEndDate?.split("T")[0]}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" style={{ textAlign: "center" }}>
                                                        No upcoming expiries
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
export default Dash;