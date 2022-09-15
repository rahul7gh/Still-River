import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";

function AddProduct() {
  var AppCtx = useContext(AppContext);
  var backendUrl = AppCtx.backendUrl;
  const [product, setProduct] = useState({ id: 1, description: "", image: "" });


  function addProduct(event) {

    event.preventDefault();

    var formData = new FormData();
    formData.append("image", event.target.image.files[0])
    formData.append("title", event.target.title.value)
    formData.append("description", event.target.description.value)
    formData.append("category", event.target.category.value)
    formData.append("price", event.target.price.value)
    formData.append("vendor", event.target.vendor.value)
    fetch(backendUrl + "/product-service/products", {
      method: "POST", body: formData, headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "username": localStorage.getItem("username"),
      }
    })

      .then((res) => {
        //console.log(res);
        return res.json();
      }).then((res) => {
        console.log(res);
        setProduct(res);
      })
      .catch((err) => {
        console.log(err);
      });

  }

  return (

    <div className="container-fluid my-5 ml-5" style={{margin:"auto"}}>
      <div className="row ml-5 justify-content-center">
        <div className="col-6 ml-5">
          <center>
            <h4>Add Product</h4>
          </center>
          <form class="px-4 py-3 form row row-cols-1 gy-4" onSubmit={addProduct} method="POST">
            <div class="form-group">
              <input type="text" class="form-control" id="title" name="title" placeholder="Title" required />
            </div>
            <div class="form-group">
              <select name="category" class="form-control" id="category">
                <option value="ELECTRONICS">Electronics</option>
                <option value="TOYS">Toys</option>
                <option value="SPORTS">Sports</option>
                <option value="BOOKS">Books</option>
                <option value="GROOMING">Grooming</option>
                <option value="MAKEUP">Makeup</option>
              </select>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="vendor" name="vendor" placeholder="Vendor" required />
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="description" name="description" placeholder="Description" required />
            </div>

            <div class="form-group">
              <input type="text" class="form-control" name="price" id="price" placeholder="1,000.00" pattern="^\d{1,8}(,\d{8})*(\.\d+)?$" required />
            </div>

            <div class="form-group">
              <input type="file" class="form-control" id="image" name="image" accept="image/*" required />
            </div>
            <center>
              <button type="submit" class="btn btn-primary">Add Product</button>
            </center>
          </form>
        </div>
      </div>
    </div>

  );
}
export default AddProduct;