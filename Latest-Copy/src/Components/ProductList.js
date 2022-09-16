import { Badge } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AppContext from "../Context/Context";
import ProductCard from "./ProductCard";

function ProductList() {
  var AppCtx = useContext(AppContext);
  var backendUrl = AppCtx.backendUrl;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  var [toggle, setToggle] = useState(false);
  // var [category,setCategory]=useState(AppCtx.category);

  var navigate = useNavigate();

  useEffect(() => {
    console.log("Re rendering ");

    fetch(
      backendUrl + "/product-service/products?category=" + AppCtx.category,
      { method: "GET" }
    )
      .then((res) => {
        //console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setProducts(res);
        setLoading(false);
        AppCtx.setIsHome(true);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [toggle, AppCtx.category]);

  return (
    <div className="container-fluid my-5">
      {loading ? (
        <h3 className="text-primary">
          Loading Please wait...
          <div class="spinner-grow text-primary" role="status"></div>
        </h3>
      ) : (
        ""
      )}
      <div className="row gy-3">
        {products.map((product) => (
          <div className="col-lg-3 col-md-6 col-sm-9">
            <ProductCard key={product.id} p={product} setToggle={setToggle} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default ProductList;
