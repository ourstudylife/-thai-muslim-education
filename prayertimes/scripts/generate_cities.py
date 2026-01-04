import os
import json

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data', 'cities')
TEMPLATE_PATH = os.path.join(BASE_DIR, 'city.html')

def generate_cities():
    if not os.path.exists(TEMPLATE_PATH):
        print(f"Template not found: {TEMPLATE_PATH}")
        return

    with open(TEMPLATE_PATH, 'r', encoding='utf-8') as f:
        template_content = f.read()

    for root, dirs, files in os.walk(DATA_DIR):
        for file in files:
            if file.endswith('.json'):
                json_path = os.path.join(root, file)
                
                # Get relative path from data/cities
                rel_path = os.path.relpath(json_path, DATA_DIR)
                # components: ['thailand', 'bangkok.json']
                parts = rel_path.split(os.sep)
                
                if len(parts) < 2:
                    continue
                
                country = parts[0]
                city = parts[1].replace('.json', '')
                
                # Create directory
                city_dir = os.path.join(BASE_DIR, country, city)
                os.makedirs(city_dir, exist_ok=True)
                
                # Write index.html
                output_path = os.path.join(city_dir, 'index.html')
                with open(output_path, 'w', encoding='utf-8') as f:
                    f.write(template_content)
                
                print(f"Generated: {country}/{city}/index.html")

if __name__ == "__main__":
    generate_cities()
