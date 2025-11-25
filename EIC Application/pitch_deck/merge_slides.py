#!/usr/bin/env python3
"""
Merge all slide markdown files into a single document.
Usage: python merge_slides.py
Output: COMPLETE_PITCH_DECK.md
"""

import os
import re
from pathlib import Path

def get_slide_number(filename):
    """Extract slide number from filename like 'Slide_01_Title.md'"""
    match = re.search(r'Slide_(\d+)_', filename)
    if match:
        return int(match.group(1))
    return 999  # Put non-numbered files at the end

def merge_slides(input_dir='.', output_file='COMPLETE_PITCH_DECK.md'):
    """Merge all Slide_*.md files into one document"""
    
    # Get all slide files
    slide_files = [f for f in os.listdir(input_dir) if f.startswith('Slide_') and f.endswith('.md')]
    
    # Sort by slide number
    slide_files.sort(key=get_slide_number)
    
    print(f"Found {len(slide_files)} slide files:")
    for f in slide_files:
        print(f"  - {f}")
    
    # Merge content
    merged_content = []
    merged_content.append("# Senior AI - Complete Pitch Deck\n")
    merged_content.append("**Generated:** " + __import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S') + "\n")
    merged_content.append("**Source:** Individual slide markdown files\n")
    merged_content.append("\n---\n\n")
    
    for i, filename in enumerate(slide_files, 1):
        filepath = os.path.join(input_dir, filename)
        
        print(f"Processing: {filename}")
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read().strip()
        
        # Add slide separator
        if i > 1:
            merged_content.append("\n\n---\n\n")
        
        # Add content
        merged_content.append(content)
    
    # Write merged file
    output_path = os.path.join(input_dir, output_file)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(merged_content))
    
    print(f"\n✅ Successfully merged {len(slide_files)} slides into: {output_file}")
    print(f"   Output location: {output_path}")
    
    return output_path

if __name__ == '__main__':
    # Run from the pitch_deck directory
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    merge_slides()
