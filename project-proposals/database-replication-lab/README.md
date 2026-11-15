# Database Replication & Recovery Lab

> **Status: Planned.** This is a proposal, not an implemented system. No benchmark, uptime, or production-readiness claims are implied.

## Problem
Study replication lag, failover, consistency, backup, and point-in-time recovery through reproducible failure experiments.

## Domain
Databases, distributed systems, SRE.

## Proposed architecture
Application workload → primary database → replicas → proxy/failover controller; WAL/archive backups support restore/PITR; telemetry tracks lag and recovery.

Validate this architecture against explicit requirements. Prefer a modular monolith or few deployables until independent scaling, fault isolation, or ownership justifies distribution.

## Technology candidates
PostgreSQL, Patroni, PgBouncer, WAL-G, Docker, Prometheus, Grafana

These are candidates, not mandatory choices. Select after evaluating workload fit, maturity, operational burden, security, cost, and team familiarity.

## Functional scope
Replication modes, read routing, failover, split-brain prevention, backup verification, PITR, connection draining, schema migrations, RPO/RTO runbooks.

## Risks and trade-offs
Failover data loss, stale replica reads, backups that never restore, and connection storms. HA is not backup.

## Validation strategy
Measure RPO/RTO during primary loss, replica lag, restore correctness, and application failover behavior.

## Roadmap
1. Single node
2. replica
3. controlled failover
4. backup/PITR
5. failure drills
6. RPO/RTO report.

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
Develop engineering judgment across databases, distributed systems, sre; study the underlying concepts before adopting tools.

## Starting references
- [Kubernetes documentation](https://kubernetes.io/docs/)
- [OpenTelemetry documentation](https://opentelemetry.io/docs/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Google SRE books](https://sre.google/books/)
- [Designing Data-Intensive Applications](https://dataintensive.net/)

---
**Portfolio disclosure:** proposal only; not implemented or production-tested.
