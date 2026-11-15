# Project Proposals & Engineering Roadmap

This directory contains **planned engineering projects**, not completed work. Each proposal is intentionally documentation-first: the README defines a problem, a possible architecture, engineering scope, risks, evaluation criteria, and staged milestones. Technology choices are hypotheses to validate, not commitments.

## Status policy

- **Planned** — proposal only; implementation has not started.
- **In progress** — implementation is underway and linked evidence exists.
- **Existing work** — a repository exists; completion and portfolio claims still require review.
- **Completed** — only after the implementation, tests, deployment evidence (where applicable), and claims have been verified.

No performance numbers, uptime claims, or production-readiness claims should be added without reproducible evidence.

## Proposal index

1. [Distributed LLM Inference Platform](./distributed-llm-inference-platform/README.md) — AI Infrastructure · Distributed Systems · Platform Engineering
2. [LLM API Gateway & Model Router](./llm-api-gateway/README.md) — AI Engineering · Backend · Security · Reliability
3. [Production MLOps Platform](./production-mlops-platform/README.md) — MLOps · DevOps · Data Engineering
4. [Distributed Feature Store](./distributed-feature-store/README.md) — MLOps · Distributed Systems · Databases
5. [Real-Time Fraud Detection Platform](./realtime-fraud-detection-platform/README.md) — Machine Learning · Streaming · Backend · Reliability
6. [AI SRE Incident Copilot](./ai-sre-incident-copilot/README.md) — AI Engineering · SRE · Observability · Security
7. [Internal Developer Platform](./internal-developer-platform/README.md) — Platform Engineering · Kubernetes · DevEx · Security
8. [Kubernetes Policy & Reliability Operator](./kubernetes-policy-operator/README.md) — Platform Engineering · Kubernetes · Security · Go
9. [Distributed Observability Platform](./distributed-observability-platform/README.md) — SRE · Distributed Systems · Data Engineering
10. [eBPF Network Observability Agent](./ebpf-network-observability/README.md) — Linux Systems · Networking · Observability · Go
11. [Multi-Tenant Vector Search Service](./multi-tenant-vector-search/README.md) — AI Infrastructure · Databases · Security
12. [GPU Workload Scheduler](./gpu-workload-scheduler/README.md) — AI Infrastructure · Kubernetes · Scheduling
13. [AI Security Gateway](./ai-security-gateway/README.md) — AI Security · AppSec · AI Engineering
14. [LLM Evaluation & Observability Workbench](./llm-evaluation-observability/README.md) — AI Engineering · Evaluation · Data Engineering
15. [Secure Agent Runtime & Orchestrator](./agent-runtime-orchestrator/README.md) — AI Agents · Distributed Systems · Security
16. [Event-Driven Workflow Engine](./event-driven-workflow-engine/README.md) — Distributed Systems · Backend · Reliability
17. [Distributed Cache & Consistency Lab](./distributed-cache-engine/README.md) — Distributed Systems · Databases · Performance
18. [S3-Compatible Object Storage Service](./object-storage-service/README.md) — Cloud Engineering · Distributed Systems · Storage
19. [Service Mesh Traffic Management Lab](./service-mesh-traffic-lab/README.md) — Networking · Kubernetes · SRE
20. [Zero-Trust Cloud Foundation](./zero-trust-cloud-foundation/README.md) — Cloud Security · DevSecOps · Networking
21. [Cloud Cost Intelligence Platform](./cloud-cost-intelligence/README.md) — FinOps · Cloud Engineering · Data Engineering
22. [Database Replication & Recovery Lab](./database-replication-lab/README.md) — Databases · Distributed Systems · SRE
23. [Edge Model Serving Platform](./edge-model-serving-platform/README.md) — AI Infrastructure · Edge Computing · MLOps
24. [Data Contracts & Quality Platform](./data-contract-governance-platform/README.md) — Data Engineering · Platform Engineering · Reliability
25. [Resilient API Platform & Load Lab](./resilient-api-platform/README.md) — Backend Engineering · SRE · Performance · Security

## Engineering review standard

Before implementation, record requirements and constraints. During implementation, validate architecture with tests and measurements. Before calling a project complete, document security, reliability, observability, deployment, recovery, cost, and known limitations.

The proposals are intentionally diverse but connected: several can share common platform foundations, such as OpenTelemetry, GitOps, identity, CI pipelines, and infrastructure modules. Avoid implementing every project as an unrelated stack.