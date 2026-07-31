---
title: Bills of quantities from IFC, with LLM agents in the loop
date: 2025-11-13
tags: AI, LLM, IFC, Python
summary: bim-llm pairs IfcOpenShell's deterministic measuring with LLM agents for classification. The line between those two jobs is the whole design.
---

A bill of quantities is the least glamorous document in construction and one of the most consequential. It's where the model becomes money. Producing one from a BIM model is still largely manual: quantity surveyors clicking through elements, mapping them to standard work items, exporting spreadsheets. My side project [bim-llm](https://github.com/christiandimitri/bim-llm) asks how much of that an LLM pipeline can absorb, and more importantly, which parts it must never touch.

## Deterministic core, probabilistic edges

The system is a FastAPI service wrapping two very different kinds of intelligence:

- **[IfcOpenShell](https://ifcopenshell.org/)** does the measuring. Quantities (volumes, areas, lengths, counts) come from the model's declared `IfcElementQuantity` sets, with geometric fallback. This layer is deterministic, testable, and boring on purpose. Numbers never come from the language model. I will die on this hill.
- **LLM agents** do the interpreting. Which NRM2 or CSI MasterFormat work item does "Basic Wall: Generic — 200mm — EXT" belong to? That mapping is fuzzy, convention-riddled, and exactly the terrain where LLMs beat rule engines.

Between them sits a RAG layer: the standards documents chunked into ChromaDB, retrieved per element, so the classifier agent cites actual clause text instead of hallucinating categories.

```python
result = classifier.run(
    element_summary=summarize(element),           # name, type, psets, materials
    context=retriever.query(element, k=6),        # relevant NRM2 clauses
    schema=WorkItemAssignment,                    # forced structured output
)
# result.confidence < 0.7 → human review queue, not the BOQ
```

## What I learned about agent design

The first version was one mega-prompt. It produced plausible, confidently wrong BOQs, which is the failure mode that makes construction people distrust AI, and they're right to. The redesign that worked: an orchestrator plus small single-purpose agents (classify, validate units, aggregate), structured outputs everywhere, confidence thresholds that route uncertain items to humans, and every assignment carrying its retrieved justification.

The result fails honestly. It produces fewer automated line items, plus a review queue where every item shows the element, the candidate classification, and the standard's own text. Trust in AI tooling isn't a UX layer you add later; it has to be an architectural property.

The unglamorous 80% of the work was the deterministic part: unit normalization, quantity-set inconsistencies between authoring tools, elements with no quantities at all. If there's one lesson for AEC-plus-AI in general, it's that LLMs are a classification and language layer, not a measurement layer, and the systems that respect that line are the ones that will get adopted.
