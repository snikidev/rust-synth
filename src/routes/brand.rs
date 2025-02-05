use actix_web::{post, web, HttpResponse, Responder};
use async_openai::{config::AzureConfig, types::CreateCompletionRequest, Client};

#[post("/api/brand")]
pub async fn brand(
    data: web::Data<(Client<AzureConfig>, CreateCompletionRequest)>,
    req_body: String,
) -> impl Responder {
    println!("{}", req_body);
    
    let (client, request) = &**data;

    let response = client.completions().create(request.clone()).await.unwrap();

    println!("{}", response.choices.first().unwrap().text);

    HttpResponse::Ok().body(req_body)
}
