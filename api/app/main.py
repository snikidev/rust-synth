from fastapi import File, UploadFile, HTTPException, FastAPI
from openai import AzureOpenAI
from pydantic import BaseModel
import csv
import io

CLIENT = AzureOpenAI(
    api_key="G4lYrU7dDLr7MTHcbC9EFnY0d3ibpJn6SKUkUPccnpkIsQATx4xnJQQJ99BAACHYHv6XJ3w3AAAAACOGUVBf",
    api_version="2024-08-01-preview",
    azure_endpoint="https://ai-genuinelyinepthub826322430439.openai.azure.com/"
    )

DEPLOYMENT_NAME='gpt-4o'

SYSTEM_PROMPT = {
    "role": "system",
    "content": "You are an ice cream van owner."
}

app = FastAPI()

class ValueModel(BaseModel):
    value: str

def send_to_llm(line):
    messages = [SYSTEM_PROMPT, {"role": "user", "content": line}]
    response = CLIENT.chat.completions.create(model=DEPLOYMENT_NAME, max_tokens=10, messages=messages)
    print(response)
    return [choice.message.content for choice in response.choices]

@app.get("/healthcheck")
def healthcheck():
    return {"status": "ok"}

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.post("/api/string")
def read_root(value_model: ValueModel):
    print(f"Received value: {value_model.value}")
    messages = send_to_llm(value_model.value)
    return {"data": messages}

@app.post("/api/upload")
async def upload_csv(file: UploadFile = File(...)):
    contents = await file.read()
    decoded_content = contents.decode("utf-8")
    reader = csv.reader(io.StringIO(decoded_content))
    data = [row for row in reader]
    for line in data:
        send_to_llm(line)
    return {"message": "CSV processed", "data": data}
