/** External */
import { signIn, signOut } from "next-auth/react";

export const authBtnOptions = {
  login: {
    text: "Log in",
    onClickHandler: () => signIn("google"),
  },
  logout: {
    text: "Log out",
    onClickHandler: () => signOut(),
  },
};
