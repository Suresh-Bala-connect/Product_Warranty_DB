
import Login from './Components/Js/Login';
import Sign from './Components/Js/Sign';
import NavBar from './Components/Js/NavBar';
import Dash from './Components/Js/Dash';
import AddProduct from './Components/Js/AddProduct ';
// import AddServiceProduct from './Components/Js/AddServiceProduct';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductList from './Components/Js/ProductList';
// import {  useEffect, useState} from 'react';
import { useEffect, useState, useContext } from 'react';

import { createContext } from 'react';
export const authContext = createContext();

function ProtectedRoute({ children }) {
  const {token} = useContext(authContext);
  return token ? children : <Navigate to="/" />;
}

function App() {
  const [token,setToken] = useState(()=>{
    return localStorage.getItem("token") || null;
  });
  // console.log("----",token);

  // useEffect(()=>{
  //   const savedToken = localStorage.getItem("token");
  //   if(savedToken){
  //     setToken(savedToken);
  //   }
  // },[])

  return (
    <div className="App">
      {/* <Login/> */}
      {/* <Sign/> */}
      {/* <NavBar/> */}
      {/* <Dash/> */}
      <authContext.Provider value={{token,setToken}}>
        <BrowserRouter>
          {/* <NavBar /> */}{token && <NavBar />}

          <Routes>
            <Route path="/sign" element={<Sign />} />
            <Route path="/" element={<Login />} />

             {/* PROTECTED ROUTES */}

             <Route
              path="/dash"
              element={
                <ProtectedRoute>
                  <Dash />
                </ProtectedRoute>     
              }
            />
            <Route
              path="/addProduct"
              element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              }
            />  
            {/* <Route
              path="/addServiceProduct"
              element={
                <ProtectedRoute>
                  <AddServiceProduct />
                </ProtectedRoute>
              }
            />
            */}
             <Route 
              path="/productList"
              element={
                <ProtectedRoute>
                  <ProductList />
                </ProtectedRoute>
              }
            />
            {/* <Route path='/dash' element={<Dash />} />
            <Route path='/addProduct' element={<AddProduct />} />
            <Route path='/addServiceProduct' element={<AddServiceProduct />} />
            <Route path='/productList' element={<ProductList />} /> */}
          </Routes>
        </BrowserRouter>
      </authContext.Provider>
    </div>
  );
}

export default App;
