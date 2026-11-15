# eBPF Network Observability Agent

> **Status:** Planned — documentation only. No implementation or benchmark claims are made here.

## 1. Problem statement

Expose useful kernel-level network signals for service troubleshooting without requiring packet capture or application instrumentation.

## 2. Intended users and use cases

Linux operators and SRE teams. The first iteration should target one narrow, testable workflow rather than attempting to become a general-purpose platform.

## 3. Proposed architecture

eBPF programs attach to selected tracepoints or socket hooks → ring buffer/perf events → user-space Go agent → Prometheus/OpenTelemetry exporter. A privilege model limits kernel capabilities.

This is a starting hypothesis. Validate component boundaries against explicit functional and non-functional requirements before implementation. Prefer a modular monolith or a small number of deployable components until independent scaling or ownership justifies distribution.

## 4. Initial technology candidates

C, eBPF, libbpf or cilium/ebpf, Go, Linux, Prometheus, OpenTelemetry

These are candidates, not mandatory choices. Select final technologies after comparing operational burden, ecosystem maturity, performance needs, team familiarity, security posture, and total cost of ownership.

## 5. Functional scope

TCP connection lifecycle events; retransmission and reset counters; DNS timing where supported; process/container attribution; bounded event buffers; kernel compatibility checks; dashboards.

## 6. Non-functional requirements to define

- **Correctness:** define invariants, consistency expectations, and failure semantics.
- **Latency and throughput:** establish workload assumptions and p50/p95/p99 targets before benchmarking.
- **Availability and recovery:** define service-level objectives, RPO/RTO where relevant, backup, restore, and rollback procedures.
- **Security:** threat model trust boundaries, identity, authorization, secrets, data handling, and supply-chain risks.
- **Observability:** instrument logs, metrics, and traces; define actionable alerts and service ownership.
- **Cost:** estimate infrastructure and third-party costs; define unit economics and budget guardrails.
- **Maintainability:** document interfaces, schema evolution, operational ownership, and upgrade strategy.

## 7. Key risks and trade-offs

Kernel-version differences, verifier constraints, event loss, privilege requirements, and misleading attribution. Document supported kernels and loss counters.

## 8. Validation and success criteria

Compare against known traffic generators and packet-level ground truth; measure overhead, event loss, CPU, memory, and kernel compatibility.

Do not publish numerical results until they have been measured with a documented environment, workload, methodology, and repeatable test procedure.

## 9. Development roadmap

1. Kernel fundamentals
2. minimal tracepoint probe
3. userspace exporter
4. container attribution
5. compatibility matrix
6. overhead benchmarks.

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

Use this project to strengthen systems thinking in linux systems · networking · observability · go. Study the relevant official documentation and foundational concepts before choosing abstractions.

## 13. References to begin with

- [Kubernetes documentation](https://kubernetes.io/docs/) — when container orchestration is relevant.
- [OpenTelemetry documentation](https://opentelemetry.io/docs/) — observability conventions and instrumentation.
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) — application security practices.
- [Google SRE books](https://sre.google/books/) — reliability engineering principles.
- [Designing Data-Intensive Applications](https://dataintensive.net/) — distributed data systems foundations.

Select additional domain-specific primary sources during the design phase.

---

**Portfolio disclosure:** This repository contains a proposal and engineering plan only. It is not evidence that the system has been built, deployed, or production-tested.
