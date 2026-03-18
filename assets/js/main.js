// ===============================
// 🔧 Utility Functions
// ===============================

// Format time (seconds → mm:ss)
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// ===============================
// 🎬 Video Enhancements
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("videoPlayer");
  const subtitleBox = document.getElementById("subtitleBox");

  if (!video) return;

  // Show current time on console (debug purpose)
  video.addEventListener("timeupdate", () => {
    const current = formatTime(video.currentTime);
    console.log("⏱️ Video Time:", current);
  });

  // When video is loaded
  video.addEventListener("loadedmetadata", () => {
    console.log("🎥 Video duration:", formatTime(video.duration));
  });

  // Error handling
  video.addEventListener("error", () => {
    alert("❌ Video load नहीं हुआ");
  });

  // ===============================
  // 📝 Subtitle Styling Enhancement
  // ===============================

  if (subtitleBox) {
    subtitleBox.style.transition = "all 0.3s ease";

    // Flash effect when subtitle updates
    const observer = new MutationObserver(() => {
      subtitleBox.style.opacity = "0.5";
      setTimeout(() => {
        subtitleBox.style.opacity = "1";
      }, 150);
    });

    observer.observe(subtitleBox, {
      childList: true
    });
  }
});

// ===============================
// 🎤 Status Indicator (Optional)
// ===============================

// Detect mic usage visually
function showMicStatus(active) {
  const subtitleBox = document.getElementById("subtitleBox");
  if (!subtitleBox) return;

  if (active) {
    subtitleBox.style.border = "2px solid #22c55e";
  } else {
    subtitleBox.style.border = "none";
  }
}

// ===============================
// 🌐 Network Status (Optional)
// ===============================

window.addEventListener("online", () => {
  console.log("🌐 Internet connected");
});

window.addEventListener("offline", () => {
  alert("⚠️ Internet disconnected - Speech may stop");
});
