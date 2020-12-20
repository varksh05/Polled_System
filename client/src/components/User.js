import React, { useState, useEffect } from "react";
import Axios from "axios";
// import "./Child.css";

//
export const User = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setInterval(async () => {
      await Axios.get("http://localhost:3001/user").then((res) => {
        setUserData(res.data);
      });
    }, 5000);
  }, []);

  return (
    <div>
      <div className="text-left mt-5">
        <h4 className="text-muted rounded-pill mt-5 p-3">Users</h4>
      </div>
      <br />

      <div className="card">
        <div className="card-body">
          <div className="text-center">
            <img
              className="img-fluid rounded-circle "
              src={userData.pictureURL}
              alt={userData.pictureURL}
              width="100"
            />
          </div>
          <div className="text-left">
            <h5 className="card-title text-center">{userData.fullname}</h5>
            <hr />
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item lead">{userData.email}</li>
            <li className="list-group-item lead">{userData.username}</li>
            <li className="list-group-item lead">{userData.password}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default User;
