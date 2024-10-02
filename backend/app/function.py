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