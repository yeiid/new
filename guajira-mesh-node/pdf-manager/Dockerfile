FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

ENV PIP_DEFAULT_TIMEOUT=120
ENV PIP_RETRIES=10

RUN apt-get update && apt-get install -y build-essential && \
    pip install --upgrade pip setuptools wheel && \
    pip install --no-cache-dir -r requirements.txt --default-timeout=120 -i https://pypi.org/simple && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

COPY . .

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
