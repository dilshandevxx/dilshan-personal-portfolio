"use client";

import React, { useState } from "react";
import { TechnicalDocSection, ProjectStackLayer, ProjectBenchmark } from "@/data/projects";
import { Code, Database, Copy, Check, Terminal, Shield, BarChart3, Layers } from "lucide-react";
import styles from "./ProjectTechDeepDive.module.css";

interface ProjectTechDeepDiveProps {
  technicalDocs: TechnicalDocSection[];
  stackLayers: ProjectStackLayer[];
  benchmarks: ProjectBenchmark[];
  fallbackTags?: string[];
}

export function ProjectTechDeepDive({
  technicalDocs,
  stackLayers,
  benchmarks,
  fallbackTags = [],
}: ProjectTechDeepDiveProps) {
  const [activeDocIndex, setActiveDocIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const activeDoc = technicalDocs[activeDocIndex] || technicalDocs[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="tech-docs" className={styles.sectionRoot}>
      <div className={styles.sectionHeader}>
        <div className={styles.metaRow}>
          <span className={styles.sectionIndex}>08 / TECHNICAL SPECIFICATION</span>
          <span className={styles.metaDivider}>•</span>
          <span className={styles.metaSub}>DOCS & STACK MATRIX</span>
        </div>
        <h2 className={styles.sectionTitle}>Technical Documentation & Architecture Specs</h2>
        <p className={styles.sectionSubtitle}>
          In-depth technical contracts, database schemas, performance benchmarks, and layer-by-layer technology stacks.
        </p>
      </div>

      {/* 1. Categorized Stack Matrix */}
      <div className={styles.stackMatrixContainer}>
        <div className={styles.matrixTitleRow}>
          <Layers size={16} className={styles.matrixIcon} />
          <h3 className={styles.matrixTitle}>Technology Stack Matrix</h3>
        </div>

        {stackLayers && stackLayers.length > 0 ? (
          <div className={styles.stackLayersGrid}>
            {stackLayers.map((layer, idx) => (
              <div key={idx} className={styles.stackLayerCard}>
                <span className={styles.layerName}>{layer.layer}</span>
                <div className={styles.techBadges}>
                  {layer.technologies.map((tech) => (
                    <span key={tech} className={styles.techBadge}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.techBadges}>
            {fallbackTags.map((tag) => (
              <span key={tag} className={styles.techBadge}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 2. Tabbed Technical Documentation & Code Viewer */}
      {technicalDocs && technicalDocs.length > 0 && (
        <div className={styles.docsContainer}>
          {/* Docs Tab Selector */}
          <div className={styles.tabsHeader}>
            {technicalDocs.map((doc, idx) => {
              const isActive = idx === activeDocIndex;
              return (
                <button
                  key={doc.id || idx}
                  type="button"
                  onClick={() => setActiveDocIndex(idx)}
                  className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : ""}`}
                >
                  <Terminal size={14} />
                  <span>{doc.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Document Body */}
          <div className={styles.docCard}>
            <div className={styles.docMeta}>
              <h3 className={styles.docTitle}>{activeDoc.title}</h3>
              {activeDoc.subtitle && (
                <p className={styles.docSubtitle}>{activeDoc.subtitle}</p>
              )}
            </div>

            <p className={styles.docContent}>{activeDoc.content}</p>

            {activeDoc.codeSnippet && (
              <div className={styles.codeSnippetBox}>
                <div className={styles.snippetHeader}>
                  <div className={styles.snippetTitle}>
                    <Code size={14} />
                    <span>{activeDoc.codeSnippet.title || "Code Sample"}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(activeDoc.codeSnippet!.code)}
                    className={styles.copyBtn}
                    aria-label="Copy snippet"
                  >
                    {copied ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <pre className={styles.codeBlock}>
                  <code>{activeDoc.codeSnippet.code}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Performance & Benchmark Indicators */}
      {benchmarks && benchmarks.length > 0 && (
        <div className={styles.benchmarksContainer}>
          <div className={styles.benchmarksHeader}>
            <BarChart3 size={16} className={styles.benchmarksIcon} />
            <h3 className={styles.benchmarksTitle}>System Performance & Reliability Benchmarks</h3>
          </div>

          <div className={styles.benchmarksGrid}>
            {benchmarks.map((b, i) => (
              <div key={i} className={styles.benchmarkCard}>
                <span className={styles.benchmarkMetric}>{b.metric}</span>
                <span className={styles.benchmarkVal}>{b.value}</span>
                {b.comparison && (
                  <span className={styles.benchmarkComparison}>{b.comparison}</span>
                )}
                {b.note && <span className={styles.benchmarkNote}>{b.note}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
