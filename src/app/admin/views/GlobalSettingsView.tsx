"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Save,
  Check,
  Plus,
  Trash2,
  Sliders,
  Globe,
  Share2,
  FileCode,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import styles from "../admin.module.css";
import { CMSGlobalSettings, DEFAULT_GLOBAL_SETTINGS } from "@/services/cmsDataStore";

interface GlobalSettingsViewProps {
  initialSubTab?: "nav" | "branding" | "social" | "footer" | "seo";
  settings: CMSGlobalSettings;
  onSave: (settings: Partial<CMSGlobalSettings>) => Promise<void>;
}

const safeSettings = (input?: Partial<CMSGlobalSettings>): CMSGlobalSettings => ({
  ...DEFAULT_GLOBAL_SETTINGS,
  ...(input || {}),
  navLinks:
    Array.isArray(input?.navLinks) && input.navLinks.length > 0
      ? input.navLinks
      : DEFAULT_GLOBAL_SETTINGS.navLinks,
  socials:
    Array.isArray(input?.socials) && input.socials.length > 0
      ? input.socials
      : DEFAULT_GLOBAL_SETTINGS.socials,
});

export const GlobalSettingsView: React.FC<GlobalSettingsViewProps> = ({
  initialSubTab = "nav",
  settings,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<"nav" | "branding" | "social" | "footer" | "seo">(initialSubTab);
  const [formData, setFormData] = useState<CMSGlobalSettings>(() => safeSettings(settings));
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFormData(safeSettings(settings));
  }, [settings]);

  useEffect(() => {
    if (initialSubTab) {
      setActiveTab(initialSubTab);
    }
  }, [initialSubTab]);

  const navLinksList = Array.isArray(formData.navLinks) ? formData.navLinks : [];
  const socialsList = Array.isArray(formData.socials) ? formData.socials : [];

  const handleChange = (field: keyof CMSGlobalSettings, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    try {
      await onSave(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  // Nav link helpers
  const handleUpdateNavLink = (index: number, field: string, value: any) => {
    const list = [...navLinksList];
    if (!list[index]) return;
    list[index] = { ...list[index], [field]: value };
    handleChange("navLinks", list);
  };

  const handleAddNavLink = () => {
    const newLink = {
      id: `nav-${Date.now()}`,
      label: "NEW LINK",
      url: "/#",
      order: navLinksList.length + 1,
    };
    handleChange("navLinks", [...navLinksList, newLink]);
  };

  const handleRemoveNavLink = (index: number) => {
    const list = navLinksList.filter((_, idx) => idx !== index);
    handleChange("navLinks", list);
  };

  // Social link helpers
  const handleUpdateSocial = (index: number, field: string, value: any) => {
    const list = [...socialsList];
    if (!list[index]) return;
    list[index] = { ...list[index], [field]: value };
    handleChange("socials", list);
  };

  const handleAddSocial = () => {
    const newSocial = {
      id: `soc-${Date.now()}`,
      platform: "Twitter",
      url: "https://x.com",
      handle: "@handle",
    };
    handleChange("socials", [...socialsList, newSocial]);
  };

  const handleRemoveSocial = (index: number) => {
    const list = socialsList.filter((_, idx) => idx !== index);
    handleChange("socials", list);
  };

  return (
    <div>
      {/* View Header */}
      <div className={styles.viewHeader}>
        <div className={styles.viewTitleGroup}>
          <h1 className={styles.viewTitle}>Global Website Settings</h1>
          <p className={styles.viewSubtitle}>
            Configure site-wide branding, primary navigation, social media channels, footer copy, and SEO metadata.
          </p>
        </div>

        <div className={styles.viewActions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <span className={styles.spinner} style={{ width: 14, height: 14 }} />
            ) : savedSuccess ? (
              <Check size={14} />
            ) : (
              <Save size={14} />
            )}
            <span>{saving ? "Saving..." : savedSuccess ? "Settings Saved" : "Save Settings"}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsNav}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "nav" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("nav")}
        >
          Navigation
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "branding" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("branding")}
        >
          Branding & Theme
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "social" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("social")}
        >
          Social Links
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "footer" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("footer")}
        >
          Footer
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "seo" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("seo")}
        >
          SEO Settings
        </button>
      </div>

      {/* Tab 1: Navigation Links */}
      {activeTab === "nav" && (
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h3 className={styles.sectionTitle}>Main Navigation Menu</h3>
                <p className={styles.sectionDescription}>
                  Manage the top header navigation links and primary call-to-action button.
                </p>
              </div>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
                onClick={handleAddNavLink}
              >
                <Plus size={14} />
                <span>Add Link</span>
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {formData.navLinks.map((link, idx) => (
              <div
                key={link.id || idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.85rem 1rem",
                  backgroundColor: "#141518",
                  border: "1px solid #292b31",
                  borderRadius: "6px",
                }}
              >
                <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "#65676e", width: "24px" }}>
                  #{idx + 1}
                </span>

                <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "0.75rem" }}>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={link.label}
                    onChange={(e) => handleUpdateNavLink(idx, "label", e.target.value)}
                    placeholder="Link Label"
                  />
                  <input
                    type="text"
                    className={styles.inputField}
                    value={link.url}
                    onChange={(e) => handleUpdateNavLink(idx, "url", e.target.value)}
                    placeholder="Destination URL (e.g. /projects)"
                  />
                </div>

                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnDanger} ${styles.btnSm}`}
                  onClick={() => handleRemoveNavLink(idx)}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>

          {/* CTA Button Settings */}
          <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #292b31" }}>
            <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "0.95rem", color: "#f2f2f0" }}>
              Header Call-to-Action Button
            </h4>
            <div className={styles.fieldGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Button Text</label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={formData.ctaButtonText || ""}
                  onChange={(e) => handleChange("ctaButtonText", e.target.value)}
                  placeholder="e.g. Join 70K+ Readers"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Destination URL</label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={formData.ctaButtonUrl || ""}
                  onChange={(e) => handleChange("ctaButtonUrl", e.target.value)}
                  placeholder="e.g. /#contact"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Branding & Theme */}
      {activeTab === "branding" && (
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Branding & Visual Tokens</h3>
            <p className={styles.sectionDescription}>
              Configure the studio brand name, wordmark, monogram, and accent color.
            </p>
          </div>

          <div className={styles.fieldGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Brand Name</label>
              <input
                type="text"
                className={styles.inputField}
                value={formData.brandName}
                onChange={(e) => handleChange("brandName", e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Header Wordmark</label>
              <input
                type="text"
                className={styles.inputField}
                value={formData.wordmark}
                onChange={(e) => handleChange("wordmark", e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Monogram / Initials</label>
              <input
                type="text"
                className={styles.inputField}
                value={formData.initials}
                onChange={(e) => handleChange("initials", e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Edition Subtitle</label>
              <input
                type="text"
                className={styles.inputField}
                value={formData.editionText}
                onChange={(e) => handleChange("editionText", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Accent Hex Color</label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <input
                type="color"
                value={formData.accentColor || "#6366f1"}
                onChange={(e) => handleChange("accentColor", e.target.value)}
                style={{
                  width: "40px",
                  height: "36px",
                  border: "1px solid #292b31",
                  borderRadius: "6px",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                }}
              />
              <input
                type="text"
                className={styles.inputField}
                value={formData.accentColor}
                onChange={(e) => handleChange("accentColor", e.target.value)}
                style={{ width: "140px" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Social Links */}
      {activeTab === "social" && (
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h3 className={styles.sectionTitle}>Social Media & Direct Channels</h3>
                <p className={styles.sectionDescription}>
                  Link your verified professional networks, code repositories, and communication channels.
                </p>
              </div>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
                onClick={handleAddSocial}
              >
                <Plus size={14} />
                <span>Add Channel</span>
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {formData.socials.map((soc, idx) => (
              <div
                key={soc.id || idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.85rem 1rem",
                  backgroundColor: "#141518",
                  border: "1px solid #292b31",
                  borderRadius: "6px",
                }}
              >
                <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr", gap: "0.75rem" }}>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={soc.platform}
                    onChange={(e) => handleUpdateSocial(idx, "platform", e.target.value)}
                    placeholder="Platform"
                  />
                  <input
                    type="text"
                    className={styles.inputField}
                    value={soc.url}
                    onChange={(e) => handleUpdateSocial(idx, "url", e.target.value)}
                    placeholder="URL"
                  />
                  <input
                    type="text"
                    className={styles.inputField}
                    value={soc.handle}
                    onChange={(e) => handleUpdateSocial(idx, "handle", e.target.value)}
                    placeholder="Handle (e.g. @dilshan)"
                  />
                </div>

                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnDanger} ${styles.btnSm}`}
                  onClick={() => handleRemoveSocial(idx)}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Footer */}
      {activeTab === "footer" && (
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Footer Content</h3>
            <p className={styles.sectionDescription}>
              Manage the copyright statement and mission note rendered at the base of every page.
            </p>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Copyright Statement</label>
            <input
              type="text"
              className={styles.inputField}
              value={formData.copyrightStatement}
              onChange={(e) => handleChange("copyrightStatement", e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Footer Tagline / Bio</label>
            <textarea
              className={styles.textareaField}
              rows={3}
              value={formData.footerTagline}
              onChange={(e) => handleChange("footerTagline", e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Tab 5: SEO Settings */}
      {activeTab === "seo" && (
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Default Search & Social SEO Metadata</h3>
            <p className={styles.sectionDescription}>
              Default title, description, and OpenGraph social banner used across the portfolio.
            </p>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Default Page Title</label>
            <input
              type="text"
              className={styles.inputField}
              value={formData.defaultTitle}
              onChange={(e) => handleChange("defaultTitle", e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Default Description</label>
            <textarea
              className={styles.textareaField}
              rows={3}
              value={formData.defaultDescription}
              onChange={(e) => handleChange("defaultDescription", e.target.value)}
            />
          </div>

          <div className={styles.fieldGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Default OG Social Banner Image URL</label>
              <input
                type="text"
                className={styles.inputField}
                value={formData.ogImageUrl}
                onChange={(e) => handleChange("ogImageUrl", e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Twitter / X Creator Handle</label>
              <input
                type="text"
                className={styles.inputField}
                value={formData.twitterHandle}
                onChange={(e) => handleChange("twitterHandle", e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
