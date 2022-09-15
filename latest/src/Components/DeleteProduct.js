import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import AppContext from "../Context/Context";

function DeleteProduct(){
    
    var AppCtx=useContext(AppContext);
    var backendUrl=AppCtx.backendUrl;

    var data;
    var {id} = useParams();
    var navigate=useNavigate();
    const [msg,setMsg]=useState("");
    var link="http://localhost:5000/products/"+id;
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
    
    
      function deleteIt(){
        if(window.confirm("Are You sure that you want to delete this product?")){
    
            fetch(backendUrl+"/product-service/products/"+id,{method:"DELETE",headers:{
                "Authorization":"Bearer "+localStorage.getItem("token"),
                "username":localStorage.getItem("username"),
              }})
                    
                    .then((res) => {
                        //console.log(res);
                        return res.text();
                    }).then((res) => {
                        console.log(res);
                        //setProduct(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                    
                    setMsg("Product With id "+id+" deleted successfully.");
           }
        
            
    }

    return(

        <div className="card mt-5">
            
       
            <img width="50%" style={{margin:"auto"}} className="img-thumbnail object-cover mb-3 overflow-hidden" src={imgUrl} alt="" />
       
        <div className="card-body">
        <center><h4>{product.title}</h4></center>
        <h5>Product Details: </h5><p class="card-text">{product.description}</p>
        <h5>Price: </h5><p class="card-text">${product.price}</p>
        <h5>Product Origin: </h5><p class="card-text">{product.vendor}</p>
        </div>
        <div className="card-footer">
                   
                    <button onClick={deleteIt} className="mr-2 btn  btn-danger">Delete</button>
                    <Link to="/"  className="mr-2 btn  btn-dark">Go back To HomePage</Link>

        </div>
        <div>
            <p>{msg}</p>
        </div>
        
    </div>




      
       
    );
}
export default DeleteProduct;