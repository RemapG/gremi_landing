import os
import sys
import shutil
from PIL import Image

# Ensure UTF-8 printing
sys.stdout.reconfigure(encoding='utf-8')

img_dir = "assets/images"
heavy_images = [
    "Аникина Екаерина.jpg",
    "Иванова Наталья.jpg",
    "Кулешов Иван.jpg"
]

max_dimension = 800
quality = 82

print("=== STARTING IMAGE OPTIMIZATION ===")

for filename in heavy_images:
    file_path = os.path.join(img_dir, filename)
    if not os.path.exists(file_path):
        print(f"[ERROR] File not found: {file_path}")
        continue
    
    # Check original size
    old_size = os.path.getsize(file_path) / (1024 * 1024)
    print(f"\nOptimizing: {filename} ({old_size:.2f} MB)")
    
    # 1. Back up original file
    backup_path = file_path + ".bak"
    shutil.copy2(file_path, backup_path)
    print(f"  [OK] Created backup at {backup_path}")
    
    # 2. Resize and save
    try:
        with Image.open(file_path) as img:
            # Handle orientation if present
            try:
                # Transpose if the image has EXIF orientation info
                from PIL import ImageOps
                img = ImageOps.exif_transpose(img)
            except Exception:
                pass
                
            width, height = img.size
            print(f"  [INFO] Original dimensions: {width}x{height}")
            
            # Calculate new size maintaining aspect ratio
            if width > height:
                if width > max_dimension:
                    new_width = max_dimension
                    new_height = int(height * (max_dimension / width))
                else:
                    new_width, new_height = width, height
            else:
                if height > max_dimension:
                    new_height = max_dimension
                    new_width = int(width * (max_dimension / height))
                else:
                    new_width, new_height = width, height
            
            if (new_width, new_height) != (width, height):
                # Use Lanczos resampling (Pillow 10+ uses Image.Resampling.LANCZOS or Image.LANCZOS)
                try:
                    resample_mode = Image.Resampling.LANCZOS
                except AttributeError:
                    resample_mode = Image.LANCZOS
                    
                img_resized = img.resize((new_width, new_height), resample=resample_mode)
                print(f"  [INFO] Resizing to: {new_width}x{new_height}")
            else:
                img_resized = img
                print(f"  [INFO] Dimensions are within limit, only compressing")
            
            # Save compressed
            img_resized.save(file_path, format="JPEG", quality=quality, optimize=True)
            
            new_size = os.path.getsize(file_path) / (1024 * 1024)
            reduction = (1 - (new_size / old_size)) * 100
            print(f"  [SUCCESS] Saved optimized image: {new_size:.3f} MB ({reduction:.1f}% size reduction)")
            
    except Exception as e:
        print(f"  [ERROR] Failed to optimize {filename}: {e}")

print("\n=== OPTIMIZATION COMPLETE ===")
