/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AppContext from "./Context/Context";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  Redirect,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useContext, useState } from "react";
import Badge from "@mui/icons-material/Badge";
function App(props) {
  function signIn() {
    console.log("clicked!");
    navigate("/signin");
  }
  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("cartProducts");
    localStorage.removeItem("role");
    AppCtx.setIsLoggedIn(false);
    navigate("/");
  }

  function updateFilter(event, value) {
    AppCtx.setCategory(value);
    // console.log(value);
  }
  var AppCtx = useContext(AppContext);

  var [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid">
        <div className="main-nav container-fluid  ">
          <h4 class="navbar-brand " href="#">
            <Link className="nav-link active" to="/">
              {" "}
              ShopiFy
            </Link>
          </h4>

          <div>
            <ul class="ul navbar-nav d-flex flex-row">
              <li class="nav-item dropdown">
                <span
                  style={{ color: "white" }}
                  class="dropdown-toggle btn btn-outline-info me-5"
                  href="#"
                  id="navbarDropdown1"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  {AppCtx.category}
                </span>

                <ul class="dropdown-menu">
                  <li>
                    <button
                      onClick={(event) => updateFilter(event, "All Products")}
                      class="dropdown-item"
                    >
                      All Products
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(event) => updateFilter(event, "ELECTRONICS")}
                      class="dropdown-item"
                    >
                      ELECTRONICS
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(event) => updateFilter(event, "TOYS")}
                      class="dropdown-item"
                    >
                      TOYS
                    </button>
                  </li>
                  <li>
                    <span
                      onClick={(event) => updateFilter(event, "SPORTS")}
                      class="dropdown-item"
                    >
                      SPORTS
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={(event) => updateFilter(event, "BOOKS")}
                      class="dropdown-item"
                    >
                      BOOKS
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={(event) => updateFilter(event, "GROOMING")}
                      class="dropdown-item"
                    >
                      GROOMING
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={(event) => updateFilter(event, "MAKEUP")}
                      class="dropdown-item"
                    >
                      MAKEUP
                    </span>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                </ul>
              </li>

              {localStorage.getItem("username") &&
                localStorage.getItem("token") ? (
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {localStorage.getItem("username")}
                  </a>

                  <ul class="dropdown-menu">
                    <li>
                      <span
                        onClick={(e) => {
                          navigate("/accountInfo");
                        }}
                        class="dropdown-item"
                      >
                        Account Info
                      </span>
                    </li>
                    <li>
                      <span
                        onClick={(e) => {
                          navigate("/myorders");
                        }}
                        class="dropdown-item"
                      >
                        My Orders
                      </span>
                    </li>
                    

                    {String(localStorage.getItem("role")) == "ADMIN" ? (
                      <li>
                        <span
                          onClick={(e) => {
                            navigate("/accountInfo");
                          }}
                          class="dropdown-item"
                        >
                          Add a Product
                        </span>
                      </li>
                    ) : (
                      ""
                    )}
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <span class="dropdown-item">
                        {localStorage.getItem("token") ? (
                          <button className="btn btn-danger" onClick={logOut}>
                            Log out
                          </button>
                        ) : (
                          <button className="btn btn-primary" onClick={signIn}>
                            Sign In
                          </button>
                        )}
                      </span>
                    </li>
                  </ul>
                </li>
              ) : (
                <div>
                  <button className="btn btn-primary me-5" onClick={signIn}>
                    Sign In
                  </button>
                </div>
              )}

              <li class="nav-item">
                <i role="button"
                onClick={(e) => {
                  navigate("/cart");
                }}
                  className="bi bi-cart3"
                  style={{ color: "white", width: "fit-content",fontSize:"25px" }}
                ></i>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* </div> */}
    </nav>
  );
}

export default App;
