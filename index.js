let video = document.querySelector("video");
let recorderBtnCont = document.querySelector("record-btn-cont");
let recorderBtn = document.getElementById("recordBtn");

console.log(recorderBtn);

let recordFlag = false;

let recorder;
let chunks = [];

let constraints = {
  audio: false,
  video: true,
};

// navigator is a global obj that gives info about the browser
navigator.mediaDevices
  .getUserMedia(constraints)
  .then((stream) => {
    video.srcObject = stream;
    recorder = new MediaRecorder(stream);

    recorder.addEventListener("start", (e) => {
      chunks = [];
    });

    recorder.addEventListener("dataavailable", (e) => {
      chunks.push(e.data);
    });

    recorder.addEventListener("stop", (e) => {
      // Changed from 'error' to 'stop'
      let blob = new Blob(chunks, { type: "video/mp4" });
      let videoUrl = URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = videoUrl;
      a.download = "stream.mp4";
      a.click();
    });

    recorderBtn.addEventListener("click", () => {
      recordFlag = !recordFlag; // Flip the record flag on each click

      if (recordFlag) {
        recorder.start();
        console.log("Recording started");
        recorderBtn.classList.add("scale-record");
      } else {
        recorder.stop();
        console.log("Recording stopped");
        recorderBtn.classList.remove("scale-record");
      }
    });
  })
  .catch((error) => {
    console.error("Error accessing media devices.", error);
  });
