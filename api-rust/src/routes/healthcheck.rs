use actix_web::{get, HttpResponse, Responder};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Healthcheck {
    status: String,
}

#[get("/healthcheck")]
pub async fn healthcheck() -> impl Responder {
    HttpResponse::Ok().json(Healthcheck {
        status: String::from("ok"),
    })
}
