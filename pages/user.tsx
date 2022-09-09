import axios from "axios";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { LogOutButton } from "../components/Buttons/LogInButton";
import Navbar from "../components/Navbar/Navbar";
import { UserInfo } from "../types";
import { GetServerSideProps } from "next";
import Container from "../components/Container/Container";

export default function user() {
  const [user, setUser] = useState<UserInfo>();
  const router = useRouter();
  let alldata: UserInfo;

  async function getUserInfos() {
    const { data } = await axios("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    alldata = { ...data };
    setUser(alldata);
    console.log(alldata);
  }

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      getUserInfos();
    } else router.push("/");
  }, []);

  const logOut = () => {
    window.localStorage.removeItem("token");
    router.push("/");
  };
  return (
    <div>
      <Navbar>
        <LogOutButton logOut onClick={logOut}>
          Log out
        </LogOutButton>
      </Navbar>
      <Container>
        <div>{user?.display_name}</div>
        <img src={user?.images?.[0].url as string} width={50} height={50} />
      </Container>
    </div>
  );
}
