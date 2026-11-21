"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cmsDataStore } from "@/services/cmsDataStore";
import styles from "./AboutShowcaseBanner.module.css";

interface AboutShowcaseBannerProps {
  imageSrc?: string;
  altText?: string;
}

export default function AboutShowcaseBanner({
  imageSrc,
  altText = "Deep-tech autonomous hardware and satellite telemetry engineering",
}: AboutShowcaseBannerProps) {
  const [bannerUrl, setBannerUrl] = useState<string>(
    imageSrc || "/images/about-visual-banner.webp"
  );
  const [alt, setAlt] = useState<string>(altText);

  useEffect(() => {
    let isMounted = true;
    cmsDataStore
      .getHomepageData()
      .then((data) => {
        if (!isMounted) return;
        if (data.aboutBannerUrl) setBannerUrl(data.aboutBannerUrl);
        if (data.aboutBannerAlt) setAlt(data.aboutBannerAlt);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className={styles.showcaseSection} aria-label="Visual Engineering Showcase">
      <div className={styles.container}>
        <motion.div
          className={styles.bannerFrame}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={bannerUrl}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 94vw, 1360px"
            className={styles.bannerImage}
            priority={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
