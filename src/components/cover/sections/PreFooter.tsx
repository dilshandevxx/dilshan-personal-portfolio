"use client";

import Link from "next/link";
import styles from "./PreFooter.module.css";

export default function PreFooter() {
  return (
    <section className={styles.preFooter}>
      <p className={styles.topText}>Design anything, build everything.</p>
      <h2 className={styles.mainHeading}>
        Build smooth<br className={styles.mobileBreak} /> creative sites with<br className={styles.mobileBreak} /> us.
      </h2>
      <Link href="mailto:dilshan.devxx@gmail.com" className={styles.talkButton}>
        Talk Today
      </Link>
    </section>
  );
}
