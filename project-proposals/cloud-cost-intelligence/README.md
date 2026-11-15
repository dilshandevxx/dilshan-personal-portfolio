# Cloud Cost Intelligence Platform

> **Status: Planned.** This is a proposal, not an implemented system. No benchmark, uptime, or production-readiness claims are implied.

## Problem
Attribute cloud spend to teams and workloads, detect anomalies, and explain cost/performance trade-offs.

## Domain
FinOps, cloud engineering, data engineering.

## Proposed architecture
Billing exports + resource inventory → normalization → allocation/anomaly analysis → analytical store → dashboards and advisory recommendations.

Validate this architecture against explicit requirements. Prefer a modular monolith or few deployables until independent scaling, fault isolation, or ownership justifies distribution.

## Technology candidates
Python, dbt, DuckDB or ClickHouse, PostgreSQL, cloud billing exports, Prometheus, Grafana

These are candidates, not mandatory choices. Select after evaluating workload fit, maturity, operational burden, security, cost, and team familiarity.

## Functional scope
Billing ingestion, tag coverage, shared-cost allocation, unit cost metrics, anomaly detection, budget alerts, forecasting, and recommendation audit trail.

## Risks and trade-offs
Incorrect attribution, noisy anomalies, stale billing data, and cost optimization that harms reliability.

## Validation strategy
Reconcile totals to source billing; measure allocation coverage, anomaly precision, forecast error, and owner-validated savings.

## Roadmap
1. Billing import
2. normalized model
3. allocation
4. anomaly detection
5. unit economics
6. recommendation workflow.

## Non-functional requirements
Define correctness invariants, performance targets, SLOs, recovery objectives, security boundaries, observability, cost guardrails, and schema/API evolution before implementation.

## Definition of done
- Requirements and ADRs document context, decisions, alternatives, and consequences.
- Critical paths and failure modes have automated tests.
- Security review covers identity, authorization, secrets, inputs, dependencies, and data handling.
- CI and reproducible local setup are available.
- Deployment, rollback, backup, and recovery procedures are tested where relevant.
- Dashboards, alerts, and runbooks exist for production-facing components.
- Performance and cost claims have repeatable evidence; limitations are explicit.

## Learning objectives
Develop engineering judgment across finops, cloud engineering, data engineering; study the underlying concepts before adopting tools.

## Starting references
- [Kubernetes documentation](https://kubernetes.io/docs/)
- [OpenTelemetry documentation](https://opentelemetry.io/docs/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Google SRE books](https://sre.google/books/)
- [Designing Data-Intensive Applications](https://dataintensive.net/)

---
**Portfolio disclosure:** proposal only; not implemented or production-tested.
