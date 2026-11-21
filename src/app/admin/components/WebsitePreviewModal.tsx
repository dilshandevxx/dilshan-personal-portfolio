"use client";

import React, { useState } from "react";
import {
  X,
  RotateCw,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
} from "lucide-react";
import styles from "../admin.module.css";

interface WebsitePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DeviceType = "desktop" | "tablet" | "mobile";

export const WebsitePreviewModal: React.FC<WebsitePreviewModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [route, setRoute] = useState<string>("/");
  const [refreshKey, setRefreshKey] = useState<number>(0);

  if (!isOpen) return null;

  const getWidth = () => {
    switch (device) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      default:
        return "100%";
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={`${styles.modalDialog} ${styles.modalXLarge}`}
        style={{ height: "92vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Controls */}
        <div className={styles.modalHeader}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <h3 className={styles.modalTitle}>Website Live Viewport</h3>

            {/* Route selector */}
            <select
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              className={styles.selectField}
              style={{ width: "auto", padding: "0.35rem 0.65rem", fontSize: "0.78rem" }}
            >
              <option value="/">Homepage (/)</option>
              <option value="/projects">Projects (/projects)</option>
              <option value="/about">About Me (/about)</option>
              <option value="/#skills">Technical Expertise (/#skills)</option>
              <option value="/#contact">Contact (/#contact)</option>
            </select>
          </div>

          {/* Viewport switchers */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div className={styles.deviceSelector}>
              <button
                type="button"
                className={`${styles.deviceBtn} ${device === "desktop" ? styles.deviceBtnActive : ""}`}
                onClick={() => setDevice("desktop")}
                title="Desktop (100%)"
              >
                <Monitor size={14} />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                className={`${styles.deviceBtn} ${device === "tablet" ? styles.deviceBtnActive : ""}`}
                onClick={() => setDevice("tablet")}
                title="Tablet (768px)"
              >
                <Tablet size={14} />
                <span>Tablet</span>
              </button>
              <button
                type="button"
                className={`${styles.deviceBtn} ${device === "mobile" ? styles.deviceBtnActive : ""}`}
                onClick={() => setDevice("mobile")}
                title="Mobile (375px)"
              >
                <Smartphone size={14} />
                <span>Mobile</span>
              </button>
            </div>

            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={handleRefresh}
              title="Refresh Preview"
            >
              <RotateCw size={15} />
            </button>

            <a
              href={route}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.modalCloseBtn}
              title="Open route in new window"
            >
              <ExternalLink size={15} />
            </a>

            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={onClose}
              aria-label="Close Preview"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Iframe Viewport Frame */}
        <div className={styles.modalBody} style={{ padding: "1.25rem", display: "flex", justifyContent: "center", backgroundColor: "#0b0c0e" }}>
          <div
            style={{
              width: getWidth(),
              height: "100%",
              minHeight: "580px",
              display: "flex",
              flexDirection: "column",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid #292b31",
              boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
              transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <iframe
              key={refreshKey}
              src={route}
              title="Portfolio Live Preview"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                backgroundColor: "#101113",
              }}
            />
          </div>
        </div>

        {/* Footer info */}
        <div className={styles.modalFooter} style={{ justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.75rem", color: "#92949d" }}>
            Showing live render of <code style={{ color: "#f2f2f0" }}>{route}</code> with active dark/light theme tokens.
          </span>
          <button type="button" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`} onClick={onClose}>
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
