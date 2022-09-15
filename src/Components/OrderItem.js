import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AppContext from "../Context/Context";



function OrderItem(props) {

  var navigate = useNavigate();
  var AppCtx = useContext(AppContext);
   var [product,setProduct]=useState({})
  

 

  

 
  return (
    <div className="card">
     
      <div className="card-body d-flex flex-column" >
    
        <div className="row">
          <div className="col-3 fw-bold">Order Id : {props.order.id}</div>
          <div className="col-3 fw-bold">Order Date : {props.order.orderDate}</div>
          <div className="col-3 fw-bold">Order Status :{props.order.status.statusName}</div>
          <div className="col-3 fw-bold">Total : &#8377;{props.order.totalAmount}</div>
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
