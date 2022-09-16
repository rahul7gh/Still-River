import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AppContext from "../Context/Context";

function ProductCard(props) {
  var { id } = useParams();
  var navigate = useNavigate();
  const data = props.p.image;
  const [imgUrl, setImgUrl] = useState();
  var AppCtx = useContext(AppContext);

  function addToCart() {
    if (
      localStorage.getItem("cartProducts") ) 
      {
        if(JSON.parse(localStorage.getItem("cartProducts")).filter(
          (i) => i == props.p.id
        ).length == 0)
        {
          
            localStorage.setItem(
              "cartProducts",
              JSON.stringify([
                ...JSON.parse(localStorage.getItem("cartProducts")),
                props.p.id,
              ])
            );
            AppCtx.setCartCount((cnt) => cnt+1);
        }

    } else {
      localStorage.setItem("cartProducts", JSON.stringify([props.p.id]));
      console.log(props.p.id + " " + localStorage.getItem("cartProducts"));
      AppCtx.setCartCount((cnt) => cnt+1);
      var temp={
        id:props.p.id,
        title:props.p.title,
        quantity:1,
        price:props.p.price,
        subTotal:parseFloat(1)*parseFloat(props.p.price)

    }
    AppCtx.checkout[props.id]=temp;
    }
  }

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

  useEffect(() => {
    getImg();
  }, []);

  //console.log(props)
  return (
    <div className="card">
      <Link to={"/product/" + props.p.id}>
        <div className="d-flex flex-row">
          <img
            style={{ height: "130px", width: "80%", margin: "auto" }}
            className="img-thumbnail  object-cover mb-3 mt-3 overflow-hidden"
            src={imgUrl}
            alt=""
          />
        </div>
      </Link>
      <div className="card-body">
        <p className="card-text d-flex justify-content-between">
          <span>
            <b>{props.p.title}</b>
          </span>
          <span>&#8377;{props.p.price}</span>
        </p>
      </div>
      <div className="card-footer">
        {String(localStorage.getItem("role")) == "ADMIN" ? (
          <div class="d-flex justify-content-between">
            
            <Link
              to={"/product/delete/" + props.p.id}
              className=" btn btn-sm btn-outline-danger"
            >
              Delete
            </Link>
          
           
            <Link
              to={"/product/update/" + props.p.id}
              className=" btn btn-sm btn-success"
            >
              Update
            </Link>
            
          </div>
        ) : (
          <span>
            <button onClick={addToCart} className="mr-2 btn btn-sm btn-primary">
              Add to Cart
            </button>
          </span>
        )}
      </div>
    </div>
  );
}
export default ProductCard;
