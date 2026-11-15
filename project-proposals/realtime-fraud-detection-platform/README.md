# Real-Time Fraud Detection Platform

> **Status:** Planned — documentation only. No implementation or benchmark claims are made here.

## 1. Problem statement

Score transactions in a low-latency stream using online features and models, while preserving traceability and graceful fallback.

## 2. Intended users and use cases

Payment and risk engineering teams. The first iteration should target one narrow, testable workflow rather than attempting to become a general-purpose platform.

## 3. Proposed architecture

Transaction API → event stream → feature enrichment → model scoring service → policy engine → decision and audit log. Offline training consumes immutable event history; feedback labels feed evaluation.

This is a starting hypothesis. Validate component boundaries against explicit functional and non-functional requirements before implementation. Prefer a modular monolith or a small number of deployable components until independent scaling or ownership justifies distribution.

## 4. Initial technology candidates

Python, Kafka, Flink, FastAPI, PostgreSQL, Redis, scikit-learn or XGBoost, MLflow, Prometheus

These are candidates, not mandatory choices. Select final technologies after comparing operational burden, ecosystem maturity, performance needs, team familiarity, security posture, and total cost of ownership.

## 5. Functional scope

Streaming ingestion; feature enrichment; model serving; rules-plus-model decisioning; idempotent event processing; delayed label handling; explainable decision metadata; replay and backtesting.

## 6. Non-functional requirements to define

- **Correctness:** define invariants, consistency expectations, and failure semantics.
- **Latency and throughput:** establish workload assumptions and p50/p95/p99 targets before benchmarking.
- **Availability and recovery:** define service-level objectives, RPO/RTO where relevant, backup, restore, and rollback procedures.
- **Security:** threat model trust boundaries, identity, authorization, secrets, data handling, and supply-chain risks.
- **Observability:** instrument logs, metrics, and traces; define actionable alerts and service ownership.
- **Cost:** estimate infrastructure and third-party costs; define unit economics and budget guardrails.
- **Maintainability:** document interfaces, schema evolution, operational ownership, and upgrade strategy.

## 7. Key risks and trade-offs

False positives, class imbalance, delayed labels, duplicate events, and scoring dependency outages. Separate model score from business decision policy.

## 8. Validation and success criteria

Measure precision/recall at operating thresholds, PR-AUC, decision latency, throughput, false-positive cost, and replay determinism.

Do not publish numerical results until they have been measured with a documented environment, workload, methodology, and repeatable test procedure.

## 9. Development roadmap

1. Offline baseline
2. event schema
3. streaming features
4. online scorer
5. policy and audit
6. replay and resilience tests.

## 10. Definition of done

- Requirements, architecture decisions, and trade-offs are documented.
- Unit, integration, and failure-path tests cover critical behavior.
- Security review covers authentication, authorization, secrets, input validation, and dependency risk.
- CI checks and reproducible local setup are available.
- Deployment, rollback, backup, and recovery instructions are tested where applicable.
- Dashboards, alerts, and operational runbooks exist for production-facing components.
- Performance and cost claims are backed by reproducible measurements.
- Limitations and future work are stated honestly.

## 11. Architecture decision records

Create an ADR for consequential decisions. Each ADR should record context, decision, alternatives, consequences, and revisit conditions.

## 12. Learning objectives

Use this project to strengthen systems thinking in machine learning · streaming · backend · reliability. Study the relevant official documentation and foundational concepts before choosing abstractions.

## 13. References to begin with

- [Kubernetes documentation](https://kubernetes.io/docs/) — when container orchestration is relevant.
- [OpenTelemetry documentation](https://opentelemetry.io/docs/) — observability conventions and instrumentation.
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) — application security practices.
- [Google SRE books](https://sre.google/books/) — reliability engineering principles.
- [Designing Data-Intensive Applications](https://dataintensive.net/) — distributed data systems foundations.

Select additional domain-specific primary sources during the design phase.

---

**Portfolio disclosure:** This repository contains a proposal and engineering plan only. It is not evidence that the system has been built, deployed, or production-tested.
