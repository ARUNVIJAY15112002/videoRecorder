let video = document.querySelector("video");
let recorderBtnCont = document.querySelector("record-btn-cont");
let recorderBtn = document.getElementById("recordBtn");

let captureBtn=document.getElementById("captureBtn");

let timer=document.getElementById("timer");



let timerId;

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
        startTimer();
        console.log("Recording started");
        recorderBtn.classList.add("scale-record");
      } else {
        recorder.stop();
        StopTimer();
        console.log("Recording stopped");
        recorderBtn.classList.remove("scale-record");
      }
    });
  })
  .catch((error) => {
    console.error("Error accessing media devices.", error);
  });


  let counter=0;//represents the total seconds
  function startTimer()
  {
    timer.style.display = "block";
    function displayTimer()
    {

      let totalSeconds=counter;
      let hours=Number.parseInt(totalSeconds/3600);
      totalSeconds=totalSeconds% 3600;
      let minutes=Number.parseInt(totalSeconds/60);
      totalSeconds=totalSeconds%60;
      let seconds=totalSeconds;

      hours = (hours<10)?`0${hours}`:hours;
      minutes  (minutes<10)?`0${minutes}`:minutes;
      seconds = (seconds<10)?`0${seconds}`:seconds;

      timer.innerText=`${hours}:${minutes}:${seconds}`;



      counter++;


    }
    timerId=setInterval(displayTimer, 1000);
  }






  function StopTimer()
  {
    clearInterval(timerId);
        timer.style.display = "none";
        timer.innerText="00:00";
        counter=0;
        timer.innerText="00:00:00";
        console.log("Timer stopped");

  }


  captureBtn.addEventListener("click", () => {
     captureBtn.classList.add("scale-capture");

  });