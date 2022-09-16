import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { LogOutButton } from "../components/Buttons/Buttons";
import Navbar from "../components/Navbar/Navbar";
import { User, Avatar } from "../components/User/User";

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
      </>
    );
  } else if (status === "unauthenticated") router.push("/");
};

export default UserPage;
