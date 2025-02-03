use actix_web::{App, HttpServer, web};
use dotenv::from_path;
use std::path::Path;

mod routes;
mod utils;
use crate::utils::llm::init_llm;
use routes::api_string::api_string;
use routes::healthcheck::healthcheck;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    from_path(Path::new("../.env.local")).expect("Failed to load .env file");
    let llm_client = web::Data::new(init_llm());

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(llm_client.clone()))
            .service(healthcheck)
            .service(api_string)
    })
    .bind(("127.0.0.1", 8000))?
    .run()
    .await
}
