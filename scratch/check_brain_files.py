import os
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

brain_dir = r"C:\Users\nikif\.gemini\antigravity\brain\cb69ca20-cd0a-468a-9d63-b32107071a8d"
if os.path.exists(brain_dir):
    files = os.listdir(brain_dir)
    print("Files in brain directory:")
    # sort by modification time, newest first
    file_times = []
    for f in files:
        full_path = os.path.join(brain_dir, f)
        if os.path.isfile(full_path):
            mtime = os.path.getmtime(full_path)
            file_times.append((f, mtime))
            
    file_times.sort(key=lambda x: x[1], reverse=True)
    for f, mtime in file_times[:30]:
        print(f"- {f}: {time.ctime(mtime)} (size: {os.path.getsize(os.path.join(brain_dir, f))} bytes)")
else:
    print("Brain directory does not exist")
