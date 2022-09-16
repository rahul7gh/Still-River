import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AppContext from "../Context/Context";

function Register(props) {
  var [errMsg,setErrMsg]=useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function getData(event) {
    event.preventDefault();
    var data = {
      firstName: event.target.firstname.value,
      lastName: event.target.lastname.value,
      email: event.target.email.value,
      password: event.target.password.value,
      mobile: event.target.mobile.value,
      address: event.target.address.value,
      role: event.target.role.value,
    };
    console.log(data);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ title: 'React POST Request Example' })
      body: JSON.stringify(data),
    };
    setErrMsg("Processing...");
    setLoading(true);
    fetch(backendUrl + "/customer-management/users", requestOptions)
      .then((response) => {
         navigate("/signin");
         setLoading(false);
        return response.json();
      })
      .then((data) => {console.log(data)
        AppCtx.setIsHome(false);})
      .catch((err) => {
        setErrMsg("Error Registering User!");
        setLoading(false);
      });
  }

  var AppCtx = useContext(AppContext);
  var backendUrl = AppCtx.backendUrl;
  return (
    <div className="container" style={{ width: "40%", paddingTop: "5%" }}>
      <h3 className="text-primary">{errMsg}
            {
                loading ? (<div class="spinner-grow text-primary" role="status"></div>)
                    :""
            }
            
            </h3>
      <form onSubmit={getData} className="row row-cols-1 gy-4">
        <div className="col">
          <input
            type="text"
            name="firstname"
            id="firstname"
            class="form-control"
            placeholder="First Name"
            required
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="lastname"
            id="lastname"
            class="form-control"
            placeholder="Last Name"
            required
          />
        </div>
        <div className="col">
          <input
            type="email"
            name="email"
            id="email"
            class="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div className="col">
          <input
            type="password"
            name="password"
            id="password"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>

        <div className="col">
          <input
            type="text"
            name="mobile"
            id="mobile"
            class="form-control"
            placeholder="Mobile No."
            pattern="^[0-9]{10}$"
            required
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="address"
            id="address"
            class="form-control"
            placeholder="Address"
            required
          />
        </div>

        <div className="col form-group">
          <select className="form-control dropdown" name="role">
            <option value="ADMIN">Admin</option>
            <option value="CUSTOMER">Customer</option>
          </select>
        </div>

        <div className="col ">
          <button className="btn btn-primary me-5">Register</button>
          <span>
            Already registered? <Link to="/signin">Sign in</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Register;
