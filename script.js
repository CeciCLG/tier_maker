const imageInput = document.querySelector("#image-input");
const imageSection = document.querySelector("#selector-items");

imageInput.addEventListener("change", (event) => {
    console.log(event);

    const [file] = event.target.files;

    console.log(file);


    if (file) {
        const reader = new FileReader();

        reader.onload = (eventReader) => {
            const imageItem = document.createElement("img");

            imageItem.src = eventReader.target.result;
            imageItem.className = "item-image";

            imageSection.appendChild(imageItem)
        };


        reader.readAsDataURL(file);
    }
})