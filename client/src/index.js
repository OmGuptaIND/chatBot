import React from "react";
import ReactDOM from "react-dom";

//Components;
import "./index.css";
import App from "./components/App";
import reducer, { initialState } from "./Reducer/Reducer";
import { StateProvider } from "./StateProvider/StateProvider";

import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';

axios.defaults.baseURL=`http://localhost:8000/api/`;

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router>
        <App />
      </Router>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
