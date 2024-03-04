"use client";

/** External */
import { useSession } from "next-auth/react";

/** Internal */
import FullScreenLoader from "../FullScreenLoader";
import { authBtnOptions } from "./modules/NavbarConstants";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <FullScreenLoader />;

  const authBtnOption = session ? authBtnOptions.logout : authBtnOptions.login;

  return (
    <div className={classes.container}>
      <div className={classes.logo}>Learnify</div>

      <div className={classes.authBtn} onClick={authBtnOption.onClickHandler}>
        {authBtnOption.text}
      </div>
    </div>
  );
};

export default Navbar;
