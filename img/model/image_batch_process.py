import os

# Get the current working directory
current_directory = os.getcwd()
print(f"Current Directory: {current_directory}")

# List all files in the current directory
files = os.listdir(current_directory)
print("Files in Directory:", files)

# Get file metadata (e.g., size in bytes)
for file in files:
    file_path = os.path.join(current_directory, file)
    if os.path.isfile(file_path):
        file_size = os.path.getsize(file_path)
        print(f"File: {file}, Size: {file_size} bytes")