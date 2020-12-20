import React, { useState, useEffect } from "react";
import Axios from "axios";

export const Wine = () => {
  const [wineData, setWineData] = useState({});

  useEffect(() => {
    setInterval(async () => {
      await Axios.get("http://localhost:3001/wine").then((res) => {
        setWineData(res.data);
      });
    }, 5000);
  }, []);

  return (
    <div>
      <div className="text-right mt-5">
        <h4 className="text-muted rounded-pill mt-5 p-3">Wine</h4>
      </div>
      <br />

      <div className="card">
        <div className="card-body">
          <div className="text-center">
            <img
              className="img-fluid rounded-circle "
              src={wineData.pictureURL}
              alt={wineData.pictureURL}
              width="100"
            />
          </div>
          <div className="text-left">
            <h5 className="card-title text-center">{wineData.fullname}</h5>
            <hr />
          </div>
          <p className="lead">{wineData.instructions}</p>
        </div>
      </div>
    </div>
  );
};

// const User = (props) => {
//   return <div>{props.title}</div>;
// };

export default Wine;
