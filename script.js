// Elements
const videoInput = document.getElementById("videoInput");
const videoPlayer = document.getElementById("videoPlayer");
const subtitleBox = document.getElementById("subtitleBox");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

// Speech Recognition
let recognition = null;
let isListening = false;
let finalTranscript = "";

// API Detect
const SpeechRecognitionAPI =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognitionAPI) {
  alert("❌ Speech Recognition support नहीं है");
} else {
  recognition = new SpeechRecognitionAPI();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "hi-IN";
}

// 🎥 Load Video
videoInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    videoPlayer.src = URL.createObjectURL(file);
  }
});

// 🎤 Start Recognition (Internal mic optimization)
async function startRecognition() {
  if (!recognition || isListening) return;

  try {
    // 🔥 IMPORTANT: echoCancellation OFF
    await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false
      }
    });

    recognition.start();
    isListening = true;

    subtitleBox.innerText = "🎤 Internal audio capture active...";

  } catch (e) {
    alert("🎤 Mic permission जरूरी है");
  }
}

// ⛔ Stop
function stopRecognition() {
  if (!recognition) return;

  if (isListening) {
    recognition.stop();
    isListening = false;
  }
}

// Buttons
startBtn.addEventListener("click", startRecognition);
stopBtn.addEventListener("click", stopRecognition);

// 🎧 Result Handling
if (recognition) {
  recognition.onresult = (event) => {
    let interim = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      let text = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        finalTranscript += text + " ";
      } else {
        interim += text;
      }
    }

    subtitleBox.innerText = finalTranscript + "\n" + interim;
  };

  // Restart safely
  recognition.onend = () => {
    if (isListening) {
      setTimeout(() => {
        try {
          recognition.start();
        } catch (e) {}
      }, 500);
    }
  };

  recognition.onerror = (event) => {
    console.log("Error:", event.error);

    if (event.error === "not-allowed") {
      alert("Mic permission allow करें");
      isListening = false;
    }
  };
}

// 🎬 Sync with video
videoPlayer.addEventListener("play", async () => {
  videoPlayer.muted = false;

  await startRecognition();
});

videoPlayer.addEventListener("pause", stopRecognition);
videoPlayer.addEventListener("ended", stopRecognition);
