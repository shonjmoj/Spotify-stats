import axios from "axios";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { UserInfo } from "../types";

export default function user() {
  const [user, setUser] = useState<UserInfo>();
  const router = useRouter();

  async function getUser() {
    const { data } = await axios("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    setUser(data);
    console.log(data);
  }

  useEffect(() => {
    if (window.localStorage.getItem("token")) getUser();
    else router.push("/");
  }, []);

  const logOut = () => {
    window.localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div>
      <button onClick={logOut}>Log out</button>
      <div>{user?.display_name}</div>
      <img src={user?.images?.[0].url as string} width={50} height={50} />
    </div>
  );
}
