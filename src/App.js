import React from "react";
import "./styles.css";
import { Provider } from "react-redux";
import MainApplication from "./MainApplication";
import Redux from "./Redux.js";

export default function App() {
  return (
    <Provider store={Redux()}>
      <div className="App">
        <MainApplication />
      </div>
    </Provider>
  );
}
