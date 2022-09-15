import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../Context/Context";

function Checkout(props) {
  var AppCtx = useContext(AppContext);
  var backendUrl = AppCtx.backendUrl;
  var navigate=useNavigate()
    var [totalAmount,setTotalAmount]=useState(0);
  useEffect(() => {
    console.log(AppCtx.backendUrl);
    setTotalAmount(state=>
        {
            var sum=0;
        String(JSON.parse(localStorage.getItem("cartProducts")))
            .split(",")
            .filter((id) => id != "null" && AppCtx.checkout[id]!=undefined && AppCtx.checkout[id].quantity>=1).forEach((id)=>{sum=sum+parseFloat(AppCtx.checkout[id].subTotal)})
            return sum;
        }
    );
  }, []);

  return (
    <div>
      <table className="mt-5 table table-striped">
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {String(JSON.parse(localStorage.getItem("cartProducts")))
            .split(",")
            .filter((id) => id != "null" && AppCtx.checkout[id]!=undefined && AppCtx.checkout[id].quantity>=1)
            .map((id) => (
              <tr>
                <td>{AppCtx.checkout[id].id}</td>
                <td>{AppCtx.checkout[id].title}</td>
                <td>{AppCtx.checkout[id].quantity}</td>
                <td>&#8377;{AppCtx.checkout[id].price}</td>
                <td>&#8377; {AppCtx.checkout[id].subTotal}</td>
              </tr>
            ))}
            <tr className="mt-5">
                <th colSpan={4}>
                    Bill Amount 
                </th>
                <th>
                &#8377;{totalAmount} 
                </th>
            </tr>
        </tbody>
      </table>
      
      <div style={{float:"right"}}>
        <Link to="/cart" className="btn btn-info me-5">Back to Cart</Link>
        <button onClick={(e)=>{
            AppCtx.totalAmount=totalAmount;
            if(totalAmount>=1)
            {
                navigate("/payment")
            }
            else
            {
                console.log(totalAmount);
            }
        }} className="btn btn-warning me-5">Place Order</button>
      </div>
    </div>
  );
}
export default Checkout;
