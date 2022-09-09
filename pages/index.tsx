import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserInfo } from "../types";
import { LogInButton } from "../components/Buttons/LogInButton";
import Title from "../components/Title/Title";
import Container from "../components/Container/Container";

const Home: NextPage = () => {
  const router = useRouter();
  const [token, setToken] = useState("");

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

  const handleLogIn = () => {
    window.location =
      `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=${process.env.NEXT_PUBLIC_RESPONSE_TYPE}&show_dialog=true` as
        | Location & (Location | string);
  };

  useEffect(() => {
    if (token) {
      router.push("/user");
    }
  }, [token]);

  return (
    <Container>
      <Title>Spotify</Title>
      {!token && (
        <LogInButton login onClick={handleLogIn}>
          Log in
        </LogInButton>
      )}
    </Container>
  );
};

export default Home;
