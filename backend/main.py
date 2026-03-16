import sys
from video_processor import extract_audio


def main():

    if len(sys.argv) < 2:
        print("Usage: python backend/main.py video.mp4")
        return

    video_file = sys.argv[1]

    print("📥 Input video:", video_file)

    audio_path = extract_audio(video_file)

    if audio_path:
        print("🎉 Audio extraction complete")


if __name__ == "__main__":
    main()
