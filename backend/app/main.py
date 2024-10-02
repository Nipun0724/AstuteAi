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

    # Load the Stable Diffusion model with reduced precision (fp16)
    image_pipe = StableDiffusionPipeline.from_pretrained(
        "CompVis/stable-diffusion-v1-4", 
        torch_dtype=torch.float16,
        revision="fp16",  # Ensure using the fp16 version for memory savings
        force_download=True  # Re-download the model if needed
    )

    # Move the model to GPU
    if torch.cuda.is_available():
        try:
            image_pipe = image_pipe.to("cuda")  # Move to CUDA
            print("Model successfully loaded on CUDA.")
        except RuntimeError as e:
            print(f"CUDA memory issue: {e}")
            image_pipe = image_pipe.to("cpu")  # Fallback to CPU if GPU runs out of memory
            print("Model loaded on CPU due to memory constraints.")
    else:
        print("CUDA not available, loading the model on CPU.")
        image_pipe = image_pipe.to("cpu")  # Load on CPU if CUDA is not available

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
    product_name: str
    background_description: str
    
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
    try:
        product_name = request.product_name
        background_description = request.background_description
        logger.info(f"Received request to generate advertisement for product: {product_name}")

        image_prompts = [
            f"A {product_name} bottle emerging from a foggy background {background_description} and dramatic lighting with a rotating effect.",
            f"Close-up of the {product_name} bottle rotating to highlight its features {background_description} with soft, elegant lighting.",
            f"A person in a stylish setting applying the {product_name} {background_description}, showing satisfaction.",
            f"Animated visual effect representing the {product_name} mist spreading around the scene {background_description}.",
            f"The {product_name} bottle fading out {background_description}."
        ]

        logger.info(f"Generated image prompts: {image_prompts}")

        image_filenames = []
        for i, prompt in enumerate(image_prompts):
            logger.info(f"Generating image for prompt {i + 1}/{len(image_prompts)}: {prompt}")
            image = image_pipe(prompt).images[0]
            image_filename = f"frame_{i}.png"
            image.save(image_filename)
            image_filenames.append(image_filename)
            logger.info(f"Saved image: {image_filename}")

        frame_rate = 2
        video_filename = "advertisement.mp4"

        first_image = cv2.imread(image_filenames[0])
        frame_size = (first_image.shape[1], first_image.shape[0])

        logger.info("Creating video from generated images.")
        fourcc = cv2.VideoWriter_fourcc(*'avc1')  # Correct fourcc for H.264 codec
        video_writer = cv2.VideoWriter(video_filename, fourcc, frame_rate, frame_size)

        for image_filename in image_filenames:
            frame = cv2.imread(image_filename)
            video_writer.write(frame)
            logger.info(f"Added frame to video: {image_filename}")

        video_writer.release()
        logger.info(f"Video created successfully: {video_filename}")

        # Upload video to Cloudinary
        logger.info("Uploading video to Cloudinary.")
        cloudinary_result = cloudinary.uploader.upload_large(
            video_filename, resource_type="video"
        )
        logger.info(f"Cloudinary upload response: {cloudinary_result}")  # Added logging
        cloudinary_url = cloudinary_result['secure_url']
        logger.info(f"Video uploaded successfully. URL: {cloudinary_url}")


        # Return the Cloudinary URL in the response
        return JSONResponse(content={"video_url": cloudinary_url})

    except Exception as e:
        logger.error(f"Error occurred while generating advertisement: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

from pydantic import BaseModel

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
