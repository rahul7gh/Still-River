import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../Context/Context";


function UpdateProduct() {

  var AppCtx = useContext(AppContext);
  var backendUrl = AppCtx.backendUrl;

  var { id } = useParams();
  const [msg, setMsg] = useState("");

  const [product, setProduct] = useState({ id: 1, description: "", image: "" });
  useEffect(() => {
    fetch(backendUrl + "/product-service/products/" + id, { method: "GET" })

      .then((res) => {
        //console.log(res);
        return res.json();
      }).then((res) => {
        //console.log(res);
        document.getElementById("description").value = res.description;
        document.getElementById("title").value = res.title;
        document.getElementById("vendor").value = res.vendor;
        document.getElementById("price").value = res.price;
        document.getElementById("category").value = res.category;
        document.getElementById("image").value = "";
        setProduct(res);

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const data = product.image;
  const [imgUrl, setImgUrl] = useState();

  const getImg = async () => {
    const response = await fetch(`data:image/jpeg;base64,${data}`);
    const imageBlob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result;
      setImgUrl(base64data);
    };
  };

  useEffect(() => {
    getImg();
  }, []);

  function updateProduct(event) {

    event.preventDefault();

    var formData = new FormData();
    formData.append("image", event.target.image.files[0])
    formData.append("id", id)
    formData.append("title", event.target.title.value)
    formData.append("description", event.target.description.value)
    formData.append("category", event.target.category.value)
    formData.append("price", event.target.price.value)
    formData.append("vendor", event.target.vendor.value)
    // fetch(backendUrl+"/product-service/products",{method:"PUT",body:formData})
    fetch(backendUrl + "/product-service/products", {
      method: "PUT", body: formData, headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "username": localStorage.getItem("username"),
      }
    })

      .then((res) => {
        //console.log(res);
        return res.text();
      }).then((res) => {
        console.log(res);
        setMsg("Product With id " + id + " Updated successfully.");

      })
      .catch((err) => {
        console.log(err);
      });





  }






  return (

    <div className="container-fluid my-5 ml-5">
      <div className="row ml-5 justify-content-center">
        <div className="col-6 ml-5">
          <center>
            <div className="mx-5">
              <h4 className="text-success">{msg}</h4>
            </div>
            <h4>Update Product</h4>
          </center>
          <form class="px-4 py-3 form row row-cols-1 gy-4" onSubmit={updateProduct} method="PUT">
            <div class="form-group">
              <input type="text" class="form-control" name="title" id="title" placeholder="Title" />
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
              <input type="text" class="form-control" name="vendor" id="vendor" placeholder="Vendor" />
            </div>
            <div class="form-group">
              <input type="text" class="form-control" name="description" id="description" placeholder="Description" />
            </div>

            <div class="form-group">
              <input type="text" class="form-control" name="price" id="price" placeholder="1,000.00" pattern="^\d{1,8}(,\d{8})*(\.\d+)?$" />
            </div>
            <div class="form-group">
              <input type="file" class="form-control" name="image" id="image" accept="image/*" />
            </div>

            <center>
              <button type="submit" class="btn btn-primary mx-3">Update Product</button>
              <Link to="/" className="mr-2 btn  btn-dark mx-3">Go back To HomePage</Link>

            </center>

          </form>


        </div>
      </div>
    </div>

  );
}
export default UpdateProduct;