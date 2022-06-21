import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
import { UserInfo } from "../types";
import { UserProfile } from "../components/User";

const Home: NextPage = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [user, setUser] = useState<UserInfo>();

  useEffect(() => {
    const hash = window.location.hash;
    let token: string | undefined | null = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((e) => e.startsWith("access_token"))
        ?.split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token!);
    }
    setToken(token!);
  }, []);

  async function getUser() {
    const { data } = await axios("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(data);
    console.log(data);
  }

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  const logOut = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <div>
      {token ? (
        <button onClick={logOut}>Log out</button>
      ) : (
        <Link
          href={`${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=${process.env.NEXT_PUBLIC_RESPONSE_TYPE}`}
        >
          Log in
        </Link>
      )}
      {token && (
        <UserProfile
          display_name={user?.display_name}
          images={user?.images}
          external_urls={user?.external_urls}
        />
      )}
    </div>
  );
};

export default Home;
