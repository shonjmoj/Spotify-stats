import type { NextPage } from "next";
import React from "react";
import { LogInButton } from "../components/Buttons/Buttons";
import Title from "../components/Title/Title";
import Container from "../components/Container/Container";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "authenticated") router.push("/user");
  return (
    <>
      <Container>
        <Title>Spotify</Title>
        <LogInButton onClick={() => signIn()}>Sign in</LogInButton>
      </Container>
    </>
  );
};

export default Home;
