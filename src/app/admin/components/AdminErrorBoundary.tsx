"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import styles from "../admin.module.css";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AdminErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[Admin Error Boundary]", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.dashboardPanel} style={{ padding: "2.5rem 1.5rem", textAlign: "center" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "rgba(239, 68, 68, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.25rem",
              color: "#ef4444",
            }}
          >
            <AlertTriangle size={24} />
          </div>
          <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", color: "#f2f2f0" }}>
            {this.props.fallbackTitle || "Unable to render section"}
          </h3>
          <p style={{ margin: "0 0 1.5rem 0", fontSize: "0.85rem", color: "#92949d", maxWidth: 440, marginLeft: "auto", marginRight: "auto" }}>
            {this.state.error?.message || "An unexpected error occurred while rendering this editor view."}
          </p>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={this.handleReset}
            style={{ margin: "0 auto" }}
          >
            <RotateCcw size={14} />
            <span>Reload Section</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
