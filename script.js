// Elements
const videoInput = document.getElementById("videoInput");
const videoPlayer = document.getElementById("videoPlayer");
const subtitleBox = document.getElementById("subtitleBox");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

// Speech Recognition Setup
let recognition = null;
let isListening = false;
let finalTranscript = "";

// Browser Support Check
const SpeechRecognitionAPI =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognitionAPI) {
  alert("❌ आपका browser Speech Recognition support नहीं करता");
} else {
  recognition = new SpeechRecognitionAPI();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "hi-IN";
}

// 🎥 Video Load
videoInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    videoPlayer.src = url;
  }
});

// 🎤 Start Recognition (Safe Start)
function startRecognition() {
  if (!recognition) return;

  if (!isListening) {
    try {
      recognition.start();
      isListening = true;
      subtitleBox.innerText = "🎤 सुन रहा है...";
    } catch (e) {
      console.log("Start Error:", e);
    }
  }
}

// ⛔ Stop Recognition (Safe Stop)
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

// 🎧 Result Handling (Improved)
if (recognition) {
  recognition.onresult = (event) => {
    let interimTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      let transcript = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        finalTranscript += transcript + " ";
      } else {
        interimTranscript += transcript;
      }
    }

    subtitleBox.innerText = finalTranscript + "\n" + interimTranscript;
  };

  // 🔁 Safe Restart (No infinite loop)
  recognition.onend = () => {
    if (isListening) {
      setTimeout(() => {
        try {
          recognition.start();
        } catch (e) {
          console.log("Restart blocked");
        }
      }, 500);
    }
  };

  // ⚠️ Error Handling
  recognition.onerror = (event) => {
    console.log("Speech Error:", event.error);

    if (event.error === "not-allowed") {
      alert("🎤 Mic permission allow करें");
      isListening = false;
    }
  };
}

// 🎬 Video Sync (Better Behavior)
videoPlayer.addEventListener("play", () => {
  startRecognition();
});

videoPlayer.addEventListener("pause", () => {
  stopRecognition();
});

videoPlayer.addEventListener("ended", () => {
  stopRecognition();
});
