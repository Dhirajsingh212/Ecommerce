import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { ParallaxProvider } from "react-scroll-parallax";
import { ContextProvider } from "./Context/Context";
import {BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // {/* <React.StrictMode> */}
  // <ParallaxProvider>
  <ContextProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
 </ContextProvider>
  // </React.StrictMode>
  // </ParallaxProvider>
);
