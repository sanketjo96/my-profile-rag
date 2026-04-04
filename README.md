# my-profile-rag

1. Getting things working
2. Getting towards production ready systems (vector search with, keyword search, re-ranker, citation enforcement, storing prompts in version config file)
3. Evaluation (offline scripts to test your system and hook in CI/CD pipeline)
4. Monitorig layer (add tracing - which chunks retrieved, reorder, prompt, token consumed) Langfuse(open source)/Langsmith
5. Tracking quality metric (latency at p50, p95, cost per request, citation coverage, monitor failuar)
6. Try to gate all metrics in CICD pipeline
