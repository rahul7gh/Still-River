import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AppContext from "../Context/Context";

function Payment(props) {
  var AppCtx = useContext(AppContext);

  var backendUrl = AppCtx.backendUrl;
  var [user, setUser] = useState({});
  var [msg,setMsg]=useState("");
  var navigate=useNavigate();
  const [loading, setLoading] = useState(false);

  function placeOrder(event)
  {
    document.getElementById("confirm").hidden=true;
    document.getElementById("cancel").hidden=true;
    setMsg("")
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
          setLoading(false)
          setTimeout(()=>{
            navigate("/myorders");
          },2000)
  
        })
        .catch((err) => {
          setMsg("Something went Wrong!");
          setLoading(false)
        });
  }

  useEffect(() => {
    setLoading(true);
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
        AppCtx.setIsHome(false);
        setUser(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div >
      {loading ? (
                <h3 className="text-primary">
                Loading Please wait...
                <div class="spinner-grow text-primary" role="status"></div>
                </h3>
            ) : ""}
      <h3 className="text-primary mt-5" style={{margin:"auto",width:"fit-content"}}>{msg}</h3>
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
          <td onClick={placeOrder} >
            <Link id="cancel" className="btn btn-outline-danger" to="/cart">Cancel</Link>
          </td>
          <td id="confirm" role="button" onClick={placeOrder} className="btn btn-success" >
          Confirm
          </td>
        </tr>
      </table>
    </div>
  );
}
export default Payment;
