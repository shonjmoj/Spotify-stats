import axios from "axios";
import { getToken } from "next-auth/jwt";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LogOutButton } from "../components/Buttons/Buttons";
import Navbar from "../components/Navbar/Navbar";
import { User, Avatar } from "../components/User/User";

const UserPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState();
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
