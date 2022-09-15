import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../Context/Context";

function ProductDetails(){
    
    var AppCtx=useContext(AppContext);
    var backendUrl=AppCtx.backendUrl;

    var data;
    var {id} = useParams();
    
    const [product, setProduct] = useState({id:1,description:"lol",image:""});
    useEffect(() => {
        fetch(backendUrl+"/product-service/products/"+id,{method:"GET"})
            
            .then((res) => {
                console.log(res);
                return res.json();
            }).then((res) => {
                data = res.image;
                getImg();
                //console.log(res);
                setProduct(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    //const data = product.image;
    const[imgUrl,setImgUrl]=useState();

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
    
    
setTimeout(()=>console.log("Ended"),1000)
    return(

        <div className="card mt-5">
            
       
            <img width="50%" style={{margin:"auto"}} className="img-thumbnail object-cover mb-3 overflow-hidden" src={imgUrl} alt="" />
       
        <div className="card-body">
        <center><h4>{product.title}</h4></center>
        <h5>Product Details: </h5><p class="card-text">{product.description}</p>
        <h5>Price: </h5><p class="card-text">&#8377;{product.price}</p>
        <h5>Product Origin: </h5><p class="card-text">{product.vendor}</p>
        </div>
        <div className="card-footer">
                    
                    {
                      String(localStorage.getItem("role")) == "ADMIN"?<span><Link to={"/product/delete/"+product.id} className="mr-2 btn btn-sm btn-danger">Delete</Link>
                      <Link to={"/product/update/"+product.id} className="mr-2 btn btn-sm btn-success">Update</Link>
                      <Link to={""} className="mr-2 btn btn-sm btn-primary">Add to Cart</Link></span>:<span>
                      <Link to={""} className="mr-2 btn btn-sm btn-primary">Add to Cart</Link></span>
                    }

                    <Link to="/"  className="ms-5 mr-2 btn btn-sm btn-dark">Go back To HomePage</Link>


        </div>
    </div>




    );
}
export default ProductDetails;