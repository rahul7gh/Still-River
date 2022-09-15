import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AppContext from "../Context/Context";
import CartItem from "./CartItem";
import OrderItem from "./OrderItem";


function MyOrders() {
  var AppCtx = useContext(AppContext);
  var backendUrl = AppCtx.backendUrl;
  const [user, setUser] = useState({});
  var [toggle, setToggle] = useState(false);
  var[orders,setOrders]=useState([])
  var navigate=useNavigate();
 
  useEffect(()=>{

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

          fetch(
            backendUrl + "/order-service/order/"+res.id ,
            { method: "GET" }
          )
            .then((res) => {
            //   console.log(res);
              return res.json();
            })
            .then((res) => {
              console.log(res);
              setOrders(res)
            })
            .catch((err) => {
              console.log(err);
            });
    
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);


    



  return (
    <div className="container-fluid my-5">
        <div className="row">
           {
            orders.map(order => (   <div className="col-12">
                                        <OrderItem order={order}/>
                                    </div> 
                               )
                    )
           }
        </div>
    </div>
  );
}
export default MyOrders;
