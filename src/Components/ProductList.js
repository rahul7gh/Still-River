import { Badge } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AppContext from "../Context/Context";
import ProductCard from "./ProductCard";

function ProductList(){

    var AppCtx=useContext(AppContext);
    var backendUrl=AppCtx.backendUrl;
    const [products, setProducts] = useState([]);
    var [toggle,setToggle]=useState(false);
    // var [category,setCategory]=useState(AppCtx.category);

    var navigate=useNavigate();

    useEffect(() => {
        console.log("Re rendering ");
        fetch(backendUrl+"/product-service/products?category="+AppCtx.category,{method:"GET"})
            
            .then((res) => {
                //console.log(res);
                return res.json();
            }).then((res) => {
                console.log(res);
                setProducts(res);
                navigate("/")
            })
            .catch((err) => {
                console.log(err);
            });
    }, [toggle,AppCtx.category]);

    return(
        
        
        <div className="container-fluid my-5">
        
        <div className="row">
            
                {
            products.map(
                
                (product)=><div className="col-3"><ProductCard key={product.id} p={product} setToggle={setToggle}/></div>
                
            )
            }

            </div>
            
        </div>
            
       

    );
}
export default ProductList;