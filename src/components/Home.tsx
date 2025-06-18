import { useEffect } from "react";
import { retrieveloggedInUser } from "../store/auth/authSelector";
import { useAppDispatch, useAppSelector } from "../store/rootTypes";
import { projectsAction } from "../store/projects/projectsSlice";

export default function Home() {
  const currentUser = useAppSelector(retrieveloggedInUser);
  const dispatch = useAppDispatch();
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
