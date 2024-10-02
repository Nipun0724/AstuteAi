from diffusers import StableDiffusionPipeline
import os

# Define the directory where the model will be saved
model_directory = "app/stable-diffusion-v1-4"

# Create the directory if it doesn't exist
os.makedirs(model_directory, exist_ok=True)

# Force re-download the model and save it locally
print("Downloading and saving the model...")
pipeline = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4", force_download=True)
pipeline.save_pretrained(model_directory)

print(f"Model saved to {model_directory}")
