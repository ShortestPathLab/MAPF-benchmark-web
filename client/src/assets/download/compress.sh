#!/bin/bash

# Loop through all files in the current directory
for file in ../scens/*; do
    # Check if the current item is a file
    if [[ -f "$file" ]]; then
      base="$(basename -- $file)";
      trimmed="${base%-*-*}"
      mkdir $trimmed
      cp $file $trimmed
    fi
done


for file in ../maps/*; do
    # Check if the current item is a file
    if [[ -f "$file" ]]; then
      base="$(basename -- $file)";
      trimmed="${base%.*}"
      mkdir $trimmed
      cp $file $trimmed
    fi
done


find . -type d -print0 | while IFS= read -r -d '' dir; do
    # Perform actions on each subdirectory
    echo "Processing directory: $dir"
    zip -r "$dir.zip" "$dir"
    rm -rf $dir
    # Add your desired actions here
done