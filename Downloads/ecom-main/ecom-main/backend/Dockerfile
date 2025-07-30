# Use base Python image
FROM continuumio/miniconda3:latest

WORKDIR /app

# Create and activate conda environment
RUN conda create -n ecom python=3.10 -y && \
    echo "source /opt/conda/etc/profile.d/conda.sh" >> ~/.bashrc && \
    echo "conda activate ecom" >> ~/.bashrc

# Set up environment variables
ENV PATH /opt/conda/envs/ecom/bin:$PATH
ENV CONDA_DEFAULT_ENV ecom
ENV CONDA_PREFIX /opt/conda/envs/ecom
ENV PYTHONUNBUFFERED=1
ENV SHELL /bin/sh

# Install system dependencies
RUN apt-get update && apt-get install -y \
    wget \
    build-essential \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker cache
COPY requirements.txt .
RUN . /opt/conda/etc/profile.d/conda.sh && \
    conda activate ecom && \
    pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user and set permissions
RUN useradd -m -u 1000 appuser && \
    chown -R appuser:appuser /app && \
    chmod -R 755 /app
USER appuser

# Expose port
EXPOSE 5000

# Run the application with Gunicorn
CMD ["/bin/bash", "-c", ". /opt/conda/etc/profile.d/conda.sh && conda activate ecom && gunicorn --bind 0.0.0.0:5000 --workers 1 --timeout 120 --reload --access-logfile - --error-logfile - --log-level debug wsgi:app"]