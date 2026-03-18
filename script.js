// Elements
const videoInput = document.getElementById("videoInput");
const videoPlayer = document.getElementById("videoPlayer");
const subtitleBox = document.getElementById("subtitleBox");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

let recognition;
let isListening = false;
let finalTranscript = "";

// Check support
const SpeechRecognitionAPI =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognitionAPI) {
  alert("❌ यह browser support नहीं करता (Chrome mobile में issue है)");
} else {
  recognition = new SpeechRecognitionAPI();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "hi-IN";
}

// Load video
videoInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    videoPlayer.src = URL.createObjectURL(file);
  }
});

// 🎤 Start (ONLY via button click)
startBtn.addEventListener("click", async () => {
  if (!recognition) return;

  try {
    // Mic permission
    await navigator.mediaDevices.getUserMedia({ audio: true });

    recognition.start();
    isListening = true;

    subtitleBox.innerText = "🎤 Listening... बोलिए";

  } catch (e) {
    alert("Mic permission नहीं मिला");
  }
});

// ⛔ Stop
stopBtn.addEventListener("click", () => {
  if (recognition && isListening) {
    recognition.stop();
    isListening = false;
  }
});

// 🎧 Result
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

  recognition.onerror = (event) => {
    console.log("Error:", event.error);
    alert("Error: " + event.error);
  };

  recognition.onend = () => {
    console.log("Recognition stopped");
    isListening = false;
  };
}
