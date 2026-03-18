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

  // Log current video time (debugging)
  video.addEventListener("timeupdate", () => {
    console.log("⏱️ Video Time:", formatTime(video.currentTime));
  });

  // When video metadata is loaded (duration, etc.)
  video.addEventListener("loadedmetadata", () => {
    console.log("🎥 Video duration:", formatTime(video.duration));
  });

  // Handle video load errors
  video.addEventListener("error", () => {
    alert("❌ Video load नहीं हुआ");
  });

  // ===============================
  // 📝 Subtitle Flash Effect
  // ===============================
  if (subtitleBox) {
    subtitleBox.style.transition = "all 0.3s ease";
    // Flash effect: fade opacity on content change
    const observer = new MutationObserver(() => {
      subtitleBox.style.opacity = "0.5";
      setTimeout(() => {
        subtitleBox.style.opacity = "1";
      }, 150);
    });
    observer.observe(subtitleBox, { childList: true, subtree: true });
  }
});

// ===============================
// 🎤 Mic Status (optional visual cue)
// ===============================
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
// 🌐 Network Status (optional alerts)
// ===============================
window.addEventListener("online", () => {
  console.log("🌐 Internet connected");
});
window.addEventListener("offline", () => {
  alert("⚠️ Internet disconnected - Speech may stop");
});
