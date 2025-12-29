import '../Css/ProductList.css';
import { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {

    const [Product, setProduct] = useState([]);
    const [filterProduct, setFilterProduct] = useState([]);
    // const [getName, setName] = useState([])
    const [viewProduct, setviewProduct] = useState(false)
    const [prdDetail, setproDetail] = useState([])

    const [isEdit, setEdit] = useState(false);
    const [editProduct, setEditProduct] = useState()


    function handleName(e) {
        const name = e.target.value
        if (name === "") {
            setFilterProduct(Product);
        }
        else {
            const filterProduct = Product.filter((item) => {
                return (
                    item.productName.toLowerCase().includes(name.toLocaleLowerCase())
                )
            })
            setFilterProduct(filterProduct)
        }
    }
    const userId = localStorage.getItem("userId");

    const resultProduct = async () => {
        try {
            const result = await axios.get(`https://product-warranty-db-backend.onrender.com/product/${userId}`);
            setProduct(result.data.data);
            setFilterProduct(result.data.data);
            localStorage.setItem("product",result.data.data);
        }
        catch (err) {
            console.error(
                "Error fetching products:",
                err.response?.data || err.message
            );
        }
    };

    useEffect(() => {
        resultProduct();
    }, []);

    function handleDelete(id) {

        var deleteConfirm = window.confirm("Do You Want Delete")
        if (!deleteConfirm) {
            return;
        }
        // console.log("name", id)
        // alert("Delete Data")
        const deleteProduct = async () => {
            try {
                const delResult = await axios.delete(`https://product-warranty-db-backend.onrender.com/delete/${id}`)
                console.log(delResult)
                if (delResult.data.success) {
                    resultProduct();
                }
                // setProduct(delResult.data.data)
            }
            catch (err) {
                console.error(
                    "Error fetching products:",
                    err.response?.data || err.message
                );
            }
        }
        deleteProduct();
    }
    function handleView(id) {
        // console.log("Hi", id);
        const datas = id;
        // setproDetail([datas]);
        setproDetail(datas)
        console.log(datas);
        setviewProduct(true);
        console.log(prdDetail)
    }
    function handleEdit(item) {
        console.log(item)
        setviewProduct(false)
        setEdit(true)
        setEditProduct(item)
    }
    // function handleUpdate(id) {
    //     console.log("Update ID", id);
    // }
    async function handleUpdate() {
        console.log("Update Product", editProduct);
        try {
            const res = await axios.put(
                `https://product-warranty-db-backend.onrender.com/update/${editProduct._id}`,
                editProduct
            );

            if (res.data.success) {
                alert("Product Updated Successfully");
                setEdit(false);
                setviewProduct(false);
                resultProduct(); // refresh list
            }
        } catch (err) {
            console.error(err);
            alert("Error updating product");
        }
    }

    return (
        <div className="productListContainer">
            <div className="productListBox">
                <div className="productListHeader">
                    <h2>Product List</h2>
                </div>

                <div className="productListSearch">
                    <label>Products & Service Items By Name:</label>
                    <input type="text" placeholder="Search Items..."
                        onChange={handleName} />
                </div>

                <div className="productListTable">
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Purchase Date</th>
                                <th>Warranty End Date</th>
                                <th>Important Notes</th>
                                <th>View</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterProduct.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.productName}</td>
                                        <td>{item.purchaseDate?.split("T")[0]}</td>
                                        <td>{item.warrantyEndDate?.split("T")[0]}</td>
                                        <td>{item.importantNotes}</td>
                                        {/* <button>Delete</button> */}
                                        <td><button onClick={() => handleView(item)}>View</button></td>
                                        <td><button onClick={() => handleDelete(item._id)}>Delete</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="productData">
                    {
                        viewProduct && (
                            <div className="modalContainer">
                                <div className="modelBox">
                                    <div className="Header">
                                        <h2>Product Details</h2>
                                        <button
                                            className="closeBtn"
                                            onClick={() => setviewProduct(false)}>
                                            ✖
                                        </button>
                                    </div>
                                    <table className="productTable">
                                        <thead>
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Category</th>
                                                <th>Type of Product</th>
                                                <th>Brand Name</th>
                                                <th>Model Number</th>
                                                <th>Serial Number</th>
                                                <th>Purchase Date</th>
                                                <th>warranty Months</th>
                                                <th>Warranty End Date</th>
                                                <th>Bill Image</th>
                                                <th>Shop Name</th>
                                                <th>Important Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                prdDetail ? (
                                                    <tr>
                                                        <td>{prdDetail.productName}</td>
                                                        <td>{prdDetail.catagory}</td>
                                                        <td>{prdDetail.typeOfProduct}</td>
                                                        <td>{prdDetail.brandName}</td>
                                                        <td>{prdDetail.modelNumber}</td>
                                                        <td>{prdDetail.serialNumber}</td>
                                                        <td>{prdDetail.purchaseDate?.split("T")[0]}</td>
                                                        <td>{prdDetail.warrantyMonths}</td>
                                                        <td>{prdDetail.warrantyEndDate?.split("T")[0]}</td>
                                                        {/* <td><img src={`localhost:5022/uploads/${prdDetail.billImage}`}></img></td> */}
                                                        <td>{prdDetail.billImage}</td>
                                                        <td>{prdDetail.shopName}</td>
                                                        <td>{prdDetail.importantNotes}</td>
                                                    </tr>
                                                ) : (
                                                    <tr>
                                                        <td>
                                                            No upcoming expiries
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                    <div className="editButton">
                                        <button onClick={() => handleEdit(prdDetail)}>Update</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="productDatas">
                    {
                        isEdit && (
                            <div className="modalContainer">
                                <div className="modelBox">
                                    <div className="Header">
                                        <h2>Update Product Details</h2>
                                        <button
                                            className="closeBtn"
                                            onClick={() => setEdit(false)}>
                                            ✖
                                        </button>
                                    </div>
                                    <div className="productData">
                                        <div className='dataDetail'>
                                            <label>Product Name</label>
                                            <input type="text" value={editProduct.productName}
                                                onChange={(e) => setEditProduct({ ...editProduct, productName: e.target.value })} />
                                            <label>Catagory</label>
                                            <input type="text" value={editProduct.catagory}
                                                onChange={(e) => setEditProduct({ ...editProduct, catagory: e.target.value })} />
                                            <label>Type of Products</label>
                                            <input type="text" value={editProduct.typeOfProduct}
                                                onChange={(e) => setEditProduct({ ...editProduct, typeOfProduct: e.target.value })} />
                                            <label>Brand Name</label>
                                            <input type="text" value={editProduct.brandName}
                                                onChange={(e) => setEditProduct({ ...editProduct, brandName: e.target.value })} />
                                            <label>Model Number</label>
                                            <input type="text" value={editProduct.modelNumber}
                                                onChange={(e) => setEditProduct({ ...editProduct, modelNumber: e.target.value })} />
                                            <label>Serial Number</label>
                                            <input type="text" value={editProduct.serialNumber}
                                                onChange={(e) => setEditProduct({ ...editProduct, serialNumber: e.target.value })} />
                                            <label>PurchaseDate</label>
                                            <input type="text" value={editProduct.purchaseDate}
                                                onChange={(e) => setEditProduct({ ...editProduct, purchaseDate: e.target.value })} />
                                            <label>Warranty (in Months)</label>
                                            <input type="text" value={editProduct.warrantyMonths}
                                                onChange={(e) => setEditProduct({ ...editProduct, warrantyMonths: e.target.value })} />
                                            <label>Warranty End Date</label>
                                            <input type="text" value={editProduct.warrantyEndDate}
                                                onChange={(e) => setEditProduct({ ...editProduct, warrantyEndDate: e.target.value })} />
                                            <label>Upload Bill (Image)</label>
                                            <input type="file" accept="image/*"
                                                onChange={(e) => setEditProduct({ ...editProduct, billImage: e.target.files[0] })} />
                                            {/* <input type="file" id="billImage" accept="image/*"
                                                onChange={(e) => setUploadImage(e.target.files[0])} /> */}
                                            <label>Shop Name</label>
                                            <input type="text" value={editProduct.shopName}
                                                onChange={(e) => setEditProduct({ ...editProduct, shopName: e.target.value })} />
                                            <label for="importantNotes">Important Notes</label>
                                            <input type="text" value={editProduct.importantNotes}
                                                onChange={(e) => setEditProduct({ ...editProduct, importantNotes: e.target.value })} />

                                        </div>
                                        <div className="buttonContainer">
                                            <div className="update">
                                                <button onClick={() => handleUpdate(editProduct._id)}>Confirm Update</button>
                                            </div>
                                            <div className="cancel">
                                                <button onClick={() => setEdit(false)}>Cancel Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductList;
