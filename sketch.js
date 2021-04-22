/* global tm */

const mainEl = document.querySelector("#container");

const wizard = new tm.Wizard({
  introduction: {
    title: tm.html`Let’s teach your computer to distinguish between a  scientific  calculator and an iPhone.`,
    description: tm.html`Click "Start", You'll need to allow access to your webcam. Note that your images stay private to you and do not leave your computer.`
  },
  classes: [
    {
      name: "Calculator",
      title: "“Record examples with a calculator in the frame",
      description:
        "Hold the button and take at least 50 pictures of a calculator. Try varying the orientation and depth of the calculator in the frame."
    },
    {
      name: "iPhone",
      title: "Record examples with an iPhone in the frame.",
      description:
        "Take at least 50 pictures of an iPhone. Try varying the orientation and depth of the iPhone in the frame."
    }
  ],
  onLoad: () => {
    console.log("model has loaded");
  },
  onPrediction: predictions => {
    const images = document.querySelectorAll(".prediction-image");
    let highestProb = Number.MIN_VALUE;
    let highestIndex = -1;
    predictions.forEach((pred, i) => {
      if (pred.probability > highestProb) {
        highestProb = pred.probability;
        highestIndex = i;
      }
    });
    images.forEach((img, i) => {
      if (i === highestIndex) {
        img.classList.remove("hidden");
      } else {
        img.classList.add("hidden");
      }
    });
  },
  onSampleAdded: added => {
    console.log(added);
  },
  onTrain: () => console.log("train begins"),
  onReady: () => {
    const inferenceCamera = wizard.createInferenceCamera({
      size: 270
    });
    const cameraContainer = document.querySelector(
      "#inference-camera-container"
    );
    cameraContainer.appendChild(inferenceCamera);
    mainEl.classList.add("ready");
  }
});

document
  .querySelector("#train-model-button")
  .addEventListener("click", () => wizard.open());

