# Flask Task Manager

A simple task management application built with Flask.

## Setup with Conda

1. Install Miniconda (if you haven't already):
   - Download from: https://docs.conda.io/en/latest/miniconda.html
   - Follow the installation instructions for your operating system

2. Create and activate the Conda environment:
   ```bash
   # Create the environment from the environment.yml file
   conda env create -f environment.yml

   # Activate the environment
   conda activate flask-task-manager
   ```

3. Run the application:
   ```bash
   python run.py
   ```

4. Access the application at: http://127.0.0.1:5000/

## Features

- Add, delete, and mark tasks as complete
- Modern UI with Bootstrap
- SQLite database for data persistence
- Flash messages for user feedback

## Development

To update the environment after adding new dependencies:
```bash
conda env update -f environment.yml --prune
```

To deactivate the Conda environment when you're done:
```bash
conda deactivate
``` 