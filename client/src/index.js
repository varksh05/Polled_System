import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import "react-mdl/extra/material.css";
import "react-mdl/extra/material.js";

window.setTimeout(function () {
  document.location.reload(true);
}, 15000);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);