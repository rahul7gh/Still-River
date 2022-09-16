import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AppContext from "../Context/Context";



function OrderItem(props) {

  var navigate = useNavigate();
  var AppCtx = useContext(AppContext);
  var backendUrl=AppCtx.backendUrl;
   var [product,setProduct]=useState({})
    var [status,setStatus]=useState();
   useEffect(()=>{
    setStatus(props.order.status.statusName)
    if(props.order.status.statusName==="CANCELLED")
    {
      console.log(props.order.id+" ",props.order.status);
      document.getElementById("cancel"+props.order.id).hidden=true;
      
      
    }
   },[])

   function updateStatus(e)
   {
    
            fetch(
              backendUrl + "/order-service/order/5/"+props.order.id+"/status/4" ,
              { method: "PUT",headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "username": localStorage.getItem("username"),
              } }
            )
              .then((res) => {
              //   console.log(res);
                return res.json();
              })
              .then((res) => {
                console.log(res);
                setStatus("CANCELLED")
                document.getElementById("cancel"+props.order.id).hidden=true;
                AppCtx.setIsHome(false);
                props.setToggle(state=>!state)
              })
              .catch((err) => {
                console.log(err);
              });
      
          
   }

  return (
    <div className="card">
     
      <div className="card-body d-flex flex-column" >
    
        <div className="row">
          <div className="col-1 fw-bold">Order Id : {props.order.id}</div>
          <div className="col-3 fw-bold">Order Date : {props.order.orderDate}</div>
          <div className="col-3 fw-bold">Order Status :{status}</div>
          <div className="col-2 fw-bold">Total : &#8377;{props.order.totalAmount}</div>
          <div id={"cancel"+props.order.id} className="col-3 fw-bold">
            <button 
          onClick={updateStatus}
          className="btn btn-sm btn-outline-danger">Cancel</button>
          </div>
        </div>
        
        <div>
        <button class="btn btn-primary" data-bs-toggle="collapse" href={"#collapseExample"+props.order.id}>
          Products
        </button>
      
        </div>
          <div class="collapse" id={"collapseExample"+props.order.id}>
          <table
          className="table table-borderless"
         
      > 
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Sub Total</th>
          </tr>
        </thead>
        <tbody>

        {props.order.orderItems.map(item=>(
          <tr>
            <td>{item.product.title}</td>
            <td>{item.quantity}</td>
            <td>&#8377;{item.unitPrice}</td>
            <td>&#8377;{item.subTotal}</td>
          </tr>
        ))}


        </tbody>
      </table>
          </div>
      </div>
      
    </div>
  );
}
export default OrderItem;
