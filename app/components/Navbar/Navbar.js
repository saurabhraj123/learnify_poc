"use client";

/** External */
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

/** Internal */
import FullScreenLoader from "../FullScreenLoader";
import { authBtnOptions } from "./modules/NavbarConstants";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <FullScreenLoader />;

  const authBtnOption = session ? authBtnOptions.logout : authBtnOptions.login;

  return (
    <div className={classes.container}>
      <div className={classes.logo} onClick={() => router.push("/")}>
        Learnify
      </div>

      <div className={classes.authBtn} onClick={authBtnOption.onClickHandler}>
        {authBtnOption.text}
      </div>
    </div>
  );
};

export default Navbar;
