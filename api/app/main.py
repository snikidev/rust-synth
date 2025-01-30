from fastapi import File, UploadFile, HTTPException, FastAPI
from pydantic import BaseModel
import csv
import io

app = FastAPI()

class ValueModel(BaseModel):
    value: str

def send_to_llm(line):
    print("this is a line",line);

@app.get("/healthcheck")
def healthcheck():
    return {"status": "ok"}

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.post("/api/string")
def read_root(value_model: ValueModel):
    print(f"Received value: {value_model.value}")
    return {"data": value_model.value}

@app.post("/api/upload")
async def upload_csv(file: UploadFile = File(...)):
    contents = await file.read()
    decoded_content = contents.decode("utf-8")
    reader = csv.reader(io.StringIO(decoded_content))
    data = [row for row in reader]
    for line in data:
        send_to_llm(line)
    return {"message": "CSV processed", "data": data}
