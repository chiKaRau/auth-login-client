import React, { useState, useRef, useEffect } from "react";

/*
INTRODUCTION
Client: https://2puw7.csb.app/
Client Source Code : https://codesandbox.io/s/auth-pratice-2puw7?file=/src/index.js
Server: https://repl.it/@chiKaRau/auth-pratice#index.js

This is a sample OAuth which allow the users to login locally and third parties such as Twitter by using passport.js and jwt for verification.
*/

//Axios
import axios from "axios";

//Cookies
import Cookies from "js-cookie";

//Components
import UserPage from "./UserPage";
import LoginPanel from "./LoginPanel";
import SignUpPanel from "./SignUpPanel";
import TwitterLoginPanel from "./TwitterLoginPanel";

const defaultUserInfo = {
  firstname: "",
  lastname: "",
  birthdate: "",
  gender: "",
  country: "",
  city: "",
  zipcode: ""
};

let attempt = 3;

//->CHANGE<-
//const server_domain = "http://localhost:4000"
const server_domain = "https://auth-pratice.chikarau.repl.co";

//->CHANGE<-
//const client_domain = "http://localhost:3000/"
const client_domain = "https://2puw7.csb.app/";

export default function MainApplication(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [isUpdateError, setIsUpdateError] = useState(false);
  const [isSignUpError, setIsSignUpError] = useState(false);
  const [isSignUpEmpty, setIsSignUpEmpty] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const [access_token_count, set_Access_Count] = useState(1);
  const [refresh_token_count, set_Refresh_Count] = useState(1);
  //useRef gives us an object to store things between re-renders
  const timer = useRef();

  /***************
   * Store Token *
   ***************/
  const storeLocalTokens = (
    access_token,
    access_expires_in,
    refresh_token,
    refresh_expires_in
  ) => {
    //Store the refresh_token into localstorage
    localStorage.setItem("refresh_token", refresh_token);
    //Store the access_token into cookie
    Cookies.set("access_token", access_token, {
      expires: new Date(access_expires_in),
      path: ""
    });

    localStorage.setItem("refresh_expires_in", refresh_expires_in);
    localStorage.setItem("access_expires_in", access_expires_in);
  };

  const storeThirdPartyTokens = (queryString) => {
    //Check for third party login
    const urlParams = new URLSearchParams(queryString);

    const refresh_token = urlParams.get("refresh_token");
    const access_token = urlParams.get("access_token");
    const access_expires_in = urlParams.get("access_expires_in");
    const refresh_expires_in = urlParams.get("refresh_expires_in");

    storeLocalTokens(
      access_token,
      access_expires_in,
      refresh_token,
      refresh_expires_in
    );
  };

  /*************************
   * Verify Refresh Tokens *
   *************************/
  const verifyRefreshToken = async (
    callback_function,
    params,
    callback_function_name
  ) => {
    try {
      //Refresh Token if success
      let {
        refresh_token,
        access_expires_in,
        refresh_expires_in,
        access_token
      } = await fetch_auth_refresh(localStorage.getItem("refresh_token"));

      //const access_token = getCookie("access_token");

      //Store new Tokens on the client side
      storeLocalTokens(
        access_token,
        access_expires_in,
        refresh_token,
        refresh_expires_in
      );

      callback_function(params);
    } catch (e) {
      console.log("REFRESH ERROR");
      if (e.response) {
        console.log(e.response.data);
      }

      //Remove Cookies and Localstorage data
      clearEverything();

      //If refresh token is expired,
      //then make the user go back to homepage
      if (callback_function_name === "getUserInfo") {
        setIsValidToken(false);
        attempt = 3;
      } else {
        errorAlert("Your Session is expired. Please login again!");
      }
    }
  };

  /********************
   * UserInfo Actions *
   ********************/
  const getUserInfo = async () => {
    try {
      const access_token = Cookies.get("access_token");
      let { user } = await fetch_profile_getUserInfo(access_token);

      //Start the Counter
      setCounter();

      setIsValidToken(true);
      setUserInfo(user);
    } catch (e) {
      console.log("GET USER INFO ERROR");

      //if the access token is expired while refresih is not
      //call the /refresh to get new refresh and access token
      //and call the getUserInfo again
      if (e.response && e.response.status === 401 && attempt !== 0) {
        attempt--;
        return await verifyRefreshToken(getUserInfo, {}, "getUserInfo");
      }

      //Remove Cookies and Localstorage data
      clearEverything();

      //If all attempt are used,
      //Refresh the page which will make user back to homepage
      errorAlert("Something Wrong, Please login again!");
    }
  };

  const updateUserInfo = async (userUpdateInfo) => {
    try {
      await fetch_profile_setUserInfo(
        Cookies.get("access_token"),
        userUpdateInfo
      );

      //Refresh Token if success
      let {
        refresh_token,
        access_expires_in,
        refresh_expires_in,
        access_token
      } = await fetch_auth_refresh(localStorage.getItem("refresh_token"));

      //const access_token = getCookie("access_token");

      //Store new Tokens on the client side
      storeLocalTokens(
        access_token,
        access_expires_in,
        refresh_token,
        refresh_expires_in
      );
    } catch (e) {
      console.log("UPDATE USER INFO ERROR");
      //if the access token is expired while refresih is not
      //call the /refresh to get new refresh and access token
      //and call the updateUserInfo again
      if (e.response && e.response.status === 401 && attempt !== 0) {
        attempt--;
        return await verifyRefreshToken(
          updateUserInfo,
          userUpdateInfo,
          "updateUserInfo"
        );
      }

      //Remove Cookies and Localstorage data
      clearEverything();

      //If all attempt are used,
      //Refresh the page which will make user back to homepage
      errorAlert("Something Wrong, Please login again!");
    }
  };

  /****************
   * User Actions *
   ****************/
  const handleTwitterLogin = async (event) => {
    setIsLoading(true);
    try {
      window.open(server_domain + "/api/auth/twitterLogin", "_self");
    } catch (e) {
      console.log("TWITTER LOGIN ERROR");
      window.location.replace(client_domain);
    }
  };

  const handleLocalLogin = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    if (username === "" || password === "") {
      setUsername("");
      setPassword("");
      setIsLoading(false);
      setIsLoginError(true);
      return;
    }

    try {
      let {
        refresh_token,
        access_expires_in,
        refresh_expires_in,
        access_token
      } = await fetch_auth_localLogin(username, password);

      //const access_token = getCookie("access_token");
      //console.log("document: " + document.cookie);
      //console.log("access_token: " + access_token);

      //Store new Tokens on the client side
      storeLocalTokens(
        access_token,
        access_expires_in,
        refresh_token,
        refresh_expires_in
      );

      //Get userinfo by using access_token
      getUserInfo(access_token);

      setIsValidToken(true);
      setIsLoginError(false);
      setUsername("");
      setPassword("");
    } catch (e) {
      console.log("LOCAL LOGIN ERROR");
      console.log(e);
      setUsername("");
      setPassword("");
      setIsLoginError(true);
    }

    setIsLoading(false);
  };

  const handleLogout = async () => {
    try {
      setIsValidToken(false);
      setUsername("");
      setPassword("");

      const refresh_token = localStorage.getItem("refresh_token");
      await fetch_auth_logout(refresh_token);

      //Remove Cookies and Localstorage data
      clearEverything();
    } catch (e) {
      console.log("LOGOUT ERROR");

      //Remove Cookies and Localstorage data
      clearEverything();

      errorAlert("Something Wrong, You will be logout.");
    }
  };

  const handleUpdate = async (event, userUpdateInfo) => {
    event.preventDefault();
    try {
      await updateUserInfo(userUpdateInfo);
      window.location.replace(client_domain);
    } catch (e) {
      console.log("UPDATE ERROR");
      setIsUpdateError(true);
    }
  };

  const handleSignUp = async (event, userSignUpInfo) => {
    event.preventDefault();

    //If empty
    if (!Object.values(userSignUpInfo).every((e) => e !== "")) {
      return setIsSignUpEmpty(true);
    }

    setIsSignUpEmpty(false);

    try {
      let {
        refresh_token,
        access_expires_in,
        refresh_expires_in,
        access_token
      } = await fetch_auth_register(userSignUpInfo);

      //const access_token = getCookie("access_token");

      //Store new Tokens on the client side
      storeLocalTokens(
        access_token,
        access_expires_in,
        refresh_token,
        refresh_expires_in
      );

      //Get userinfo by using access_token
      getUserInfo(access_token);
      setIsDuplicate(false);
      setIsSignUpError(false);
      setIsValidToken(true);
    } catch (e) {
      console.log("SIGN UP ERROR");
      if (e.response && e.response.status === 409) {
        return setIsDuplicate(true);
      }
      setIsSignUpError(true);
      setIsDuplicate(false);
    }
  };

  /**************
   * Error Alert *
   **************/
  const errorAlert = (str) => {
    if (window.confirm(str)) {
      window.location.replace(client_domain);
    } else {
      window.location.replace(client_domain);
    }
  };

  /*****************
   * Clear Storage *
   *****************/
  const clearEverything = () => {
    localStorage.clear();
    Cookies.remove("access_token");
    clearInterval(timer.current);
  };

  /***********
   * Counter *
   ***********/
  const setCounter = () => {
    const refresh_expires_in = localStorage.getItem("refresh_expires_in");
    const access_expires_in = localStorage.getItem("access_expires_in");
    let rExp = Math.floor(
      (new Date(refresh_expires_in).getTime() -
        new Date(Date.now()).getTime()) /
        1000
    );

    let aExp = Math.floor(
      (new Date(access_expires_in).getTime() - new Date(Date.now()).getTime()) /
        1000
    );

    set_Refresh_Count(rExp);
    set_Access_Count(aExp);
    setIsCounting(true);
  };

  /**************
   * useEffects *
   **************/
  useEffect(() => {
    //Check for third party login
    const queryString = window.location.search;
    if (queryString) {
      storeThirdPartyTokens(queryString);
      window.location.replace(client_domain);
    }

    const refresh_token = localStorage.getItem("refresh_token");
    if (refresh_token !== "undefined" && refresh_token !== null) {
      //Use access_token to fast access profile database data
      getUserInfo();
    }
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => {
      if (isCounting) {
        set_Access_Count((access_token_count) => {
          if (access_token_count > 0) {
            return access_token_count - 1;
          } else {
            return 0;
          }
        });
        set_Refresh_Count((refresh_token_count) => {
          if (refresh_token_count > 0) {
            return refresh_token_count - 1;
          } else {
            return 0;
          }
        });
        /*
        if (refresh_token_count === 0) {
          setIsCounting(false);

          //Remove Cookies and Localstorage data
          clearEverything();
          errorAlert("Your Session is expired. Please login again!");
        }
        */
      }
    }, 1000);

    return () => {
      clearInterval(timer.current);
    };
  }, [access_token_count, refresh_token_count, isCounting]);

  return isValidToken ? (
    <UserPage
      refresh_token_count={refresh_token_count}
      access_token_count={access_token_count}
      userInfo={userInfo}
      handleUpdate={handleUpdate}
      handleLogout={handleLogout}
      isUpdateError={isUpdateError}
    />
  ) : (
    <div class="container-fluid h-100">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-6">
          <div class="jumbotron border border-light">
            <h2>SIGN UP</h2>
            <SignUpPanel
              isSignUpError={isSignUpError}
              isSignUpEmpty={isSignUpEmpty}
              isDuplicate={isDuplicate}
              isLoading={isLoading}
              handleSignUp={handleSignUp}
              setUserInfo={setUserInfo}
            />
          </div>
        </div>
        <div class="col-6">
          <div class="jumbotron border border-light">
            <h2>LOGIN</h2>
            <LoginPanel
              isLoginError={isLoginError}
              isLoading={isLoading}
              handleLocalLogin={handleLocalLogin}
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
            <TwitterLoginPanel handleTwitterLogin={handleTwitterLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}

function fetch_auth_localLogin(username, password) {
  return axios
    .post(server_domain + "/api/auth/localLogin", {
      username: username.toLowerCase(),
      password: password
    })
    .then((res) => res.data);
}

function fetch_auth_refresh(current_refresh_token) {
  const config = {
    headers: { Authorization: `Bearer ${current_refresh_token}` }
  };

  return axios
    .post(server_domain + "/api/auth/refresh", {}, config)
    .then((res) => res.data);
}

function fetch_auth_logout(refresh_token) {
  const config = {
    headers: { Authorization: `Bearer ${refresh_token}` }
  };

  return axios
    .post(server_domain + "/api/auth/logout", {}, config)
    .then((res) => res.data);
}

function fetch_profile_getUserInfo(access_token) {
  const config = {
    headers: { Authorization: `Bearer ${access_token}` }
  };

  return axios
    .post(server_domain + "/api/profile/getUserInfo", {}, config)
    .then((res) => res.data);
}

function fetch_profile_setUserInfo(access_token, userUpdateInfo) {
  const config = {
    headers: { Authorization: `Bearer ${access_token}` }
  };

  return axios
    .post(server_domain + "/api/profile/setUserInfo", userUpdateInfo, config)
    .then((res) => res.data);
}

function fetch_auth_register(userSignUpInfo) {
  return axios
    .post(server_domain + "/api/auth/register", {
      ...userSignUpInfo,
      username: userSignUpInfo.username.toLowerCase(),
      email: userSignUpInfo.username.toLowerCase()
    })
    .then((res) => res.data);
}
