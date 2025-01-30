FROM python:3.12-slim
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/
COPY . /api
WORKDIR /api
RUN uv sync --frozen --no-cache
EXPOSE 8080
CMD ["/api/.venv/bin/fastapi", "run", "app/main.py", "--port", "8080", "--host", "0.0.0.0"]
