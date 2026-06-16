#!/usr/bin/env python3
from __future__ import annotations

import html
import os
import re
import zipfile
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DOCS_DIR = PROJECT_ROOT / "docs"
OUT = DOCS_DIR / "SOW_JRW_Creative_Group_Landing_Page_StrideTechworks.docx"
MD = DOCS_DIR / "SOW_JRW_Creative_Group_Landing_Page_StrideTechworks.md"

NAVY = "152A45"
COPPER = "B85C3C"
SLATE = "5A6470"
LIGHT = "E8EEF2"
BORDER = "CCCCCC"


def esc(text: str) -> str:
    return html.escape(text, quote=False)


def run(text: str, bold: bool = False, color: str | None = None, size: int | None = None) -> str:
    props = []
    if bold:
        props.append("<w:b/><w:bCs/>")
    if color:
        props.append(f'<w:color w:val="{color}"/>')
    if size:
        props.append(f'<w:sz w:val="{size}"/><w:szCs w:val="{size}"/>')
    rpr = f"<w:rPr>{''.join(props)}</w:rPr>" if props else ""
    return f'<w:r>{rpr}<w:t xml:space="preserve">{esc(text)}</w:t></w:r>'


def para(text: str = "", style: str | None = None, bold: bool = False, color: str | None = None, size: int | None = None) -> str:
    ppr = f'<w:pPr><w:pStyle w:val="{style}"/></w:pPr>' if style else ""
    return f"<w:p>{ppr}{run(text, bold=bold, color=color, size=size)}</w:p>"


def bullet(text: str) -> str:
    return (
        '<w:p><w:pPr><w:pStyle w:val="ListParagraph"/>'
        '<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr>'
        f"{run(text)}</w:p>"
    )


def cell(text: str, fill: str | None = None, bold: bool = False, color: str | None = None, width: int = 3000) -> str:
    shd = f'<w:shd w:fill="{fill}" w:val="clear"/>' if fill else ""
    return (
        "<w:tc><w:tcPr>"
        f'<w:tcW w:type="dxa" w:w="{width}"/>'
        f'<w:tcBorders><w:top w:val="single" w:color="{BORDER}" w:sz="1"/>'
        f'<w:left w:val="single" w:color="{BORDER}" w:sz="1"/>'
        f'<w:bottom w:val="single" w:color="{BORDER}" w:sz="1"/>'
        f'<w:right w:val="single" w:color="{BORDER}" w:sz="1"/></w:tcBorders>'
        f"{shd}<w:tcMar><w:top w:type=\"dxa\" w:w=\"100\"/><w:left w:type=\"dxa\" w:w=\"140\"/>"
        '<w:bottom w:type="dxa" w:w="100"/><w:right w:type="dxa" w:w="140"/></w:tcMar>'
        "</w:tcPr>"
        f"{para(text, bold=bold, color=color)}"
        "</w:tc>"
    )


def table(rows: list[list[str]], widths: list[int]) -> str:
    grid = "".join(f'<w:gridCol w:w="{w}"/>' for w in widths)
    xml = [
        '<w:tbl><w:tblPr><w:tblW w:type="dxa" w:w="9360"/>'
        '<w:tblBorders><w:top w:val="single" w:color="auto" w:sz="4"/>'
        '<w:left w:val="single" w:color="auto" w:sz="4"/>'
        '<w:bottom w:val="single" w:color="auto" w:sz="4"/>'
        '<w:right w:val="single" w:color="auto" w:sz="4"/>'
        '<w:insideH w:val="single" w:color="auto" w:sz="4"/>'
        '<w:insideV w:val="single" w:color="auto" w:sz="4"/></w:tblBorders></w:tblPr>'
        f"<w:tblGrid>{grid}</w:tblGrid>"
    ]
    for idx, row in enumerate(rows):
        xml.append("<w:tr>")
        for i, item in enumerate(row):
            header = idx == 0
            xml.append(cell(item, fill=NAVY if header else None, bold=header or item.startswith("Total"), color="FFFFFF" if header else None, width=widths[i]))
        xml.append("</w:tr>")
    xml.append("</w:tbl>")
    return "".join(xml)


def parse_markdown(md: str) -> str:
    body: list[str] = []
    lines = md.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i].rstrip()
        if not line:
            body.append(para(""))
            i += 1
            continue
        if line.startswith("# "):
            text = line[2:]
            if text == "STRIDE TECHWORKS":
                body.append(para("STRIDE", style="Title", bold=True, color=NAVY, size=48))
                body.append(para("TECHWORKS", style="Title", bold=True, color=COPPER, size=48))
            else:
                body.append(para(text, style="Title", bold=True, color=NAVY, size=40))
            i += 1
            continue
        if line.startswith("## "):
            body.append(para(line[3:], style="Heading1", bold=True, color=NAVY, size=26))
            i += 1
            continue
        if line.startswith("### "):
            body.append(para(line[4:], style="Heading2", bold=True, color=COPPER, size=22))
            i += 1
            continue
        if line.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                parts = [p.strip() for p in lines[i].strip().strip("|").split("|")]
                if not all(re.fullmatch(r":?-{3,}:?", p) for p in parts):
                    rows.append(parts)
                i += 1
            if rows:
                count = len(rows[0])
                widths = [9360 // count] * count
                body.append(table(rows, widths))
            continue
        if line.startswith("- "):
            body.append(bullet(line[2:]))
            i += 1
            continue
        body.append(para(line))
        i += 1
    return "".join(body)


def document_xml(body: str) -> str:
    return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<w:body>{body}
<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="900" w:right="900" w:bottom="900" w:left="900" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr>
</w:body></w:document>'''


STYLES = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:after="160" w:line="276" w:lineRule="auto"/></w:pPr><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:sz w:val="21"/><w:szCs w:val="21"/><w:color w:val="222222"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:after="80"/></w:pPr><w:rPr><w:rFonts w:ascii="Aptos Display" w:hAnsi="Aptos Display"/><w:b/><w:sz w:val="40"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="360" w:after="120"/></w:pPr><w:rPr><w:rFonts w:ascii="Aptos Display" w:hAnsi="Aptos Display"/><w:b/><w:color w:val="{NAVY}"/><w:sz w:val="26"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="240" w:after="80"/></w:pPr><w:rPr><w:rFonts w:ascii="Aptos Display" w:hAnsi="Aptos Display"/><w:b/><w:color w:val="{COPPER}"/><w:sz w:val="22"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="ListParagraph"><w:name w:val="List Paragraph"/><w:basedOn w:val="Normal"/><w:pPr><w:ind w:left="720"/></w:pPr></w:style>
</w:styles>'''


NUMBERING = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:abstractNum w:abstractNumId="0"><w:multiLevelType w:val="hybridMultilevel"/><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="720" w:hanging="360"/></w:pPr></w:lvl></w:abstractNum>
<w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>
</w:numbering>'''


CONTENT_TYPES = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
<Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>'''

RELS = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>'''

DOC_RELS = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>
</Relationships>'''

CORE = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<dc:title>SOW - JRW Creative Group Landing Page</dc:title><dc:creator>Stride Techworks</dc:creator><cp:lastModifiedBy>Stride Techworks</cp:lastModifiedBy><dcterms:created xsi:type="dcterms:W3CDTF">2026-06-16T00:00:00Z</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">2026-06-16T00:00:00Z</dcterms:modified></cp:coreProperties>'''

APP = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>Codex</Application></Properties>'''


def main() -> None:
    md = MD.read_text(encoding="utf-8")
    body = parse_markdown(md)
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", CONTENT_TYPES)
        z.writestr("_rels/.rels", RELS)
        z.writestr("word/_rels/document.xml.rels", DOC_RELS)
        z.writestr("word/document.xml", document_xml(body))
        z.writestr("word/styles.xml", STYLES)
        z.writestr("word/numbering.xml", NUMBERING)
        z.writestr("docProps/core.xml", CORE)
        z.writestr("docProps/app.xml", APP)
    print(os.fspath(OUT.resolve()))


if __name__ == "__main__":
    main()
