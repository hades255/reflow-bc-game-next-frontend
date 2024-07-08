import os

def rename_files(directory):
    """
    Renames files in the given directory by replacing -Gold with -1, -Silver with -2, and -Bronze with -3
    """
    for filename in os.listdir(directory):
        if filename.endswith(".png"):
            new_filename = filename
            if "-Gold" in filename:
                new_filename = filename.replace("-Gold", "-1")
            elif "-Silver" in filename:
                new_filename = filename.replace("-Silver", "-2")
            elif "-Bronze" in filename:
                new_filename = filename.replace("-Bronze", "-3")

            os.rename(os.path.join(directory, filename), os.path.join(directory, new_filename))
            print(f"Renamed {filename} to {new_filename}")

# Example usage
directory = "C:\\Users\\Francesco\\Desktop\\spin\\tokens\\ok"
rename_files(directory)
