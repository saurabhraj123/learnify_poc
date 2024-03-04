"use client";

/** External */
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

/** Internal */
import styles from "./page.module.css";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/dashboard");
    return;
  }

  return (
    <main className={styles.main}>
      Hi, {session?.user?.name}
      <div onClick={() => signIn("google")}>sign in </div>
      <div onClick={() => signOut("google")}>sign out </div>
    </main>
  );
}
