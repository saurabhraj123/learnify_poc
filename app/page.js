"use client";

/** External */
import { useSession } from "next-auth/react";

/** Internal */
import styles from "./page.module.css";

export default function Home() {
  const { data, status } = useSession();

  return <main className={styles.main}>Hi, {data?.user?.name}</main>;
}
