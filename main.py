
# Set your OpenAI API key
api_key = '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'


from pathlib import Path
from openai import OpenAI
client = OpenAI(api_key=api_key)

response = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "user", "content": "Write a script for a YouTube video that explains about JavaScript settimeout "},
  ]
)
# Generate some content
content_to_write = response.choices[0].message.content

# Specify the file path
file_path = "generated_file.txt"

# Open the file in write mode ('w')
# This will create the file if it doesn't exist, or truncate it if it does
with open(file_path, 'w') as file:
    # Write the content to the file
    file.write(content_to_write)

print(f"File '{file_path}' has been generated and written.")
