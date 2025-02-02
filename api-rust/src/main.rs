use actix_web::{App, HttpServer};
use dotenv::from_path;
use std::path::Path;

mod routes;
mod utils;
use routes::api_string::api_string;
use routes::healthcheck::healthcheck;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    from_path(Path::new("../.env.local")).expect("Failed to load .env file");

    HttpServer::new(|| App::new().service(healthcheck).service(api_string))
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}
