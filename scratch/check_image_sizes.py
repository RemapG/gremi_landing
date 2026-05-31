import os
import sys

# Ensure UTF-8 printing
sys.stdout.reconfigure(encoding='utf-8')

img_dir = "assets/images"
if os.path.exists(img_dir):
    files = os.listdir(img_dir)
    print("Files in assets/images (UTF-8):")
    for f in files:
        full_path = os.path.join(img_dir, f)
        if os.path.isfile(full_path):
            size_mb = os.path.getsize(full_path) / (1024 * 1024)
            print(f"- {f}: {size_mb:.2f} MB")
else:
    print("Directory assets/images does not exist")
