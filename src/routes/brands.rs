use actix_web::{post, web, HttpResponse, Responder};
use async_openai::{config::AzureConfig, types::CreateCompletionRequest, Client};

#[post("/api/brands")]
pub async fn brands(
    _data: web::Data<(Client<AzureConfig>, CreateCompletionRequest)>,
    req_body: String,
) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

// TODO: 
// async def upload_csv(file: UploadFile = File(...)):
//     contents = await file.read()
//     decoded_content = contents.decode("utf-8")
//     reader = csv.reader(io.StringIO(decoded_content))
//     data = [row[0] for row in reader]
//     print([line for line in data])
//     messages = [{"ITEM_NAME": line, "BRAND_NAME": send_to_llm(line)[0]} for line in data]
//     generated_csv = generate_csv_from_list(messages)
//     return StreamingResponse(
//         iter([generated_csv]),
//         media_type="text/csv",
//         headers={"Content-Disposition": "attachment; filename=items_with_brand_names.csv"}
//     )


// def generate_csv_from_list(data):
//     output = io.StringIO()
//     fieldnames = ['ITEM_NAME', 'BRAND_NAME']
//     writer = csv.DictWriter(output, fieldnames=fieldnames)
//     writer.writeheader()
//     for row in data:
//         writer.writerow(row)
//     return output.getvalue()