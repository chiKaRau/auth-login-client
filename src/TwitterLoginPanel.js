import React from "react";

export default function TwitterLoginPanel(props) {
  return (
    <button
      style={{
        margin: 5,
        minWidth: 250,
        backgroundColor: "#1DA1F2",
        color: "white"
      }}
      onClick={props.handleTwitterLogin}
      class="btn"
    >
      <span class="fa fa-twitter" style={{ fontSize: 16 }}></span> Login with
      Twitter
    </button>
  );
}
