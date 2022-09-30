import styles from "./layout.module.scss";
import Head from "next/head";
import SideStrip from "../SideStripe/SideStripe.js";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>/* ici on met le head général */</Head>
      <SideStrip />
      <main>{children}</main>
    </div>
  );
}
