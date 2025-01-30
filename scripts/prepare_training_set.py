# {
#     "messages": 
#         [
#             {
#                 "role": "system", 
#                 "content": "You are an Xbox customer support agent whose primary goal is to help users with issues they are experiencing with their Xbox devices. You are friendly and concise. You only provide factual answers to queries, and do not provide answers that are not related to Xbox."
#             }, 
#             {
#                 "role": "user", 
#                 "content": "Is Xbox better than PlayStation?"
#             }, 
#             {
#                 "role": "assistant", 
#                 "content": "I apologize, but I cannot provide personal opinions. My primary job is to assist you with any issues related to your Xbox device. Do you have any Xbox-related issues that need addressing?"
#             }
#         ]
# }

import csv  
import json  

  
def csv_to_message_jsonl(csv_file_path, jsonl_file_path):  
    """  
    Reads a CSV file with ITEM_NAME and BRAND_NAME columns and generates a JSONL file  
    in UTF-8 with BOM encoding. Each line in the JSONL file represents a structured JSON object.  
  
    Args:  
        csv_file_path (str): Path to the input CSV file.  
        jsonl_file_path (str): Path to the output JSONL file.  
    """  
    try:  
        # Open the CSV file for reading  
        with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:  
            csv_reader = csv.DictReader(csv_file)  
              
            # Check that the required columns exist  
            if 'ITEM_NAME' not in csv_reader.fieldnames or 'BRAND_NAME' not in csv_reader.fieldnames:  
                raise ValueError("CSV file must contain 'ITEM_NAME' and 'BRAND_NAME' columns.")  
              
            # Open the JSONL file for writing with UTF-8 BOM encoding  
            with open(jsonl_file_path, mode='w', encoding='utf-8-sig') as jsonl_file:  
                # Process each row in the CSV  
                for row in csv_reader:  
                    item_name = row['ITEM_NAME'].strip()  
                    brand_name = row['BRAND_NAME'].strip()  
  
                    # Create the message structure  
                    message = {  
                        "messages": [  
                            {  
                                "role": "system",  
                                "content": "You are a tool that identifies brand name based off an input."  
                            },  
                            {  
                                "role": "user",  
                                "content": item_name  
                            },  
                            {  
                                "role": "assistant",  
                                "content": brand_name  
                            }  
                        ]  
                    }  
  
                    # Write the JSON object as a single line (JSONL format)  
                    jsonl_file.write(json.dumps(message, ensure_ascii=False) + "\n")  
  
        print(f"Successfully created JSONL file: {jsonl_file_path}")  
      
    except Exception as e:  
        print(f"Error: {e}")  
  
# Example usage:  
# csv_to_message_jsonl("items.csv", "message_data.jsonl")   
  
# Call the function
csv_to_message_jsonl("./scripts/data/validation_set_1.csv", "./scripts/data/validation_set_1.jsonl")