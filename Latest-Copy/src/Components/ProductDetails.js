import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../Context/Context";

function ProductDetails() {

    var AppCtx = useContext(AppContext);
    var backendUrl = AppCtx.backendUrl;
    const [loading, setLoading] = useState(false);
    var data;
    var { id } = useParams();

    const [product, setProduct] = useState({ id: 1, description: "lol", image: "" });
    useEffect(() => {
        setLoading(true)
        fetch(backendUrl + "/product-service/products/" + id, { method: "GET" })

            .then((res) => {
                console.log(res);
                return res.json();
            }).then((res) => {
                data = res.image;
                getImg();
                //console.log(res);
                setProduct(res);
                setLoading(false)
                AppCtx.setIsHome(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    //const data = product.image;
    const [imgUrl, setImgUrl] = useState();

    const getImg = async () => {
        const response = await fetch(`data:image/jpeg;base64,${data}`);
        const imageBlob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);
        reader.onloadend = () => {
            const base64data = reader.result;
            setImgUrl(base64data);
        };
    };


    setTimeout(() => console.log("Ended"), 1000)
    return (

        <div className="card mt-5">

        {loading ? (
                <h3 className="text-primary">
                Loading Please wait...
                <div class="spinner-grow text-primary" role="status"></div>
                </h3>
            ) : ""}

            <img width="30%" style={{ margin: "auto" }} className="img-thumbnail object-cover mb-3 overflow-hidden" src={imgUrl} alt="" />

            <div className="card-body">
                <center><h4>{product.title}</h4></center>
                <h5>Product Details: </h5><p class="card-text">{product.description}</p>
                <h5>Price: </h5><p class="card-text">&#8377;{product.price}</p>
                <h5>Product Origin: </h5><p class="card-text">{product.vendor}</p>
            </div>
            <div className="card-footer row">

                {
                    String(localStorage.getItem("role")) == "ADMIN" ? <div class="col-sm-3 mb-1 d-flex flex-row justify-content-between"><Link to={"/product/delete/" + product.id} className="me-2 btn btn-sm btn-outline-danger">Delete</Link>
                        <Link to={"/product/update/" + product.id} className="me-2 btn btn-sm btn-success">Update</Link>
                        <Link to="/" style={{width:"auto"}} className="col-sm-1 ms-auto me-2 btn btn-sm btn-warning">Home <i class="bi bi-house-door"></i></Link>
                    </div> :
                     <div>
                        <Link to={""} className="me-2 btn btn-sm btn-primary">Add to Cart</Link>
                        <Link to="/" style={{width:"auto"}} className="col-sm-1 ms-auto me-2 btn btn-sm btn-warning">Home <i class="bi bi-house-door"></i></Link>
                        </div>
                }

                


            </div>
        </div>




    );
}
export default ProductDetails;