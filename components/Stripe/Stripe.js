import styles from "./stripe.module.scss";
import Link from "next/link";

const Stripe = ({ name, img }) => (
  <div className={styles.stripe} style={{ backgroundImage: `url(${img})` }}>
    <div className={styles.stripe__filter}></div>
    <Link href="/">
      <h2>{name}</h2>
    </Link>
  </div>
);

export default Stripe;
