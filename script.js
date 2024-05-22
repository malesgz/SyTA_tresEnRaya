let selectedImage;

async function run(imageElement) {
  // Establecer el backend a usar WebGL y asegurarse de que esté listo.
  await tf.setBackend("webgl");
  await tf.ready();

  // Cargar el modelo de MobileNet.
  const model = await mobilenet.load();

  // Clasificar la imagen.
  const predictions = await model.classify(imageElement);
  console.log("Predictions:");
  console.log(predictions);

  // Mostrar los resultados en la pantalla.
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<h2>Predictions:</h2>";
  predictions.forEach((prediction) => {
    const percentage = (prediction.probability * 100).toFixed(2);
    resultsDiv.innerHTML += `<p>${prediction.className}: ${percentage}%</p>`;
  });
}

document.getElementById("imageUpload").addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const imgElement = document.getElementById("img");
    imgElement.src = e.target.result;
    imgElement.style.display = "block";
    selectedImage = imgElement;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

document.getElementById("submitButton").addEventListener("click", () => {
  if (selectedImage) {
    run(selectedImage);
  } else {
    alert("Please upload an image first.");
  }
});