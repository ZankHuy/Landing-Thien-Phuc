import os
from PIL import Image

IMAGES_DIR = r"d:\Code\Landing-Thien-Phuc\Code\Images"

def compress_images():
    total_before = 0
    total_after = 0
    count = 0

    for root, dirs, files in os.walk(IMAGES_DIR):
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in ['.jpg', '.jpeg', '.png', '.webp']:
                file_path = os.path.join(root, file)
                size_before = os.path.getsize(file_path)
                total_before += size_before

                try:
                    with Image.open(file_path) as img:
                        # Convert RGBA to RGB for JPEG if needed
                        if ext in ['.jpg', '.jpeg'] and img.mode in ('RGBA', 'P'):
                            img = img.convert('RGB')
                        
                        width, height = img.size
                        max_dim = 1920 if 'Photos' in root else 1000

                        if width > max_dim or height > max_dim:
                            if width > height:
                                new_w = max_dim
                                new_h = int(height * (max_dim / width))
                            else:
                                new_h = max_dim
                                new_w = int(width * (max_dim / height))
                            img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
                        
                        if ext in ['.jpg', '.jpeg']:
                            img.save(file_path, 'JPEG', quality=82, optimize=True, progressive=True)
                        elif ext == '.png':
                            img.save(file_path, 'PNG', optimize=True)

                        size_after = os.path.getsize(file_path)
                        total_after += size_after
                        count += 1
                        print(f"Compressed {file}: {size_before/1024:.1f}KB -> {size_after/1024:.1f}KB ({(1 - size_after/size_before)*100:.1f}% saved)")

                except Exception as e:
                    print(f"Error processing {file}: {e}")

    print(f"\nCompleted! {count} images processed.")
    print(f"Total size before: {total_before / (1024*1024):.2f} MB")
    print(f"Total size after:  {total_after / (1024*1024):.2f} MB")
    print(f"Total saved:       {(total_before - total_after) / (1024*1024):.2f} MB ({(1 - total_after/total_before)*100:.1f}%)")

if __name__ == '__main__':
    compress_images()
