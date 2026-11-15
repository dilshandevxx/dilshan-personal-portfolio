# Resilient API Platform & Load Lab

> **Status: Planned.** This is a proposal, not an implemented system. No benchmark, uptime, or production-readiness claims are implied.

## Problem
Build an API baseline demonstrating rate limits, backpressure, caching, graceful degradation, and measurable SLOs.

## Domain
Backend engineering, SRE, performance, security.

## Proposed architecture
Edge proxy → API → cache/database → worker queue; request budgets, bulkheads, circuit breakers, and probes protect dependencies.

Validate this architecture against explicit requirements. Prefer a modular monolith or few deployables until independent scaling, fault isolation, or ownership justifies distribution.

## Technology candidates
Go or FastAPI, PostgreSQL, Redis, Nginx, Docker, Kubernetes, OpenTelemetry, Prometheus, k6

These are candidates, not mandatory choices. Select after evaluating workload fit, maturity, operational burden, security, cost, and team familiarity.

## Functional scope
Request budgets, rate limits, bounded queues, idempotency, cache policy, graceful shutdown, timeouts, health/readiness, SLO/error budget, load scenarios.

## Risks and trade-offs
Retries amplify overload, queues grow unbounded, caches stampede, and health checks lie. Model overload deliberately.

## Validation strategy
Use k6 and dependency fault injection; report throughput, p95/p99, error-budget burn, and recovery time.

## Roadmap
1. Baseline API
2. load profile
3. overload controls
4. dependency resilience
5. SLO/observability
6. chaos report.

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
Develop engineering judgment across backend engineering, sre, performance, security; study the underlying concepts before adopting tools.

## Starting references
- [Kubernetes documentation](https://kubernetes.io/docs/)
- [OpenTelemetry documentation](https://opentelemetry.io/docs/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Google SRE books](https://sre.google/books/)
- [Designing Data-Intensive Applications](https://dataintensive.net/)

---
**Portfolio disclosure:** proposal only; not implemented or production-tested.
