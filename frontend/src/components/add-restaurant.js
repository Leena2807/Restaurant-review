import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant";
import { useNavigate } from "react-router-dom";
const AddRestaurant = () => {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({
    name: "",
    cuisine: "",
    borough: "",
    building: "",
    street: "",
    zipcode: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

const saveRestaurant = () => {
  console.log("Sending restaurant:", restaurant);

  RestaurantDataService.createRestaurant(restaurant)
   .then(() => {
  alert("Restaurant added successfully");
  navigate("/restaurants");
})
    .catch(e => {
      alert("Error adding restaurant");
      console.log("ERROR:", e);
    });
};

  return (
  <div className="add-restaurant-page">
    <div className="add-restaurant-card">
      <h2>Add a New Restaurant</h2>

      <div className="form-group">
        <label>Restaurant Name</label>
        <input name="name" onChange={handleInputChange} />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Cuisine</label>
          <input name="cuisine" onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Borough</label>
          <input name="borough" onChange={handleInputChange} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Building</label>
          <input name="building" onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Street</label>
          <input name="street" onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Zipcode</label>
          <input name="zipcode" onChange={handleInputChange} />
        </div>
      </div>

      <button className="btn-submit" onClick={saveRestaurant}>
        Add Restaurant
      </button>
    </div>
  </div>
);
};

export default AddRestaurant;
