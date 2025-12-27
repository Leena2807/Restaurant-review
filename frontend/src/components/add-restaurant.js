import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant";

const AddRestaurant = () => {
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
  window.location.href = "/restaurants";
})
    .catch(e => {
      alert("Error adding restaurant");
      console.log("ERROR:", e);
    });
};

  return (
    <div className="submit-form">
      <h2>Add Restaurant</h2>

      <input name="name" placeholder="Name" onChange={handleInputChange} />
      <input name="cuisine" placeholder="Cuisine" onChange={handleInputChange} />
      <input name="borough" placeholder="Borough" onChange={handleInputChange} />
      <input name="building" placeholder="Building" onChange={handleInputChange} />
      <input name="street" placeholder="Street" onChange={handleInputChange} />
      <input name="zipcode" placeholder="Zipcode" onChange={handleInputChange} />

      <button onClick={saveRestaurant}>Add Restaurant</button>
    </div>
  );
};

export default AddRestaurant;
