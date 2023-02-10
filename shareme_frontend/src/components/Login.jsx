import React, { useEffect } from "react";
//import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import jwt_decode from "jwt-decode";
import { gapi } from "gapi-script";

import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_API_TOKEN,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });
  const responseGoogle = (response) => {
    try {
      console.log("reponse is");
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.profileObj));
      console.log("here 1");
      //var decodedHeader = jwt_decode(response.credential, { header: true });
      console.log("here 2");
      //const { name, sub, picture } = response.profileObj;
      const { name, googleId, imageUrl } = response.profileObj;
      //const { name, sub, picture } = decodedHeader;
      console.log("decoded header");
      //console.log(decodedHeader);
      // const doc = {
      //   _id: sub,
      //   _type: "user",
      //   userName: name,
      //   image: picture,
      // };
      const doc = {
        _id: googleId,
        _type: "user",
        userName: name,
        image: imageUrl,
      };
      client.createIfNotExists(doc).then(() => {
        navigate("/", { replace: true });
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          Loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="aabsolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" />
                  Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
          {/* <GoogleOAuthProvider
            clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
            className="shadow-2xl"
          >
            <GoogleLogin
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </GoogleOAuthProvider> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
