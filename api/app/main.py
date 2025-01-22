from fastapi import FastAPI

app = FastAPI()


@app.post("/api/chart")
def read_root():
    # Receive POST request with body {value: "Compare performance of 2 campaigns XXX and YYY and put them both in a line chart with X axis being X and Y axis being Y"}
    
    # [sql_statement, chart_type] = generate_sql_statement(request.body.value) - Should have prompt template with all the tables and columns described and slot for the request + type of the chart

    # data_from_sql = get_snowflake_data(sql_statement) - REST API call to Snowflake

    # formatted_data = snowflake_to_json(data_from_sql) - AI call to format the data. Args: sql data, chart type. Should have data about Chart.js API.

    # return {data: formatted_data} - Should return the data in the format that the frontend can use to render the chart
    return {"data": null}
