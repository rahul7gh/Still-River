import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AppContext from "../Context/Context";

function Payment(props) {
  var AppCtx = useContext(AppContext);

  var backendUrl = AppCtx.backendUrl;
  var [user, setUser] = useState({});
  var [msg,setMsg]=useState("");
  var navigate=useNavigate();

  function placeOrder(event)
  {
    var data={
        userId:user.id,
        totalAmount:AppCtx.totalAmount,
        items:[]
    }
    String(JSON.parse(localStorage.getItem("cartProducts"))).split(",").filter(id=>id!='null')
    .forEach(id=>{
        data.items.push({
            productId:id,
            quantity:AppCtx.checkout[id].quantity
        })
    })
    console.log(JSON.stringify(data));
    setMsg("Processing...");
    fetch(backendUrl + "/order-service/order/add", {
        method: "POST", body: JSON.stringify(data), headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
          "username": localStorage.getItem("username"),
          "Content-Type":"application/json"
        }
      })
  
        .then((res) => {
          //console.log(res);
          return res.json();
        }).then((res) => {
          console.log(res);
          setMsg("Order has been placed successfully. Redirecting in few Seconds....");
          setTimeout(()=>{
            navigate("/myorders");
          },2000)
  
        })
        .catch((err) => {
          console.log(err);
        });
  }

  useEffect(() => {
    fetch(
      backendUrl +
        "/customer-management/users/email/" +
        localStorage.getItem("username"),
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          username: localStorage.getItem("username"),
        },
      }
    )
      .then((res) => {
        
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div >
      <h3 className="text-sucess mt-5" style={{margin:"auto",width:"fit-content"}}>{msg}</h3>
      <table
        className="table"
        style={{
          width: "40%",
          margin: "auto",
          marginTop: "10%",
          borderSpacing: "0 40px",
          borderCollapse: "separate",
        }}
      >
        <tr>
          <th>Total Amount</th>
          <td> &#8377;{AppCtx.totalAmount}</td>
        </tr>

        <tr>
          <th>Mode Of Payment </th>
          <td> Cash On Delivery</td>
        </tr>
        <tr>
          <th>Delivery Address</th>
          <td>{user.address}</td>
        </tr>
        <tr>
          <td></td>
          <td onClick={placeOrder} style={{ float: "right" }} className="btn btn-success">
            Confirm Order
          </td>
        </tr>
      </table>
    </div>
  );
}
export default Payment;
