import React from "react";
import '../Css/Add.css';
import { useState } from "react";
// import axios from axios
import axios from "axios";

function AddProduct() {

    const [getProductName, setProductName] = useState('');
    const [getCatagory, setCatagory] = useState('');
    const [getTypeOfProduct, setTypeOfProduct] = useState('');
    const [getBrandName, setBrandName] = useState('');
    const [getModelNumber, setModelNumber] = useState('');
    const [getSerialNumber, setSerialNumber] = useState('');
    const [getPurchaseDate, setPurchaseDate] = useState('');
    const [getWarrantyMonths, setWarrantyMonths] = useState('');
    const [getWarrantyDate, setWarrantyDate] = useState('');
    const [getUploadImage, setUploadImage] = useState(null);
    const [getShopName, setShopName] = useState('');
    const [getImportantNotes, setImportantNotes] = useState("");

    // const getImportantNotes="This is a read only value"

    // const [data, setData] = useState([]);
    const user_Id=localStorage.getItem("userId")

    function handleSubmit(e) {
        console.log("Form submitted");
        e.preventDefault();
        const formData = new FormData();

        // formData.append('products', JSON.stringify(data));
        formData.append('userId',user_Id)
        formData.append('productName', getProductName);
        formData.append('catagory', getCatagory);
        formData.append('typeOfProduct', getTypeOfProduct);
        formData.append('brandName', getBrandName);
        formData.append('modelNumber', getModelNumber);
        formData.append('serialNumber', getSerialNumber);
        formData.append('purchaseDate', getPurchaseDate);
        formData.append('warrantyMonths', getWarrantyMonths);
        formData.append('warrantyEndDate', getWarrantyDate);
        formData.append('billImage', getUploadImage);
        formData.append('shopName', getShopName);
        formData.append('importantNotes', getImportantNotes);
        console.log("Form Data:", formData);
        console.log("Bill Image File:", formData.get("billImage"));

        try {
            const result = axios.post("http://localhost:5022/addproduct", formData, {
                headers: {
                    "Context-Types": "multipart/form-data"
                }
            })
            console.log("Success", result.data)
            alert("Product added successfully");
        }
        catch (err) {
            console.error("ERROR:", err.response?.data || err.message);
            alert("Error adding product");
        }
        handleCancel();
    }

    function handleCancel() {
        // Clear all input fields
        setProductName('');
        setCatagory('');
        setTypeOfProduct('');
        setBrandName('');
        setModelNumber('');
        setSerialNumber('');
        setPurchaseDate('');
        setWarrantyMonths('');
        setWarrantyDate('');
        setUploadImage('');
        setShopName('');
        setImportantNotes('');
    }

    const calculateWarrantyPeriod = (months) => {
        if(!getPurchaseDate){
            alert("select Your Purchase Date")
        }
        else{
            setWarrantyMonths(months);

        const date = new Date(getPurchaseDate);
        date.setMonth(date.getMonth() + Number(months));

        const formattedDate = date.toISOString().split("T")[0];

        setWarrantyDate(formattedDate);
        }
        
    };

    return (
        <div className="addContainer">

            <div className="addBox">
                <form>
                    <h2>This is Add Product Page</h2>
                    <div className="inputBox">
                        <label>Product Name</label>
                        <input type="text" placeholder="Enter Product Name"
                            value={getProductName} onChange={(e) => setProductName(e.target.value)} />
                    </div>
                    <div className="catagory">
                        <label>Catagory</label>
                        <select value={getCatagory} onChange={(e) => setCatagory(e.target.value)}>
                            <option>---Select Catagory---</option>
                            {/* <!-- Electronics --> */}
                            <option value="mobile_phone">Mobile Phone</option>
                            <option value="laptop">Laptop</option>
                            <option value="tablet">Tablet</option>
                            <option value="smart_watch">Smart Watch</option>
                            <option value="bluetooth_headset">Bluetooth Headset</option>
                            <option value="power_bank">Power Bank</option>
                            <option value="smart_tv">Smart TV</option>
                            <option value="home_theater">Home Theater</option>
                            <option value="set_top_box">Set-top Box</option>
                            <option value="wifi_router">WiFi Router</option>
                             <option value="print">Printer</option>
                              <option value="hard">Hard Disk</option>

                            {/* <!-- Home Appliances --> */}
                            <option>---Home Appliances---</option>
                            <option value="refrigerator">Refrigerator</option>
                            <option value="washing_machine">Washing Machine</option>
                            <option value="air_conditioner">Air Conditioner (AC)</option>
                            <option value="water_purifier">Water Purifier</option>
                            <option value="mixer_grinder">Mixer Grinder</option>
                            <option value="microwave_oven">Microwave Oven</option>
                            <option value="induction_stove">Induction Stove</option>
                            <option value="electric_kettle">Electric Kettle</option>
                            <option value="fan">Fan</option>
                            <option value="iron_box">Iron Box</option>
                             <option value="firdge">Firdge</option>
                             <option value="tele">Telelvison</option>

                            {/* <!-- Vehicle Related --> */}
                            <option>---Vehicle Related---</option>
                            <option value="two_wheeler">Two Wheeler</option>
                            <option value="car_battery">Car Battery</option>
                            <option value="bike_tyres">Bike Tyres</option>
                            <option value="helmet">Helmet</option>
                            <option value="car_dash_camera">Car Dashboard Camera</option>

                            {/* <!-- Small Devices --> */}
                            <option>---Small Devices---</option>
                            <option value="emergency_light">Emergency Light</option>
                            <option value="drill_machine">Drill Machine</option>
                            <option value="trimmer">Trimmer</option>
                            <option value="hair_dryer">Hair Dryer</option>
                            <option value="ups_inverter">UPS / Inverter</option>

                            {/* <!-- Home Items --> */}
                            <option>---Home Items---</option>
                            <option value="mattress">Mattress</option>
                            <option value="water_heater">Water Heater (Geyser)</option>
                            <option value="ceiling_light">Ceiling Light / Tube Light</option>
                            <option value="solar_panel">Solar Panel</option>
                            <option value="cctv_camera">CCTV Camera</option>

                        </select>
                    </div>
                    <div className="inputWarrantyMonths">
                        <label>Type of Products</label>
                        <select value={getTypeOfProduct} onChange={(e) => setTypeOfProduct(e.target.value)}>
                            <option>---Select Product Type---</option>
                            <option value="new">New AddProduct</option>
                            <option value="Service">Service Product</option>

                        </select>
                    </div>
                    <div className="inputBrand">
                        <label>Brand Name</label>
                        <input type="text" placeholder="Enter Brand Name"
                            value={getBrandName} onChange={(e) => setBrandName(e.target.value)} />
                    </div>
                    <div className="inputModelNumber">
                        <label>Model Number</label>
                        <input type="text" placeholder="Enter Model Number"
                            value={getModelNumber} onChange={(e) => setModelNumber(e.target.value)} />
                    </div>
                    <div className="inputSerialNumber">
                        <label>Serial Number</label>
                        <input type="text" placeholder="Enter Serial Number"
                            value={getSerialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
                    </div>
                    <div className="inputPurchaseDate">
                        <label>PurchaseDate</label>
                        <input type="date" placeholder="Enter Purchase Date"
                            value={getPurchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
                    </div>
                    <div className="inputWarrantyMonths">
                        <label>Warranty (in Months)</label>
                        <select value={getWarrantyMonths} onChange={(e) => calculateWarrantyPeriod(e.target.value)}>
                            <option>---Select Warranty Period---</option>
                            <option value="6">6 Months</option>
                            <option value="12">12 Months</option>
                            <option value="18">18 Months</option>
                            <option value="24">24 Months</option>
                            <option value="36">36 Months</option>
                            <option value="48">48 Months</option>
                            <option value="60">60 Months</option>
                        </select>
                    </div>
                    <div className="inputWarrantyEndDate">
                        <label>Warranty End Date</label>
                        <input type="date" placeholder="Enter Warranty End Date"
                            value={getWarrantyDate} onChange={(e) => setWarrantyDate(e.target.value)}
                            readOnly={true} />
                    </div>
                    <div class="inputBillImage">
                        <label>Upload Bill (Image)</label>
                        <input type="file" id="billImage" accept="image/*"
                            onChange={(e) => setUploadImage(e.target.files[0])} />
                    </div>
                    <div className="inputShopName">
                        <label>Shop Name</label>
                        <input type="text" placeholder="Enter Shop Name"
                            value={getShopName} onChange={(e) => setShopName(e.target.value)}
                             />
                    </div>
                    <div class="inputImportantNotes">
                        <label for="importantNotes">Important Notes</label>
                        <textarea rows="3" value={getImportantNotes} onChange={(e) => setImportantNotes(e.target.value)}
                            placeholder="Eg: Extended warranty added for 2 more years, service center contact number etc."></textarea>
                    </div>
                    <div className="submitButton">
                        <button type="button" onClick={handleSubmit} >Add Product</button>
                    </div>
                    <div className="cancelButton">
                        <button type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddProduct;