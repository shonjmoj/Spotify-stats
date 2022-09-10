import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { LogInButton, LogOutButton } from "../components/Buttons/LogInButton";
import Title from "../components/Title/Title";
import Container from "../components/Container/Container";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Navbar from "../components/Navbar/Navbar";
import User from "../components/User/User";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  if (status === "authenticated")
    return (
      <>
        <Navbar>
          <User> {session.user?.name}</User>
          <LogOutButton login onClick={() => signOut()}>
            signOut
          </LogOutButton>
        </Navbar>
      </>
    );
  return (
    <>
      <Container>
        <Title>Spotify</Title>
        <LogInButton login onClick={() => signIn()}>
          Sign in
        </LogInButton>
      </Container>
    </>
  );
};

export default Home;
