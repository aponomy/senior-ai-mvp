#!/bin/bash

# Script to merge the 4-part European Value Impact analysis into single file
# Date: 2025-11-22

DOCS_DIR="/Users/klas.ehnemark/Github/senior-ai-mvp/docs/ask_expert"
OUTPUT_FILE="$DOCS_DIR/11_03_European-Value-Impact-2025-11-22.md"

# Part files
PART1="$DOCS_DIR/11_03_European-Value-Impact-Part1-2025-11-22.md"
PART2="$DOCS_DIR/11_03_European-Value-Impact-Part2-2025-11-22.md"
PART3="$DOCS_DIR/11_03_European-Value-Impact-Part3-2025-11-22.md"
PART4="$DOCS_DIR/11_03_European-Value-Impact-Part4-2025-11-22.md"

echo "Merging European Value & Impact Analysis files..."
echo "Output: $OUTPUT_FILE"

# Create output file with main header
cat > "$OUTPUT_FILE" << 'EOF'
# European Added Value, Impact & Risk Analysis - Complete

**Date**: 2025-11-22  
**Issue**: #11 Task 3  
**Purpose**: Comprehensive European value, social impact, and risk assessment for EIC Accelerator application  
**Expert**: Azure OpenAI GPT-5 (high reasoning effort)  
**Status**: Complete (merged from 4-part analysis)

---

## Table of Contents

1. [EU Policy Alignment & European Added Value](#1-eu-policy-alignment--european-added-value)
2. [Data Sovereignty & Privacy as European Competitive Advantage](#2-data-sovereignty--privacy-as-european-competitive-advantage)
3. [Social Impact Measurement Frameworks](#3-social-impact-measurement-frameworks)
4. [SDG Alignment & Quantification](#4-sdg-alignment--quantification)
5. [Environmental Sustainability & Green Credentials](#5-environmental-sustainability--green-credentials)
6. [Risk Assessment & Mitigation Strategies](#6-risk-assessment--mitigation-strategies)
7. [Competitive Resilience & Defensibility](#7-competitive-resilience--defensibility)
8. [Comprehensive References & Sources](#8-comprehensive-references--sources)

---

EOF

# Extract content from Part 1 (skip header, keep from first ## heading)
echo "Processing Part 1..."
sed -n '/^## 1\. EU Policy Alignment/,$p' "$PART1" | sed '/^## End of Part 1/,$d' >> "$OUTPUT_FILE"

echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Extract content from Part 2 (skip header, keep from ## 2. heading)
echo "Processing Part 2..."
sed -n '/^## 2\. Data Sovereignty/,$p' "$PART2" | sed '/^## End of Part 2/,$d' >> "$OUTPUT_FILE"

echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Extract content from Part 3 (skip header, keep from ## 4. heading)
echo "Processing Part 3..."
sed -n '/^## 4\. SDG Alignment/,$p' "$PART3" | sed '/^## End of Part 3/,$d' >> "$OUTPUT_FILE"

echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Extract content from Part 4 (skip header, keep from ## 7. heading)
echo "Processing Part 4..."
sed -n '/^## 7\. Competitive Resilience/,$p' "$PART4" | sed '/^## Summary Across All 4 Parts/,$d' >> "$OUTPUT_FILE"

# Add completion marker
echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "## Document Complete" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "**Total Length**: ~45,000 tokens" >> "$OUTPUT_FILE"
echo "**Sections**: 8 major sections covering EU policy, data sovereignty, social impact, SDGs, sustainability, risk, competitive resilience, and comprehensive references" >> "$OUTPUT_FILE"
echo "**Sources**: 100+ citations across policy documents, research literature, technical standards, and market data" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "**Ready for**: Phase 4 Analysis, Phase 5 Synthesis, Phase 6 EIC Draft" >> "$OUTPUT_FILE"

echo ""
echo "✅ Merge complete!"
echo "📄 Output file: $OUTPUT_FILE"
echo ""
echo "File statistics:"
wc -l "$OUTPUT_FILE"
ls -lh "$OUTPUT_FILE"
echo ""
echo "Part files can now be archived or deleted if desired."
