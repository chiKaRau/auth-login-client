import React, { useState, useRef, useEffect } from "react";

export default function SignUpPage(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");

  return (
    <div>
      <div class="row">
        <div class="col-sm-12">
          <form
            onSubmit={(e) =>
              props.handleSignUp(e, {
                username,
                email,
                password,
                firstname,
                lastname,
                birthdate,
                gender,
                country,
                city,
                zipcode
              })
            }
          >
            {props.isSignUpError && (
              <small class="form-text text-danger">
                Something wrong in Server. Please Try Again
              </small>
            )}
            {props.isSignUpEmpty && (
              <small class="form-text text-danger">Some field is Empty</small>
            )}
            {props.isDuplicate && (
              <small class="form-text text-danger">
                username already existed
              </small>
            )}
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
                  <label style={{ paddingRight: 5 }}>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    class="form-control"
                    placeholder="username"
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
                  <label style={{ paddingRight: 38 }}>Email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    class="form-control"
                    placeholder="email"
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
                  <label style={{ paddingRight: 8 }}>Password</label>
                  <input
                    type="text"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    class="form-control"
                    placeholder="password"
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
                  <label style={{ paddingRight: 7 }}>Firstname</label>
                  <input
                    type="text"
                    value={firstname}
                    onChange={(event) => setFirstname(event.target.value)}
                    class="form-control"
                    placeholder="firstname"
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
                  <label style={{ paddingRight: 8 }}>Lastname</label>
                  <input
                    type="text"
                    value={lastname}
                    onChange={(event) => setLastname(event.target.value)}
                    class="form-control"
                    placeholder="lastname"
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
                  <label style={{ paddingRight: 15 }}>Birthdate</label>
                  <input
                    type="text"
                    value={birthdate}
                    onChange={(event) => setBirthdate(event.target.value)}
                    class="form-control"
                    placeholder="birthdate"
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
                  <label style={{ paddingRight: 25 }}>Gender</label>
                  <input
                    type="text"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                    class="form-control"
                    placeholder="gender"
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
                  <label style={{ paddingRight: 23 }}>Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                    class="form-control"
                    placeholder="first name"
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
                  <label style={{ paddingRight: 50 }}>City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    class="form-control"
                    placeholder="city"
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
                  <label style={{ paddingRight: 20 }}>Zipcode</label>
                  <input
                    type="text"
                    value={zipcode}
                    onChange={(event) => setZipcode(event.target.value)}
                    class="form-control"
                    placeholder="zipcode"
                  />
                </div>

                <button
                  type="submit"
                  disabled={props.isLoading}
                  class="btn btn-info"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
