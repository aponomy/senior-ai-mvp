# MCP Tool Specification: convert_to_md

> **AI-Powered Document Conversion to Human-Friendly Markdown**

---

## Overview

The `convert_to_md` tool converts complex document formats (RTF, Word, Excel, PDF) into clean, human-readable, and editable Markdown files. Unlike traditional converters that preserve layout at the cost of readability, this tool **understands content structure** and creates documents that are:

- ✅ **Easy to read and understand**
- ✅ **Easy to edit and fill out**
- ✅ **Well-structured with clear sections**
- ✅ **Free of formatting artifacts** (no "nan", "Unnamed", broken tables)

---

## Tool Definition

### Name
`convert_to_md`

### Description
Converts document files (RTF, DOCX, XLSX, XLSM, PDF) to clean, human-friendly Markdown format. This is NOT a simple format converter - it intelligently restructures content for maximum readability and usability.

### Parameters

```typescript
{
  "filePaths": {
    "type": "array",
    "items": { "type": "string" },
    "description": "Absolute paths to files to convert (RTF, DOCX, XLSX, XLSM, PDF)",
    "required": true
  },
  "outputDir": {
    "type": "string",
    "description": "Output directory for converted Markdown files. Defaults to '{source_dir}_md'",
    "required": false
  },
  "conversionMode": {
    "type": "string",
    "enum": ["friendly", "preserve", "auto"],
    "description": "friendly=restructure for readability, preserve=keep original structure, auto=detect best mode",
    "default": "friendly",
    "required": false
  },
  "templateType": {
    "type": "string",
    "enum": ["form", "document", "spreadsheet", "presentation", "auto"],
    "description": "Type of document to help guide conversion approach",
    "default": "auto",
    "required": false
  }
}
```

### Returns

```typescript
{
  "success": boolean,
  "convertedFiles": [
    {
      "sourcePath": string,
      "outputPath": string,
      "fileSize": number,
      "conversionMode": string
    }
  ],
  "errors": [
    {
      "filePath": string,
      "error": string
    }
  ],
  "summary": string
}
```

---

## Architecture

### Core Components

```
┌─────────────────────────────────────────────────────────┐
│                   MCP Tool Server                        │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │         File Type Router                        │    │
│  │  - Detects file type                            │    │
│  │  - Selects appropriate converter                │    │
│  └────────────────────────────────────────────────┘    │
│                         ↓                                │
│  ┌─────────────┬─────────────┬──────────────────┐      │
│  │ RTF/DOCX    │   XLSX/     │   PDF            │      │
│  │ Converter   │   XLSM      │   Converter      │      │
│  │             │   Converter │                  │      │
│  └─────────────┴─────────────┴──────────────────┘      │
│                         ↓                                │
│  ┌────────────────────────────────────────────────┐    │
│  │    Content Understanding Layer                  │    │
│  │  - Identifies document structure                │    │
│  │  - Detects forms, tables, sections              │    │
│  │  - Determines best restructuring approach       │    │
│  └────────────────────────────────────────────────┘    │
│                         ↓                                │
│  ┌────────────────────────────────────────────────┐    │
│  │    Markdown Generator                           │    │
│  │  - Creates clean structure                      │    │
│  │  - Builds fillable forms                        │    │
│  │  - Generates readable tables                    │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## Python Dependencies

### Required Packages

```python
# Core dependencies
pandas>=2.0.0           # Excel/data manipulation
openpyxl>=3.1.0        # Excel file reading
beautifulsoup4>=4.12.0 # HTML parsing
lxml>=4.9.0            # XML/HTML parser

# Document conversion (optional but recommended)
pypandoc>=1.11         # Universal document converter (requires pandoc)
python-docx>=1.1.0     # Word document handling
PyPDF2>=3.0.0          # PDF reading
pdfplumber>=0.10.0     # Better PDF table extraction

# Utility
tabulate>=0.9.0        # Markdown table generation
```

### Installation Command

```bash
pip install pandas openpyxl beautifulsoup4 lxml pypandoc python-docx PyPDF2 pdfplumber tabulate
```

### System Dependencies

```bash
# macOS
brew install pandoc libreoffice

# Ubuntu/Debian
apt-get install pandoc libreoffice

# Windows
choco install pandoc libreoffice
```

---

## Implementation Strategy

### Phase 1: Basic Conversion (File → Text)

```python
def convert_to_text(file_path: Path) -> str:
    """Extract raw text from various formats."""
    
    ext = file_path.suffix.lower()
    
    if ext == '.rtf':
        # Use macOS textutil or pypandoc
        return rtf_to_text(file_path)
    
    elif ext == '.docx':
        # Use python-docx
        return docx_to_text(file_path)
    
    elif ext in ['.xlsx', '.xlsm']:
        # Use pandas - read all sheets
        return excel_to_text(file_path)
    
    elif ext == '.pdf':
        # Use pdfplumber or PyPDF2
        return pdf_to_text(file_path)
```

### Phase 2: Content Understanding

```python
def analyze_document_structure(text: str, file_name: str) -> DocumentStructure:
    """Analyze document to understand its purpose and structure."""
    
    structure = DocumentStructure()
    
    # Detect document type
    if has_form_fields(text):
        structure.type = "form"
        structure.sections = extract_form_sections(text)
    
    elif has_tables(text):
        structure.type = "spreadsheet"
        structure.tables = extract_tables(text)
    
    elif has_chapters(text):
        structure.type = "document"
        structure.chapters = extract_chapters(text)
    
    # Detect common patterns
    structure.has_instructions = detect_instructions(text)
    structure.has_fillable_fields = detect_fillable_fields(text)
    structure.has_complex_tables = detect_complex_tables(text)
    
    return structure
```

### Phase 3: Intelligent Restructuring

```python
def create_friendly_markdown(structure: DocumentStructure, text: str) -> str:
    """Create human-friendly Markdown based on document structure."""
    
    md = []
    
    # Add title
    md.append(f"# {structure.title}\n\n")
    
    # Add context/instructions if present
    if structure.has_instructions:
        md.append("> **Instructions**\n\n")
        md.append(format_instructions(structure.instructions))
        md.append("\n---\n\n")
    
    # Process based on document type
    if structure.type == "form":
        md.append(create_fillable_form(structure))
    
    elif structure.type == "spreadsheet":
        md.append(create_spreadsheet_template(structure))
    
    else:
        md.append(create_document_structure(structure))
    
    return ''.join(md)
```

### Key Conversion Functions

#### RTF/Word Conversion

```python
def rtf_to_text(rtf_path: Path) -> str:
    """Convert RTF to plain text."""
    # macOS
    result = subprocess.run(
        ['textutil', '-convert', 'txt', str(rtf_path), '-stdout'],
        capture_output=True, text=True
    )
    return result.stdout

def docx_to_structured_text(docx_path: Path) -> dict:
    """Extract structured content from Word document."""
    doc = Document(docx_path)
    
    content = {
        'paragraphs': [],
        'tables': [],
        'headings': []
    }
    
    for para in doc.paragraphs:
        if para.style.name.startswith('Heading'):
            content['headings'].append({
                'level': int(para.style.name[-1]),
                'text': para.text
            })
        else:
            content['paragraphs'].append(para.text)
    
    for table in doc.tables:
        content['tables'].append(extract_table_data(table))
    
    return content
```

#### Excel Conversion

```python
def excel_to_friendly_markdown(excel_path: Path) -> str:
    """Convert Excel to clean, readable Markdown."""
    
    excel_file = pd.ExcelFile(excel_path, engine='openpyxl')
    md = []
    
    for sheet_name in excel_file.sheet_names:
        df = pd.read_excel(excel_file, sheet_name=sheet_name)
        
        # Clean the data
        df = df.dropna(how='all', axis=0).dropna(how='all', axis=1)
        df = df.fillna('')  # Replace NaN with empty string
        
        md.append(f"## {sheet_name}\n\n")
        
        # Detect if this is a form or data table
        if is_form_layout(df):
            md.append(create_form_from_dataframe(df))
        elif is_large_dataset(df):
            md.append(f"*This sheet contains {len(df)} rows. ")
            md.append("Summary statistics:*\n\n")
            md.append(create_summary(df))
        else:
            md.append(df.to_markdown(index=False))
        
        md.append("\n\n")
    
    return ''.join(md)

def is_form_layout(df: pd.DataFrame) -> bool:
    """Detect if DataFrame represents a form rather than data."""
    # Forms typically have:
    # - Few rows (< 50)
    # - First column is labels/field names
    # - Second column is empty or has instructions
    # - Lots of empty cells
    
    if len(df) > 50:
        return False
    
    if len(df.columns) == 2:
        # Check if first column has descriptive text
        first_col = df.iloc[:, 0].astype(str)
        if first_col.str.contains(':').sum() > len(df) * 0.3:
            return True
    
    return False

def create_form_from_dataframe(df: pd.DataFrame) -> str:
    """Convert form-like DataFrame to fillable Markdown."""
    md = []
    
    for _, row in df.iterrows():
        field_name = str(row.iloc[0]).strip()
        field_value = str(row.iloc[1]) if len(row) > 1 else ''
        
        if ':' in field_name:
            # This is a field label
            md.append(f"**{field_name}** {field_value}\n\n")
        elif field_name.isupper() and len(field_name) > 10:
            # This is a section header
            md.append(f"### {field_name.title()}\n\n")
        else:
            md.append(f"{field_name}\n\n")
    
    return ''.join(md)
```

---

## AI Assistant Integration

### How the AI Should Use This Tool

The `convert_to_md` tool is designed to be **collaborative** between the tool and the AI assistant. Here's the workflow:

#### 1. User Request
```
User: "Convert these application templates to markdown"
```

#### 2. AI Calls Tool
```javascript
mcp_convert_to_md({
  filePaths: [
    "/path/to/Application_Form.docx",
    "/path/to/Budget_Template.xlsx"
  ],
  conversionMode: "friendly",
  templateType: "form"
})
```

#### 3. Tool Returns Results
```json
{
  "success": true,
  "convertedFiles": [
    {
      "sourcePath": "/path/to/Application_Form.docx",
      "outputPath": "/path/to/templates_md/Application_Form.md",
      "conversionMode": "friendly"
    }
  ],
  "summary": "Converted 2 files. Created clean, fillable forms."
}
```

#### 4. AI Reviews and Enhances
The AI should then:

1. **Read the converted files** to verify quality
2. **Identify improvements** (missing sections, unclear instructions)
3. **Enhance the content** by:
   - Adding clarifying notes
   - Creating better table structures
   - Adding examples where helpful
   - Organizing content more logically

#### 5. AI Reports Back
```
✅ Successfully converted 2 template files to Markdown!

I've created clean, fillable versions:
- Application_Form.md - Structured with clear sections and fillable fields
- Budget_Template.md - Organized cost categories with empty tables ready to fill

I also added:
- Instructions at the top of each file
- Clear section headers
- Fillable tables with proper column headers
- Tips sections for guidance

The files are ready to use!
```

---

## Tool Behavior Guidelines

### DO ✅

1. **Understand the purpose** - Is it a form? A report? A data template?
2. **Restructure for clarity** - Don't blindly preserve complex table layouts
3. **Create fillable fields** - Empty tables, checkboxes, fill-in-the-blanks
4. **Add context** - Include instructions, notes, tips
5. **Clean the data** - Remove "nan", "Unnamed", empty rows/columns
6. **Use proper Markdown** - Headers, lists, tables, blockquotes
7. **Make it scannable** - Clear hierarchy, visual breaks, sections

### DON'T ❌

1. **Don't preserve broken layouts** - Complex merged cells become simple tables
2. **Don't include raw data artifacts** - No "nan", "Unnamed: 0", etc.
3. **Don't create giant tables** - Summarize or split large datasets
4. **Don't lose information** - Preserve all meaningful content
5. **Don't over-format** - Keep it simple and editable
6. **Don't ignore context** - Use filename and content to guide conversion

---

## Special Conversion Patterns

### Pattern 1: Forms with Tables

**Original:**
```
+-----------+-----------+
| Label:    | [______]  |
| Name:     | [______]  |
| Email:    | [______]  |
+-----------+-----------+
```

**Converted to:**
```markdown
**Label:** ___________________________

**Name:** ___________________________

**Email:** ___________________________
```

### Pattern 2: Data Entry Tables

**Original:**
```
| Unnamed: 0 | Unnamed: 1 | Unnamed: 2 |
|------------|------------|------------|
| Revenue    | nan        | nan        |
| Costs      | nan        | nan        |
```

**Converted to:**
```markdown
### Financial Data

| Item | Year 1 | Year 2 |
|------|--------|--------|
| Revenue | | |
| Costs | | |
```

### Pattern 3: Instructions + Content

**Original:**
*Long paragraph of instructions followed by complex table*

**Converted to:**
```markdown
## Instructions

> Key points:
> - Point 1
> - Point 2
> - Point 3

---

## [Section Name]

[Clean table or form fields]
```

---

## MCP Server Implementation

### File Structure

```
mcp-convert-to-md/
├── src/
│   ├── index.ts              # MCP server entry point
│   ├── converters/
│   │   ├── rtf.py           # RTF conversion
│   │   ├── docx.py          # Word conversion
│   │   ├── excel.py         # Excel conversion
│   │   └── pdf.py           # PDF conversion
│   ├── analyzers/
│   │   ├── structure.py     # Document structure analysis
│   │   └── patterns.py      # Pattern detection
│   └── generators/
│       ├── forms.py         # Form generation
│       ├── tables.py        # Table generation
│       └── markdown.py      # Markdown composition
├── package.json
├── requirements.txt
└── README.md
```

### TypeScript MCP Server

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { spawn } from 'child_process';

const server = new Server(
  {
    name: 'convert-to-md',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'convert_to_md',
        description: 'Convert documents (RTF, DOCX, XLSX, PDF) to clean, human-friendly Markdown',
        inputSchema: {
          type: 'object',
          properties: {
            filePaths: {
              type: 'array',
              items: { type: 'string' },
              description: 'Absolute paths to files to convert',
            },
            outputDir: {
              type: 'string',
              description: 'Output directory (defaults to source_dir + "_md")',
            },
            conversionMode: {
              type: 'string',
              enum: ['friendly', 'preserve', 'auto'],
              default: 'friendly',
            },
          },
          required: ['filePaths'],
        },
      },
    ],
  };
});

server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'convert_to_md') {
    const { filePaths, outputDir, conversionMode } = request.params.arguments;
    
    // Call Python conversion script
    const result = await runPythonConverter(filePaths, outputDir, conversionMode);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
  
  throw new Error(`Unknown tool: ${request.params.name}`);
});

async function runPythonConverter(
  filePaths: string[],
  outputDir?: string,
  mode: string = 'friendly'
): Promise<any> {
  return new Promise((resolve, reject) => {
    const python = spawn('python3', [
      'src/converters/main.py',
      '--files', ...filePaths,
      '--mode', mode,
      ...(outputDir ? ['--output', outputDir] : []),
    ]);
    
    let stdout = '';
    let stderr = '';
    
    python.stdout.on('data', (data) => { stdout += data; });
    python.stderr.on('data', (data) => { stderr += data; });
    
    python.on('close', (code) => {
      if (code === 0) {
        resolve(JSON.parse(stdout));
      } else {
        reject(new Error(stderr));
      }
    });
  });
}

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

---

## Usage Examples

### Example 1: Convert Single File

```javascript
// AI calls:
convert_to_md({
  filePaths: ["/Users/john/Documents/Application_Form.docx"],
  conversionMode: "friendly"
})

// Result: Clean fillable form in Markdown
```

### Example 2: Convert Multiple Templates

```javascript
// AI calls:
convert_to_md({
  filePaths: [
    "/path/to/templates/form1.docx",
    "/path/to/templates/budget.xlsx",
    "/path/to/templates/terms.rtf"
  ],
  outputDir: "/path/to/templates_md",
  templateType: "form"
})

// Result: All files converted to structured, fillable Markdown
```

### Example 3: Batch Conversion with Auto-Detection

```javascript
// AI calls:
convert_to_md({
  filePaths: glob("/path/to/EIC Application/**/*.{docx,xlsx,rtf}"),
  conversionMode: "auto"
})

// Tool auto-detects document types and applies best conversion strategy
```

---

## AI Assistant Prompts

### When to Use This Tool

The AI should use `convert_to_md` when:

1. User asks to **convert documents to Markdown**
2. User has **forms or templates** that need to be editable
3. User needs to **clean up** messy document conversions
4. User wants **readable versions** of complex documents

### What AI Should Do After Conversion

```markdown
1. ✅ Call the tool with appropriate parameters
2. 📖 Read the converted files to verify quality
3. 🔍 Look for:
   - Missing sections or content
   - Unclear instructions
   - Complex tables that could be simplified
   - Opportunities to add helpful notes
4. ✏️ Enhance if needed:
   - Add clarifying headers
   - Create better table structures
   - Add examples or tips
   - Restructure for better flow
5. 📢 Report results to user with summary
```

### Sample AI Response Flow

```
User: "Convert my EIC application templates to markdown"

AI: I'll convert those templates to clean, editable Markdown files.

[Calls convert_to_md tool]

[Reads converted files]

[Enhances content if needed]

AI Response:
"✅ I've successfully converted your EIC application templates!

Created 6 clean Markdown files:
1. Application_Form.md - Structured proposal template
2. Budget_Table.md - Cost breakdown with fillable tables
3. Financial_Plan.md - 5-year projection template
4. Ownership_Declaration.md - Form with checkboxes
5. Implementation_Plan.md - Work package template
6. Letter_of_Intent.md - Guidance and template

Each file now has:
- Clear section headers
- Fillable fields (just replace underscores)
- Clean tables (no 'nan' or formatting issues)
- Instructions and tips

All files are in: /path/to/templates_md/

Ready to start filling them out!"
```

---

## Testing

### Test Cases

```python
def test_rtf_form_conversion():
    """Test RTF form with tables converts to fillable Markdown."""
    assert convert_to_md("test_form.rtf") == expected_fillable_form()

def test_excel_template_conversion():
    """Test Excel template removes 'nan' and creates clean tables."""
    result = convert_to_md("test_budget.xlsx")
    assert "nan" not in result
    assert "Unnamed" not in result
    assert "| Item | Amount |" in result

def test_complex_table_simplification():
    """Test complex merged cells become simple tables."""
    result = convert_to_md("complex_table.docx")
    assert count_table_rows(result) < count_merged_cells("complex_table.docx")
```

---

## Future Enhancements

1. **AI-Powered Section Detection** - Use LLM to better understand document structure
2. **Template Recognition** - Detect common template types (invoices, forms, reports)
3. **Multi-Language Support** - Handle documents in different languages
4. **Collaborative Editing** - Support collaborative Markdown editing in VS Code
5. **Round-Trip Conversion** - Convert MD back to original format
6. **Style Preservation** - Optional style preservation for formal documents

---

## Summary

The `convert_to_md` MCP tool is designed to be:

- 🎯 **Purpose-driven** - Understands what the document is for
- 🧠 **Intelligent** - Restructures content for usability
- 🤝 **Collaborative** - Works with AI to enhance results
- ✨ **User-focused** - Creates actually usable Markdown files

**Key Principle:** *Don't just convert formats — transform documents into something better.*

---

## Implementation Checklist

- [ ] Set up Python environment with dependencies
- [ ] Implement RTF/DOCX converter
- [ ] Implement Excel converter
- [ ] Implement PDF converter (optional)
- [ ] Create document structure analyzer
- [ ] Build Markdown generator with templates
- [ ] Create TypeScript MCP server
- [ ] Write tests for common document types
- [ ] Document AI collaboration patterns
- [ ] Create usage examples
- [ ] Deploy and integrate with VS Code

---

*This tool turns messy documents into clean, usable Markdown that humans actually want to work with.*
