"use client";

/** External */
import { signIn, signOut, useSession } from "next-auth/react";

/** Internal */
import styles from "./page.module.css";

export default function Home() {
  const { data } = useSession();

  return (
    <main className={styles.main}>
      Hi, {data?.user?.name}
      <div onClick={() => signIn("google")}>sign in </div>
      <div onClick={() => signOut("google")}>sign out </div>
    </main>
  );
}
