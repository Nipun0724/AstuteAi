from fastapi import FastAPI, HTTPException
import logging
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from langchain.prompts import PromptTemplate
from pydantic import BaseModel
from contextlib import asynccontextmanager
import cv2
import cloudinary.uploader
from diffusers import StableDiffusionPipeline
from app.function import load_llm
from supabase import create_client, Client
import torch
from torchvision.models.detection import maskrcnn_resnet50_fpn
import torchvision.transforms as T
import numpy as np
import base64
from typing import List
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
from langchain_google_genai import ChatGoogleGenerativeAI

cloudinary.config(
    cloud_name="dtuqpup4a",  # replace with your Cloudinary cloud name
    api_key="291317165429892",  # replace with your Cloudinary API key
    api_secret="qJq00V57nGffgM_ev-BcG5Tbmnk"  # replace with your Cloudinary API secret
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    global image_pipe
    
    # Clear any leftover GPU memory (if needed)
    torch.cuda.empty_cache()
    
    try:
        # Load the Stable Diffusion model with reduced precision (fp16)
        print("Loading the Stable Diffusion model with fp16 precision.")
        image_pipe = StableDiffusionPipeline.from_pretrained(
            "CompVis/stable-diffusion-v1-4", 
            torch_dtype=torch.float16,
            revision="fp16",  # Ensure using the fp16 version for memory savings
            force_download=True  # Re-download the model if needed
        )

        # Force model to be loaded on GPU
        if torch.cuda.is_available():
            image_pipe = image_pipe.to("cuda")  # Forcefully move to GPU
            print("Model successfully loaded on CUDA.")
        else:
            raise RuntimeError("CUDA is not available but required for this operation.")

    except RuntimeError as e:
        # If any CUDA-related error occurs, raise it as a critical issue
        print(f"Critical error: {e}")
        raise e  # Re-raise the error to ensure it's not silently handled

    # Yield control back to FastAPI
    yield

    # Clean up resources when shutting down
    del image_pipe
    torch.cuda.empty_cache()  # Clear GPU memory
    print("Model and CUDA cache cleared.")


# Attach the lifespan context to FastAPI
app = FastAPI(lifespan=lifespan)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
supabase: Client = create_client('https://hwhwcqocrdidmwixrlil.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3aHdjcW9jcmRpZG13aXhybGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5ODc1OTMsImV4cCI6MjA0MTU2MzU5M30.ZvoeulclLUddd92a9tdvUb905dEvLoiFqRafEEpibZk')

class BlogInput(BaseModel):
    blog_input: str

class AdvertisementRequest(BaseModel):
    prompt: str
    product_type: str
    
class AuthInput(BaseModel):
    email: str
    password: str

class LogoInput(BaseModel):
    industry: str
    objects: str
    colors: str

class ProfileSchema(BaseModel):
    f_name: str
    l_name: str
    username: str
    email: str  # Ensures valid email
    phone: str
    b_name: str
    b_idea: str
    location: str
    years: int
    customers: str
    usp: str
    logo: str  # Make `logo` optional


def detect_objects(image_pil):
    logger.info("Starting object detection on the image")
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    transform = T.Compose([T.ToTensor()])
    image_tensor = transform(image_pil).unsqueeze(0).to(device)

    model = maskrcnn_resnet50_fpn(pretrained=True).to(device)
    model.eval()

    with torch.no_grad():
        predictions = model(image_tensor)[0]

    masks = predictions['masks'].cpu().numpy()
    boxes = predictions['boxes'].cpu().numpy()

    logger.info("Object detection complete. Found %d boxes.", len(boxes))

    return masks, boxes

def add_text_outside_box(image_pil, boxes, catchy_text):
    logger.info("Adding text outside the detected box.")
    
    image = np.array(image_pil)
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    pil_image = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    draw = ImageDraw.Draw(pil_image)

    font_size = 40
    font = ImageFont.truetype("arial.ttf", font_size)  # Added "arial.ttf" for proper font loading

    image_width, image_height = pil_image.size  # Corrected width, height order
    x_min, y_min, x_max, y_max = [int(b) for b in boxes[0]]

    text_x = x_max + 20
    text_y = (y_min + y_max) // 2

    text_bbox = draw.textbbox((text_x, text_y), catchy_text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]

    if text_x + text_width > image_width:
        text_x = image_width - text_width - 20

    if text_y + text_height > image_height:
        text_y = image_height - text_height - 20

    draw.text((text_x, text_y), catchy_text, font=font, fill=(255, 255, 255))

    image_with_text = np.array(pil_image)

    logger.info("Text added successfully outside the box.")
    
    return Image.fromarray(image_with_text)

@app.post("/register")
def register(auth_input: AuthInput):
    try:
        response = supabase.auth.sign_up({
            "email": auth_input.email,
            "password": auth_input.password,
        })
        return {"message": "User registered successfully!", "user_id": response.user.id}
    except Exception as e:
        logging.error(f"Registration error: {e}")  # Log the full error
        raise HTTPException(status_code=500, detail=str(e))  # Return the error message


@app.post("/login")
def login(auth_input: AuthInput):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": auth_input.email,
            "password": auth_input.password,
        })
        return {"message": "Login successful!", "access_token": response.session.access_token}
    except Exception as e:
        logging.error(f"Login error: {e}")
        raise HTTPException(status_code=401, detail="Login failed")

@app.post("/generate_advertisement")
async def generate_advertisement(request: AdvertisementRequest):
    prompt = request.prompt
    product_type = request.product_type
    logger.info("Received request to generate advertisement for product: %s", product_type)

    try:
        poster_image = image_pipe(product_type).images[0]  # Assuming image_pipe is properly defined
        logger.info("Image generated from prompt.")

        # Object detection
        masks, boxes = detect_objects(poster_image)

        catchy_text = generate_catchy_text(prompt)
        logger.info("Generated catchy text: %s", catchy_text)

        final_image = add_text_outside_box(poster_image, boxes, catchy_text)

        buffered = BytesIO()
        final_image.save(buffered, format="PNG")
        buffered.seek(0)

        upload_result = cloudinary.uploader.upload(buffered)
        logger.info("Image uploaded to Cloudinary.")

        return {"image_url": upload_result['url'], "catchy_text": catchy_text}
    except Exception as e:
        logger.error("Error generating advertisement: %s", str(e))
        raise HTTPException(status_code=500, detail=str(e))

def generate_catchy_text(product_type):
    prompt_template_str = (
        "Generate a short 3 words catchy text or slogan for the {product_type} "
        "which displays in the advertisement poster."
    )
    
    prompt_template = PromptTemplate.from_template(prompt_template_str)
    
    llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.4, google_api_key="AIzaSyARn_PcqweM5MXHxYaIWGQcf-BDJMP1bDw")
    
    sequence = prompt_template | llm
    
    # Invoke the LLM
    result = sequence.invoke(input={"product_type": product_type})
    
    # Add logging for debugging
    logger.info(f"Result from AI model: {result}, type: {type(result)}")
    
    # Extract the content from the result
    if hasattr(result, 'content'):
        catchy_text = result.content.strip()  # Extract and strip leading/trailing whitespace
        
        # Remove asterisks and split by newline
        catchy_text_lines = catchy_text.split('\n')
        catchy_text_cleaned = [line.strip('* ').strip() for line in catchy_text_lines]  # Strip asterisks and whitespace
        
        # Keep the lines as they are (return as a list)
        catchy_text = "\n".join(catchy_text_cleaned)  # Join cleaned lines with newline
    else:
        catchy_text = str(result).strip()  # Fallback if the content attribute does not exist
    
    # Logging the final catchy text
    logger.info(f"Generated catchy text: {catchy_text}")
    
    return catchy_text




class ProfileSchema(BaseModel):
    f_name: str
    l_name: str
    username: str
    email: str  # Ensures valid email
    phone: str
    b_name: str
    b_idea: str
    location: str
    years: int
    customers: str
    usp: str
    logo: str

class ProfileRequest(BaseModel):
    profile: ProfileSchema

@app.post("/profile")
async def generate_profile(request_body: ProfileRequest):
    profile_data = request_body.profile  # Access the nested profile object
    
    try:
        # Now use `profile_data` to insert into the database
        data, error = supabase.from_("profile").insert([
            {
                "f_name": profile_data.f_name,
                "l_name": profile_data.l_name,
                "username": profile_data.username,
                "email": profile_data.email,
                "phone": profile_data.phone,
                "b_name": profile_data.b_name,
                "b_idea": profile_data.b_idea,
                "location": profile_data.location,
                "years": profile_data.years,
                "customers": profile_data.customers,
                "usp": profile_data.usp,
                "logo": profile_data.logo,
            }
        ]).execute()

        if error:
            raise HTTPException(status_code=400, detail=f"Error inserting profile: {error.message}")

        return {"message": "Profile uploaded successfully", "data": data}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")






@app.post("/generate_blog")
def generate_blog(request_body: BlogInput):
    blog_input = request_body.blog_input

    logging.info(f"Route has received the data: {blog_input}")
    
    
    prompt_template_str = (
        "You are a digital marketing expert. Write a blog post inspired by the following description: "
        "{blog_description}. The blog should be around 1000 words long, and it should be informative and engaging."
    )

    prompt_template = PromptTemplate.from_template(prompt_template_str)
    llm = load_llm(max_tokens=1000)
    
    sequence = prompt_template | llm
    
    result = sequence.invoke(input={"blog_description": blog_input})
    if isinstance(result, str):
        blog_content = result
    else:
        blog_content = result.get('text', '')

    if blog_content:
        return JSONResponse(content={
            "blog_content": blog_content,
        })
    else:
        raise HTTPException(status_code=500, detail="Your article couldn't be generated!")

@app.post("/generate_logo")
def generate_logo(request_body:LogoInput):
    try:
        industry=request_body.industry
        objects=request_body.objects
        colors=request_body.colors
        logger.info(f"Received the logo input {industry}, {objects}, {colors}")
        prompt = f"A logo of a {industry}, featuring {objects}, in {colors}. Designed in a modern, minimalistic style with vector art, 2D, and best quality. The logo should be centered and visually appealing. Negative: 'Avoid low quality, worst quality, bad composition, extra digit, fewer digits, text, inscription, watermark, label, asymmetric designs."
        generator = image_pipe(prompt=prompt, num_inference_steps=30, guidance_scale=7.5, generator=None, seed=2)
        image=generator.images[0]
        image.save("logo.png")
        logger.info("Uploading logo to Cloudinary.")
        cloudinary_result = cloudinary.uploader.upload_large(
            "logo.png"
        )
        logger.info(f"Cloudinary upload response: {cloudinary_result}")  # Added logging
        cloudinary_url = cloudinary_result['secure_url']
        logger.info(f"Image uploaded successfully. URL: {cloudinary_url}")
        return JSONResponse(content={"logo_url":cloudinary_url})
    except Exception as e:
        logger.error(f"Error occurred while generating logo: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
