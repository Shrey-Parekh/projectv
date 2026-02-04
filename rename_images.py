#!/usr/bin/env python3
"""
Image Renaming Script
Renames all images in the 'images' folder to sequential names: image 1, image 2, etc.
Preserves original file extensions.
"""

import os
import shutil
from pathlib import Path
from typing import List, Tuple

# Supported image extensions
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.ico'}

def get_image_files(folder_path: Path) -> List[Path]:
    """Get all image files from the folder, sorted naturally."""
    image_files = []
    
    for file_path in folder_path.iterdir():
        if file_path.is_file() and file_path.suffix.lower() in IMAGE_EXTENSIONS:
            image_files.append(file_path)
    
    # Sort naturally by filename (handles numbers correctly)
    image_files.sort(key=lambda x: (len(str(x.name)), str(x.name)))
    
    return image_files

def rename_images(folder_path: str = "images", dry_run: bool = False) -> None:
    """
    Rename all images in the specified folder to sequential names.
    
    Args:
        folder_path: Path to the folder containing images
        dry_run: If True, only print what would be renamed without actually renaming
    """
    folder = Path(folder_path)
    
    if not folder.exists():
        print(f"Error: Folder '{folder_path}' does not exist!")
        return
    
    if not folder.is_dir():
        print(f"Error: '{folder_path}' is not a directory!")
        return
    
    # Get all image files
    image_files = get_image_files(folder)
    
    if not image_files:
        print(f"No image files found in '{folder_path}'")
        return
    
    print(f"Found {len(image_files)} image file(s) in '{folder_path}'")
    print("-" * 60)
    
    # Track renamed files to avoid conflicts
    renamed_files = []
    
    for index, old_path in enumerate(image_files, start=1):
        # Get original extension
        extension = old_path.suffix.lower()
        
        # Create new filename
        new_filename = f"image {index}{extension}"
        new_path = folder / new_filename
        
        # Skip if already correctly named
        if old_path.name == new_filename:
            print(f"✓ Already named correctly: {old_path.name}")
            continue
        
        # Check if target name already exists (and it's not the same file)
        if new_path.exists() and new_path != old_path:
            print(f"⚠ Warning: '{new_filename}' already exists. Skipping '{old_path.name}'")
            continue
        
        if dry_run:
            print(f"[DRY RUN] Would rename: '{old_path.name}' → '{new_filename}'")
        else:
            try:
                # Rename the file
                old_path.rename(new_path)
                print(f"✓ Renamed: '{old_path.name}' → '{new_filename}'")
                renamed_files.append((old_path.name, new_filename))
            except Exception as e:
                print(f"✗ Error renaming '{old_path.name}': {e}")
    
    print("-" * 60)
    if dry_run:
        print(f"[DRY RUN] Would rename {len(renamed_files)} file(s)")
    else:
        print(f"Successfully renamed {len(renamed_files)} file(s)")

if __name__ == "__main__":
    import sys
    
    # Check for command line arguments
    folder = "images"
    dry_run = False
    
    if len(sys.argv) > 1:
        if "--dry-run" in sys.argv or "-n" in sys.argv:
            dry_run = True
            sys.argv.remove("--dry-run" if "--dry-run" in sys.argv else "-n")
        
        if len(sys.argv) > 1:
            folder = sys.argv[1]
    
    print("=" * 60)
    print("Image Renaming Script")
    print("=" * 60)
    if dry_run:
        print("Mode: DRY RUN (no files will be modified)")
    print()
    
    rename_images(folder_path=folder, dry_run=dry_run)
