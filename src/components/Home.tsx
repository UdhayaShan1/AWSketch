import { useEffect } from "react";
import { loggedInUser } from "../store/auth/authSelector";
import { useAppSelector } from "../store/rootTypes";

export default function Home() {
  const currentUser = useAppSelector(loggedInUser);
  useEffect(() => {
    console.log(currentUser, currentUser.credProfile, currentUser.userProfile, "LOL")
  }, [currentUser]);
  return <h1>Home Page</h1>;
}
