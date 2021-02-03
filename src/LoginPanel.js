import React from "react";

export default function LoginPanel(props) {
  return (
    <>
      {props.isLoginError && (
        <small class="form-text text-muted">
          Incorrect username or passworld
        </small>
      )}
      <form onSubmit={props.handleLocalLogin}>
        <div class="d-flex justify-content-center">
          <div style={{ width: "75%" }}>
            <div
              class="form-group"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <label for="username" style={{ paddingRight: 5 }}>
                Username
              </label>
              <input
                name="username"
                id="username"
                type="text"
                class="form-control"
                value={props.username}
                onChange={(event) => props.setUsername(event.target.value)}
                placeholder="Enter username"
                style={{
                  width: "50%"
                }}
              />
            </div>
            <div
              class="form-group"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <label for="password" style={{ paddingRight: 5 }}>
                Password{" "}
              </label>
              <input
                name="password"
                id="password"
                type="password"
                class="form-control"
                value={props.password}
                onChange={(event) => props.setPassword(event.target.value)}
                placeholder="Password"
                style={{
                  width: "50%"
                }}
              />
            </div>
            <button
              type="submit"
              class="btn btn-success"
              disabled={props.isLoading}
              style={{ minWidth: 250 }}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
