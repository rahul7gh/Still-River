import React, { useContext, useState } from "react";
import AppContext from "../Context/Context";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ParentApp from "./ParentApp";
import ReactDOM from 'react-dom/client';
function Login(props)
{
    const navigate=useNavigate();
    var AppCtx=useContext(AppContext);
    var backendUrl=AppCtx.backendUrl;
    var [errMsg,setErrMsg]=useState("");
    function getData(event)
    {
        event.preventDefault();
        var data={
            username:event.target.email.value,
            password:event.target.password.value,
        }
        console.log(data);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        setErrMsg("Processing....")
        fetch(backendUrl+'/customer-management/login', requestOptions)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("token",data.token)
            localStorage.setItem("username",event.target.email.value)
            localStorage.setItem("role",data.role)
            
            window.onbeforeunload=()=>{
                localStorage.removeItem("token")
                localStorage.removeItem("username")
                localStorage.removeItem("role")
                localStorage.removeItem("cartProducts")
            }

            AppCtx.setIsLoggedIn(state=>!state);
            console.log(localStorage.getItem("token")+" "+localStorage.getItem("username"));
            setErrMsg("");
            navigate('/');
        }).catch(err=>{
            setErrMsg("Invalid Username or Password!");
        });

        
    }

    
    return (
       <div className="container" style={{width:"40%",paddingTop:"15%"}}>
            <h2 style={{color:"red"}}>{errMsg}</h2>
            <form onSubmit={getData} className="row row-cols-1 gy-4">
                <div className="col">
                    <input type="text" name="email" id="email" class="form-control" placeholder="Email" />
                </div>
                <div className="col">
                    <input type="password" name="password" id="password" class="form-control" placeholder="Password" />
                </div>
                <div className="col">
                    <button className="btn btn-primary me-5">Login</button> 
                    <span>Not a registered User?<Link to="/signup"> Register Now</Link></span>
                </div>
            </form>
       </div>
    );
}

export default Login;