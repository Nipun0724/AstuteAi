import os
import logging
import requests
from langchain_community.llms import CTransformers
from fastapi import HTTPException

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load the language model
def load_llm(max_tokens):
    try:
        logger.info("Loading model from local file")
        model_path = os.path.join(os.getcwd(),"llama_model.bin")
        
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found at {model_path}")

        llm = CTransformers(
            model=model_path,
            model_type="llama",
            max_new_tokens=max_tokens,
            temperature=0.7
        )

        return llm

    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        raise

# Fetch image URL from Pexels API
def get_src_original_url(query):
    url = 'https://api.pexels.com/v1/search'
    headers = {
    'Authorization': "Ura2E4Y3bRGkVpRMeN5R53GS62WQ1bhVjcntmYod8Ima1diEcS3NWN8l",
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
    }
    params = {
        'query': query,
        'per_page': 1,
    }
    try:
        logger.info(f"Sending request to Pexels API with query: {query}")
        response = requests.get(url, headers=headers, params=params)
        logger.info(f"Received response from Pexels API with status code: {response.status_code}")

        if response.status_code == 200:
            data = response.json()
            photos = data.get('photos', [])
            if photos:
                logger.info("Photo found, returning image URL and description")
                return photos[0]['src']['original'], photos[0]['alt']  # Return the image URL and alt text (description)
            else:
                logger.warning("No photos found for the given query.")
                raise HTTPException(status_code=404, detail="No photos found for the given query.")
        elif response.status_code == 403:
            logger.error("403 Forbidden: Check your API key and permissions.")
            raise HTTPException(status_code=403, detail="Forbidden: Check your API key and permissions.")
        else:
            logger.error(f"Pexels API returned error: {response.text}")
            raise HTTPException(status_code=response.status_code, detail=response.text)

    except Exception as e:
        logger.error(f"Error fetching image from Pexels API: {str(e)}")
        raise