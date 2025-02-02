use actix_web::{post, HttpResponse, Responder};

use crate::utils::llm::init_llm;
use async_openai::types::CreateCompletionRequestArgs;

#[post("/api/string")]
pub async fn api_string(req_body: String) -> impl Responder {
    let client = init_llm().await;
    
    let request = CreateCompletionRequestArgs::default()
        .model("gpt-3.5-turbo-instruct")
        .prompt("Tell me the recipe of alfredo pasta")
        .max_tokens(40_u32)
        .build()
        .unwrap();

    let response = client
        .completions() // Get the API "group" (completions, images, etc.) from the client
        .create(request) // Make the API call in that "group"
        .await
        .unwrap();

    HttpResponse::Ok().body(req_body)
}
