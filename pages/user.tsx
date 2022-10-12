import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { LogOutButton } from "../components/Buttons/Buttons";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { User, Avatar } from "../components/User/User";
import {VscGithubAlt} from "react-icons/vsc"
import {FiTwitter} from "react-icons/fi"
import Link from "next/link";

const UserPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { data, isLoading, error } = useQuery("me", async () => {
    const res = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  });
  if (status === "authenticated") {
    return (
      <>
        <Navbar>
          <User>
            <Avatar src={session.user?.image!} />
            {session.user?.name}
          </User>
          <LogOutButton onClick={() => signOut()}>Sign out</LogOutButton>
        </Navbar>
        <Footer>
          <Link href={'https://github.com/shonjmoj'}>
            <VscGithubAlt size={22}/>
          </Link>
          <Link href={'https://twitter.com/shonjmoj'}>
            <FiTwitter size={22}/>
          </Link>
        </Footer>
      </>
    );
  } else if (status === "unauthenticated") router.push("/");
};

export default UserPage;
