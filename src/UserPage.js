import React, { useState, useRef, useEffect } from "react";

export default function UserPage(props) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");

  //Wait for the data and init
  useEffect(() => {
    const initUserInfo = async () => {
      setFirstname(props.userInfo.firstname);
      setLastname(props.userInfo.lastname);
      setBirthdate(props.userInfo.birthdate);
      setGender(props.userInfo.gender);
      setCountry(props.userInfo.country);
      setCity(props.userInfo.city);
      setZipcode(props.userInfo.zipcode);
    };

    initUserInfo();
  }, [props.userInfo]);

  return (
    <div class="container-fluid h-100">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-6">
          <div class="jumbotron border border-light">
            {/**TIMER */}
            <p class="p-3">
              Refresh_token: {props.refresh_token_count} Access_token:{" "}
              {props.access_token_count}
            </p>

            {props.isUpdateError && (
              <small class="form-text text-muted">
                Something Wrong. Please try again.
              </small>
            )}

            {/**USER INFO */}
            <h2>Welcome, {props.userInfo.firstname}</h2>

            <form
              onSubmit={(e) =>
                props.handleUpdate(e, {
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
              <div class="d-flex justify-content-center">
                <div style={{ width: "50%" }}>
                  <div
                    class="form-group"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <label style={{ paddingRight: 5 }}>Firstname</label>
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
                    <label style={{ paddingRight: 5 }}>Lastname</label>
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
                    <label style={{ paddingRight: 10 }}>Birthdate</label>
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
                    <label style={{ paddingRight: 20 }}>Gender</label>
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
                    <label style={{ paddingRight: 17 }}>Country</label>
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
                    <label style={{ paddingRight: 45 }}>City</label>
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
                    <label style={{ paddingRight: 15 }}>Zipcode</label>
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
                    class="btn btn-primary"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>

            {/**LOGOUT BUTTON */}
            <button
              style={{ margin: 5 }}
              type="button"
              class="btn btn-danger"
              onClick={props.handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
