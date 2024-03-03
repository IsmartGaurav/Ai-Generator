const token = "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";
const promptInput = document.getElementById("input");
const generateBtn = document.getElementById("generate-btn");
const imageContainer = document.getElementById("image-container"); // Get the container

async function query() {
  // Optionally, clear previous images or indicate loading
  imageContainer.innerHTML = '<img src="icegif-1.gif" alt="Loading...">';

  const response = await fetch(
    "https://api-inference.huggingface.co/models/segmind/SSD-1B",
    {
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
      body: JSON.stringify({ inputs: promptInput.value }),
    }
  );
  const result = await response.blob();
  return result;
}

generateBtn.addEventListener("click", async function () {
  query().then((response) => {
    const objectUrl = URL.createObjectURL(response);
    // Create an img element
    const imgElement = document.createElement("img");
    imgElement.src = objectUrl;
    // Set the size of the image
    imgElement.style.width = "312px";
    imgElement.style.height = "312px";
    // Clear the container and append the new image
    imageContainer.innerHTML = "";
    imageContainer.appendChild(imgElement);
  });
});
