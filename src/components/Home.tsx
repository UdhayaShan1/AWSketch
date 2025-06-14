import { useEffect } from "react";
import { retrieveloggedInUser } from "../store/auth/authSelector";
import { useAppSelector } from "../store/rootTypes";

export default function Home() {
  const currentUser = useAppSelector(retrieveloggedInUser);
  useEffect(() => {
    console.log(
      currentUser,
      currentUser.credProfile,
      currentUser.userProfile,
      "LOL"
    );
  }, [currentUser]);
  return <h1>Home Page Welcome {currentUser.credProfile?.email}</h1>;
}
