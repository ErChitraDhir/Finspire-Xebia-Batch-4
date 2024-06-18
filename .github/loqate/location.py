import requests
import os
from dotenv import load_dotenv

load_dotenv()
LOQATE_API_KEY = os.getenv('LOQATE_API_KEY')

def get_location_details(ip_address):
    base_url = 'https://api.addressy.com/Geocode/International/v1.10/json3.ws'
    params = {
        'Key': LOQATE_API_KEY,
        'Countries': 'IND',
        'Location': ip_address
    }
    
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        return None
if __name__ == "__main__":
    ip_address = '157.49.134.34'  
    
    location_details = get_location_details(ip_address)
    if location_details:
        print(location_details)
    else:
        print("Failed to get location details.")
