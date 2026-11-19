"use client";

import React, { useState } from "react";
import { ArchitectureStep } from "@/data/projects";
import { Cpu, ArrowRight, Layers, Database, Sparkles, Check } from "lucide-react";
import styles from "./ProjectArchitecture.module.css";

interface ProjectArchitectureProps {
  architectureSummary: string;
  steps: ArchitectureStep[];
}

export function ProjectArchitecture({
  architectureSummary,
  steps,
}: ProjectArchitectureProps) {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  if (!steps || steps.length === 0) return null;

  const activeStep = steps[activeStepIndex] || steps[0];

  return (
    <section id="architecture" className={styles.sectionRoot}>
      <div className={styles.sectionHeader}>
        <div className={styles.metaRow}>
          <span className={styles.sectionIndex}>05 / ARCHITECTURE</span>
          <span className={styles.metaDivider}>•</span>
          <span className={styles.metaSub}>SYSTEM TOPOLOGY</span>
        </div>
        <h2 className={styles.sectionTitle}>System Architecture & Data Flow</h2>
        <p className={styles.sectionSubtitle}>
          End-to-end data pipeline detailing ingestion, transform pipelines, distributed persistence, and output streaming.
        </p>
      </div>

      {/* Architecture Narrative Lead */}
      <div className={styles.summaryCard}>
        <div className={styles.summaryBadge}>
          <Layers size={16} />
          <span>ARCHITECTURE OVERVIEW</span>
        </div>
        <p className={styles.summaryText}>{architectureSummary}</p>
      </div>

      {/* Interactive Pipeline Step Selector */}
      <div className={styles.pipelineContainer}>
        <div className={styles.pipelineSteps}>
          {steps.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`${styles.stepButton} ${isActive ? styles.stepButtonActive : ""}`}
                aria-pressed={isActive}
              >
                <div className={styles.stepNumCircle}>
                  <span>{step.step || String(idx + 1).padStart(2, "0")}</span>
                </div>
                <div className={styles.stepMeta}>
                  <span className={styles.stepTitleLabel}>{step.title}</span>
                  <span className={styles.stepSubLabel}>Phase {idx + 1}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={styles.stepConnector} aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Card */}
        <div className={styles.stepDetailCard}>
          <div className={styles.detailHeader}>
            <div className={styles.detailNumBadge}>
              PHASE {activeStep.step || String(activeStepIndex + 1).padStart(2, "0")}
            </div>
            <h3 className={styles.detailTitle}>{activeStep.title}</h3>
          </div>

          <p className={styles.detailDescription}>{activeStep.description}</p>

          {activeStep.technologies && activeStep.technologies.length > 0 && (
            <div className={styles.techStackRow}>
              <span className={styles.techStackLabel}>Engineered With:</span>
              <div className={styles.techTags}>
                {activeStep.technologies.map((tech, i) => (
                  <span key={i} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Visual Architecture Schematic */}
      <div className={styles.schematicCanvas}>
        <div className={styles.schematicHeader}>
          <span className={styles.schematicDot} />
          <span className={styles.schematicTitle}>DATA TRANSMISSION FLOWCHART</span>
        </div>

        <div className={styles.nodesGrid}>
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`${styles.nodeCard} ${idx === activeStepIndex ? styles.nodeCardSelected : ""}`}
              onClick={() => setActiveStepIndex(idx)}
            >
              <div className={styles.nodeHeader}>
                <span className={styles.nodeIdx}>{step.step || `0${idx + 1}`}</span>
                <span className={styles.nodeIcon}>
                  {idx === 0 ? <Layers size={14} /> : idx === steps.length - 1 ? <Sparkles size={14} /> : <Database size={14} />}
                </span>
              </div>
              <span className={styles.nodeTitle}>{step.title}</span>
              {idx < steps.length - 1 && (
                <div className={styles.nodeArrow} aria-hidden="true">
                  <ArrowRight size={14} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
