import React, { useState } from "react";

function getCookie(name) {
  var parts = document.cookie.split(name + "=");
  if (parts.length === 2) {
    return parts[1].split(";")[0];
  }
}

const {Kakao} = window;
function Test() {
    const token = getCookie("authorize-access-token");
    const [accesstoken, setToken] = useState("");
    if (token) {
      Kakao.Auth.setAccessToken(token);
      Kakao.Auth.getStatusInfo()
        .then(function (res) {
          if (res.status === "connected") {
            setToken(Kakao.Auth.getAccessToken());
          }
        })
        .catch(function (err) {
          Kakao.Auth.setAccessToken(null);
        });
    }
    return(
        <div>
            왜!!!
            {accesstoken}
        </div>
    )
}
export default Test;