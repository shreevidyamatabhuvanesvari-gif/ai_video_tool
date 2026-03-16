import os
from moviepy.editor import VideoFileClip

UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"


def extract_audio(video_path):
    
    if not os.path.exists(video_path):
        print("❌ Video file not found")
        return None

    print("🎬 Loading video...")

    video = VideoFileClip(video_path)

    audio_path = os.path.join(OUTPUT_DIR, "audio.wav")

    print("🎧 Extracting audio...")

    video.audio.write_audiofile(audio_path)

    print("✅ Audio saved:", audio_path)

    return audio_path
