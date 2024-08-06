document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("toggle-mode");
  const audioToText = document.getElementById("audio-to-text");
  const textToAudio = document.getElementById("text-to-audio");
  const startRecordBtn = document.getElementById("start-record-btn");
  const stopRecordBtn = document.getElementById("stop-record-btn");
  const output = document.getElementById("output");
  const copyTextBtn = document.getElementById("copy-text-btn");
  const inputText = document.getElementById("input-text");
  const speakTextBtn = document.getElementById("speak-text-btn");

  let recognition;
  let isRecording = false;

  // Toggle antara mode Audio ke Teks dan Teks ke Audio
  toggle.addEventListener("change", function () {
    if (toggle.checked) {
      audioToText.style.display = "none";
      textToAudio.style.display = "block";
    } else {
      audioToText.style.display = "block";
      textToAudio.style.display = "none";
    }
  });

  // Fungsi untuk memulai perekaman suara
  function startRecording() {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Browser tidak mendukung fitur ini.");
      return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.lang = "id-ID";
    recognition.interimResults = false;

    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      output.textContent = transcript;
    };

    recognition.onerror = function (event) {
      console.error("Error:", event.error);
    };

    recognition.start();
    isRecording = true;
    startRecordBtn.disabled = true;
    stopRecordBtn.disabled = false;
  }

  // Fungsi untuk menghentikan perekaman suara
  function stopRecording() {
    if (isRecording && recognition) {
      recognition.stop();
      isRecording = false;
      startRecordBtn.disabled = false;
      stopRecordBtn.disabled = true;
    }
  }

  // Fungsi untuk mengubah teks menjadi suara
  function speakText() {
    const text = inputText.value;
    if (text.trim() === "") {
      alert("Teks tidak boleh kosong.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    speechSynthesis.speak(utterance);
  }

  // Fungsi untuk menyalin teks ke clipboard
  function copyText() {
    navigator.clipboard
      .writeText(output.textContent)
      .then(function () {
        alert("Teks telah disalin ke clipboard.");
      })
      .catch(function (err) {
        console.error("Gagal menyalin teks:", err);
      });
  }

  // Menambahkan event listener ke tombol
  startRecordBtn.addEventListener("click", startRecording);
  stopRecordBtn.addEventListener("click", stopRecording);
  speakTextBtn.addEventListener("click", speakText);
  copyTextBtn.addEventListener("click", copyText);
});
